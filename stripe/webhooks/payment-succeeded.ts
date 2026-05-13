import type { User } from "@/payload-types";
import type { StripeWebhookHandler } from "@payloadcms/plugin-stripe/types";
import type Stripe from "stripe";
import { incrementCouponUsage, resolveCoupon } from "@/utils/server/resolve-coupon";

export const paymentSucceeded: StripeWebhookHandler<{
  data: {
    object: Stripe.PaymentIntent;
  };
}> = async (args) => {
  const { event, payload } = args;

  const {
    id: stripePaymentIntentID,
    amount,
    currency,
    customer,
    metadata: metadataFromObject,
  } = event.data.object;

  const cart = metadataFromObject.cart
    ? JSON.parse(metadataFromObject.cart)
    : undefined;

  let user: User | undefined;

  if (customer) {
    const users = await payload.find({
      collection: "users",
      limit: 1,
      where: {
        stripeCustomerID: {
          equals: typeof customer === "string" ? customer : customer.id,
        },
      },
    });

    if (users?.docs.length > 0) {
      user = users.docs[0];
    }
  }

  payload.logger.info(
    `Syncing Stripe payment intent ${stripePaymentIntentID} to Payload...`,
  );

  try {
    payload.logger.info(`- Creating order...`);

    await payload.create({
      collection: "orders",
      data: {
        ...(user && { orderedBy: user.id }),
        currency,
        items:
          cart?.map((item: any) => {
            const { product: productId, stripeProductID, quantity } = item;
            return {
              ...(productId ? { product: productId } : {}),
              ...(stripeProductID ? { stripeProductID } : {}),
              quantity,
              purchaseDate: new Date().toISOString(),
            };
          }) || [],
        stripePaymentIntentID,
        total: amount,
      },
    });

    payload.logger.info(`✅ Successfully created order for payment.`);

    // Increment coupon usage now that payment has actually succeeded.
    if (metadataFromObject.couponCode) {
      try {
        const couponResult = await resolveCoupon(
          metadataFromObject.couponCode,
          [],
          payload,
          { skipCartCheck: true },
        );
        if (!("error" in couponResult)) {
          await incrementCouponUsage(
            couponResult.id,
            couponResult.usageCount,
            payload,
            couponResult.usageLimit,
          );
        } else {
          payload.logger.error(
            `Could not resolve coupon "${metadataFromObject.couponCode}" in payment-succeeded: ${couponResult.error}`,
          );
        }
      } catch (couponError: unknown) {
        payload.logger.error(`Failed to increment coupon usage after payment: ${couponError}`);
      }
    }

    const itemList =
      cart
        ?.map(
          (item: any) =>
            `<li>${item.stripeProductID || `Product #${item.product}`} × ${item.quantity}</li>`,
        )
        .join("") || "<li>Unknown items</li>";

    await payload.sendEmail({
      from: process.env.SMTP_USER || "",
      to: process.env.NOTIFY_EMAIL,
      subject: `New purchase — ${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #F6F6FF; border-radius: 24px;">
          <h2 style="color: #32324D;">New Course Purchase!</h2>
          <p><strong>Customer:</strong> ${user?.name || "Guest"} (${user?.email || "unknown"})</p>
          <p><strong>Amount:</strong> ${(amount / 100).toFixed(2)} ${currency.toUpperCase()}</p>
          <p><strong>Payment Intent:</strong> ${stripePaymentIntentID}</p>
          <div style="background-color: #fff; padding: 20px; border-radius: 24px; border: 1px solid #ddd;">
            <p><strong>Items:</strong></p>
            <ul>${itemList}</ul>
          </div>
        </div>
      `,
    });
  } catch (error: unknown) {
    payload.logger.error(`- Error creating order: ${error}`);
  }
};

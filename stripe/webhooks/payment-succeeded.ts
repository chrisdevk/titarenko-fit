import type { User } from "@/payload-types";
import type { StripeWebhookHandler } from "@payloadcms/plugin-stripe/types";
import type Stripe from "stripe";

const logs = true;

export const paymentSucceeded: StripeWebhookHandler<{
  data: {
    object: Stripe.PaymentIntent;
  };
}> = async (args) => {
  console.log("***payment succeeded***");
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

  if (logs)
    payload.logger.info(
      `Syncing Stripe product with ID: ${stripePaymentIntentID} to Payload...`,
    );

  try {
    if (logs) payload.logger.info(`- Creating order...`);
    console.log("***Creating order***", cart);

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

    if (logs) payload.logger.info(`✅ Successfully created order for payment.`);

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

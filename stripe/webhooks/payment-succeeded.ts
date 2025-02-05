import type { CartItems, User } from "@/payload-types";
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
          cart?.map((item: NonNullable<CartItems>[number]) => {
            const { product: productId, quantity } = item;

            console.log("***Item: ", item);

            return {
              product: productId,
              quantity,
              purchaseDate: new Date().toISOString(),
            };
          }) || [],
        stripePaymentIntentID,
        total: amount,
      },
    });

    if (logs) payload.logger.info(`✅ Successfully created order for payment.`);
  } catch (error: unknown) {
    payload.logger.error(`- Error creating order: ${error}`);
  }
};

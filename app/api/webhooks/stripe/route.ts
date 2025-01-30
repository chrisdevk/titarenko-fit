import type { StripeWebhookHandler } from "@payloadcms/plugin-stripe/types";
import type Stripe from "stripe";

const logs = true;

interface CartItem {
  product: string;
  quantity: number;
  unitPrice: number;
  id?: string;
}

export async function POST(req: Request) {
  const event = await req.json(); // Parse the incoming webhook request

  const { payload } = event;

  const {
    id: stripePaymentIntentID,
    amount,
    currency,
    customer,
    metadata: metadataFromObject,
  } = payload.data.object;

  const cart = metadataFromObject.cart
    ? JSON.parse(metadataFromObject.cart)
    : undefined;

  let user: any | undefined;

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

    await payload.create({
      collection: "orders",
      data: {
        ...(user && { orderedBy: user.id }),
        currency,
        items: cart?.map((item: CartItem) => {
          const { product: productID } = item;

          return {
            product: productID,
          };
        }),
        stripePaymentIntentID,
        total: amount,
      },
    });

    if (logs) payload.logger.info(`✅ Successfully created order for payment.`);
    return new Response("Webhook processed", { status: 200 });
  } catch (error: unknown) {
    payload.logger.error(`- Error creating order: ${error}`);
    return new Response("Error processing webhook", { status: 500 });
  }
}

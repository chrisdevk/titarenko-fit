import type { InfoType } from "@/collections/Products/ui/types";
import type { User } from "@/payload-types";
import type { PayloadHandler } from "payload";

import { addDataAndFileToRequest } from "@payloadcms/next/utilities";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-08-01",
});

interface RequestData {
  productID: string;
  price: number;
  email?: string;
}

// this endpoint creates an `Invoice` with the items in the cart
// to do this, we loop through the items in the cart and lookup the product in Stripe
// we then add the price of the product to the total
// once completed, we pass the `client_secret` of the `PaymentIntent` back to the client which can process the payment
export const createPaymentIntent: PayloadHandler = async (req) => {
  const { payload, user } = req;

  await addDataAndFileToRequest(req);

  const { productID, price, email } = req.data as RequestData;

  if (!user && !email) {
    return Response.json(
      "A user or an email is required for this transaction.",
      { status: 401 }
    );
  }

  if (!productID || !price || price <= 0) {
    return Response.json(
      { error: "Invalid course information provided." },
      { status: 400 }
    );
  }

  try {
    let stripeCustomerID;
    let stripeCustomer: Stripe.Customer | undefined;

    if (user) {
      const fullUser = await payload.findByID({
        id: user.id,
        collection: "users",
      });

      stripeCustomerID = fullUser?.stripeCustomerID;

      const email = fullUser?.email ?? undefined;
      const name = fullUser?.name ?? undefined;

      if (!stripeCustomerID) {
        const existingCustomer = (
          await stripe.customers.list({ email: fullUser.email })
        ).data[0];

        if (existingCustomer) {
          stripeCustomerID = existingCustomer.id;
        } else {
          const newCustomer = await stripe.customers.create({
            email,
            name,
          });
          stripeCustomerID = newCustomer.id;

          await payload.update({
            id: user.id,
            collection: "users",
            data: { stripeCustomerID },
          });
        }
      }
    } else {
      const existingCustomer = (await stripe.customers.list({ email })).data[0];

      if (existingCustomer) {
        stripeCustomerID = existingCustomer.id;
      } else {
        const newCustomer = await stripe.customers.create({ email });
        stripeCustomer = newCustomer;
        stripeCustomerID = newCustomer.id;
      }
    }

    const total = price; // Since there's no quantity, the price is the total amount

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      customer: stripeCustomerID,
      metadata: {
        productID,
      },
      payment_method_types: ["card"],
    });

    return Response.json(
      { client_secret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    payload.logger.error(message);

    return Response.json({ error: message }, { status: 401 });
  }
};

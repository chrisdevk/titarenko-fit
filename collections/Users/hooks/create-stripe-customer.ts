import type { CollectionBeforeChangeHook } from "payload";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-08-01",
});

export const createStripeCustomer: CollectionBeforeChangeHook = async ({
  req,
  data,
  operation,
}) => {
  if (operation === "create" && !data.stripeCustomerID) {
    try {
      const existingCustomer = await stripe.customers.list({
        limit: 1,
        email: data.email,
      });

      if (existingCustomer.data.length) {
        return {
          ...data,
          stripeCustomerID: existingCustomer.data[0].id,
        };
      }

      const customer = await stripe.customers.create({
        email: data.email,
      });

      return {
        ...data,
        stripeCustomerID: customer.id,
      };
    } catch (error: unknown) {
      req.payload.logger.error(`Error creating Stripe customer: ${error}`);
    }
  }

  return data;
};

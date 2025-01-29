import type { Product, User, Order } from "@/payload-types";
import type { PayloadHandler } from "payload";
import { addDataAndFileToRequest } from "payload";
import Stripe from "stripe";

import type { CartItems } from "@/payload-types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-08-01",
});

export const createPaymentIntent: PayloadHandler = async (req) => {
  const { payload, user } = req;

  await addDataAndFileToRequest(req);

  const cartFromRequest = req.data?.cart as { items: CartItems };
  const emailFromRequest = req.data?.email;

  if (!user && !emailFromRequest) {
    return new Response(
      JSON.stringify({
        error: "A user or an email is required for this transaction.",
      }),
      { status: 401 },
    );
  }

  let fullUser: User | undefined;

  if (user) {
    fullUser = await payload.findByID({
      id: user.id,
      collection: "users",
      depth: 2, // Fetch orders and products
    });
  }

  const cart = fullUser?.cart?.items || cartFromRequest?.items;

  if (!cart || cart.length === 0) {
    return new Response(
      JSON.stringify({
        error: "Please provide a cart either directly or from the user.",
      }),
      { status: 401 },
    );
  }

  try {
    let stripeCustomerID = fullUser?.stripeCustomerID;
    let stripeCustomer: Stripe.Customer | undefined;

    if (fullUser) {
      if (!stripeCustomerID) {
        const existingCustomer = (
          await stripe.customers.list({ email: fullUser.email })
        ).data?.[0];

        if (!existingCustomer) {
          const newCustomer = await stripe.customers.create({
            name: fullUser.name || fullUser.email,
            email: fullUser.email,
          });

          stripeCustomerID = newCustomer.id;
        } else {
          stripeCustomerID = existingCustomer.id;
        }

        if (user) {
          await payload.update({
            id: user.id,
            collection: "users",
            data: { stripeCustomerID },
          });
        }
      }
    } else {
      const existingCustomer = (
        await stripe.customers.list({ email: emailFromRequest as string })
      ).data?.[0];

      if (!existingCustomer) {
        const newCustomer = await stripe.customers.create({
          email: emailFromRequest as string,
        });

        stripeCustomer = newCustomer;
        stripeCustomerID = newCustomer.id;
      } else {
        stripeCustomer = existingCustomer;
        stripeCustomerID = existingCustomer.id;
      }
    }

    let total = 0;
    const metadata: any[] = [];

    const purchasedCourses = new Set(
      (fullUser?.orders?.docs as Order[])?.flatMap(
        (order) =>
          order.items?.map((item) => {
            if (typeof item.product === "object" && item.product !== null) {
              return item.product.id;
            }
            return item.product;
          }) || [],
      ) || [],
    );

    for (const item of cart) {
      const { product } = item;

      if (!product || typeof product === "string") {
        return new Response(
          JSON.stringify({ error: "Invalid product in cart." }),
          { status: 400 },
        );
      }

      if (typeof product === "object") {
        if (purchasedCourses.has(product.id)) {
          return new Response(
            JSON.stringify({
              error: `You have already purchased the course: ${product.title}.`,
            }),
            { status: 400 },
          );
        }
        metadata.push({
          product: product.title,
          productId: product.id,
        });
      }

      total += item.unitPrice;
    }

    if (total === 0) {
      return new Response(
        JSON.stringify({
          error:
            "There is nothing to pay for, add some items to your cart and try again.",
        }),
        { status: 400 },
      );
    }

    console.log({ metadata });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      customer: stripeCustomerID,
      metadata: { cart: JSON.stringify(metadata) },
      payment_method_types: ["card"],
    });

    return new Response(
      JSON.stringify({ client_secret: paymentIntent.client_secret }),
      { status: 200 },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    payload.logger.error(message);

    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};

import type { User } from "@/payload-types";
import type { PayloadHandler } from "payload";

import { computeDiscountAmount, resolveCoupon } from "@/utils/server/resolve-coupon";
import { addDataAndFileToRequest } from "payload";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-08-01",
});

export const createPaymentIntent: PayloadHandler = async (req) => {
  const { payload, user } = req;

  await addDataAndFileToRequest(req);

  const cartFromRequest = req.data?.cart;
  const emailFromRequest = req.data?.email;
  const couponCode = req.data?.couponCode as string | undefined;

  if (!user && !emailFromRequest) {
    return Response.json(
      "A user or an email is required for this transaction.",
      { status: 401 },
    );
  }

  let fullUser: User | undefined;

  if (user) {
    fullUser = await payload.findByID({
      id: user?.id,
      collection: "users",
    });
  }

  // Use cart from request if user's cart is empty, otherwise use user's cart
  const cart = (fullUser?.cart?.items && fullUser.cart.items.length > 0)
    ? fullUser.cart.items
    : (cartFromRequest?.items || cartFromRequest);

  if (!cart || cart.length === 0) {
    return Response.json(
      { error: "Please provide a cart either directly or from the user." },
      { status: 400 },
    );
  }

  try {
    let stripeCustomerID = fullUser?.stripeCustomerID;
    let stripeCustomer: Stripe.Customer | undefined;

    if (fullUser) {
      if (!stripeCustomerID) {
        const customer = (
          await stripe.customers.list({ email: fullUser.email })
        ).data?.[0];

        if (!customer) {
          const newCustomer = await stripe.customers.create({
            name: fullUser?.name || fullUser.email,
            email: fullUser.email,
          });
          stripeCustomerID = newCustomer.id;
        } else {
          stripeCustomerID = customer.id;
        }

        if (user?.id)
          await payload.update({
            id: user.id,
            collection: "users",
            data: { stripeCustomerID },
          });
      }
    } else {
      const customer = (
        await stripe.customers.list({ email: emailFromRequest as string })
      ).data?.[0];

      if (!customer) {
        const newCustomer = await stripe.customers.create({
          email: emailFromRequest as string,
        });
        stripeCustomer = newCustomer;
        stripeCustomerID = newCustomer.id;
      } else {
        stripeCustomer = customer;
        stripeCustomerID = customer.id;
      }
    }

    // Suppress unused-variable warning — stripeCustomer may be used by callers
    void stripeCustomer;

    let total = 0;
    const metadata: Array<{ product?: number; stripeProductID?: string; quantity: number }> = [];
    const enrichedItems: Array<{ product?: unknown; stripeProductID?: string | null; unitPrice: number; quantity?: number }> = [];

    // Fetch server-side prices — never trust client-supplied unitPrice.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payloadAny = payload as any;

    for (const item of cart as Array<{
      product?: unknown;
      stripeProductID?: string | null;
      quantity?: number;
    }>) {
      const { product, stripeProductID } = item;
      let itemPrice = 0;

      if (product) {
        let productId: number;
        if (typeof product === "number") {
          productId = product;
        } else if (typeof product === "object" && product !== null && "id" in product) {
          productId = (product as { id: number }).id;
        } else {
          payload.logger.error(`Invalid product structure in cart: ${JSON.stringify(product)}`);
          continue;
        }

        const productDoc = await payloadAny.findByID({ collection: "products", id: productId });
        if (productDoc?.priceJSON) {
          try {
            const prices = JSON.parse(productDoc.priceJSON as string) as Array<{
              unit_amount: number | null;
              active: boolean;
            }>;
            const activePrice = prices.find((p) => p.active) ?? prices[0];
            itemPrice = activePrice?.unit_amount ?? 0;
          } catch {
            payload.logger.error(`Failed to parse priceJSON for product ${productId}`);
          }
        }

        metadata.push({ product: productId, quantity: item.quantity ?? 1 });
      } else if (stripeProductID) {
        const clubMonthResult = await payloadAny.find({
          collection: "club-months",
          where: { stripeProductID: { equals: stripeProductID } },
          limit: 1,
        });
        itemPrice = (clubMonthResult?.docs?.[0]?.priceInCents as number) ?? 0;
        metadata.push({ stripeProductID, quantity: item.quantity ?? 1 });
      } else {
        payload.logger.error("Cart item has neither product nor stripeProductID.");
        continue;
      }

      total += itemPrice;
      enrichedItems.push({ ...item, unitPrice: itemPrice });
    }

    if (total === 0) {
      throw new Error(
        "There is nothing to pay for, add some items to your cart and try again.",
      );
    }

    // Apply coupon discount if provided
    let appliedCouponCode: string | undefined;
    if (couponCode) {
      const couponResult = await resolveCoupon(couponCode, enrichedItems, payload);
      if ("error" in couponResult) {
        return Response.json({ error: couponResult.error }, { status: 400 });
      }
      const discountAmount = computeDiscountAmount(couponResult, enrichedItems, total);
      total = Math.max(0, total - discountAmount);
      appliedCouponCode = couponResult.code;

      if (total === 0) {
        return Response.json(
          { error: "Total is $0 after discount — use the free order endpoint instead." },
          { status: 400 },
        );
      }
    }

    // Coupon usage is intentionally NOT incremented here — only in the
    // payment-succeeded webhook so abandoned checkouts don't consume slots.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      customer: stripeCustomerID,
      metadata: {
        cart: JSON.stringify(metadata),
        ...(appliedCouponCode ? { couponCode: appliedCouponCode } : {}),
      },
      payment_method_types: ["card"],
    });

    return Response.json(
      { client_secret: paymentIntent.client_secret },
      { status: 200 },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    payload.logger.error(`Payment intent creation error: ${message}`);
    return Response.json({ error: message }, { status: 400 });
  }
};

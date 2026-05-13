import type { PayloadHandler } from "payload";
import { addDataAndFileToRequest } from "payload";
import {
  computeDiscountAmount,
  incrementCouponUsage,
  resolveCoupon,
} from "@/utils/server/resolve-coupon";

export const createFreeOrder: PayloadHandler = async (req) => {
  await addDataAndFileToRequest(req);

  const { payload, user } = req;

  if (!user) {
    return Response.json(
      { error: "You must be logged in to place an order." },
      { status: 401 },
    );
  }

  const data = req.data as { cart?: unknown; couponCode?: string };

  if (!data.couponCode) {
    return Response.json(
      { error: "A coupon code is required for free orders." },
      { status: 400 },
    );
  }

  const rawCart = data.cart as { items?: unknown[] } | unknown[] | undefined;
  const cartItems = (
    Array.isArray(rawCart) ? rawCart : (rawCart?.items ?? [])
  ) as Array<{
    product?: unknown;
    stripeProductID?: string | null;
    quantity?: number;
  }>;

  if (cartItems.length === 0) {
    return Response.json({ error: "Cart is empty." }, { status: 400 });
  }

  // Fetch server-side prices — never trust client-supplied unitPrice.
  let cartTotal = 0;
  const enrichedItems: Array<{
    product?: unknown;
    stripeProductID?: string | null;
    unitPrice: number;
    quantity?: number;
  }> = [];

  for (const item of cartItems) {
    let unitPrice = 0;

    if (item.product) {
      const productId =
        typeof item.product === "object" && item.product !== null
          ? (item.product as { id: number }).id
          : (item.product as number);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const productDoc = await (payload as any).findByID({
        collection: "products",
        id: productId,
      });

      if (productDoc?.priceJSON) {
        try {
          const prices = JSON.parse(productDoc.priceJSON as string) as Array<{
            unit_amount: number | null;
            active: boolean;
          }>;
          const activePrice = prices.find((p) => p.active) ?? prices[0];
          unitPrice = activePrice?.unit_amount ?? 0;
        } catch {
          payload.logger.error(`Failed to parse priceJSON for product ${productId}`);
        }
      }
    } else if (item.stripeProductID) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clubMonthResult = await (payload as any).find({
        collection: "club-months",
        where: { stripeProductID: { equals: item.stripeProductID } },
        limit: 1,
      });
      const clubMonth = clubMonthResult?.docs?.[0];
      unitPrice = (clubMonth?.priceInCents as number) ?? 0;
    }

    cartTotal += unitPrice;
    enrichedItems.push({ ...item, unitPrice });
  }

  const coupon = await resolveCoupon(data.couponCode, enrichedItems, payload);

  if ("error" in coupon) {
    return Response.json({ error: coupon.error }, { status: 400 });
  }

  const discountAmount = computeDiscountAmount(coupon, enrichedItems, cartTotal);
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  if (finalTotal !== 0) {
    return Response.json(
      { error: "This order is not fully covered by the coupon." },
      { status: 400 },
    );
  }

  // Increment usage before creating the order so a failed increment blocks
  // the order rather than the reverse (order created on exhausted coupon).
  const incremented = await incrementCouponUsage(
    coupon.id,
    coupon.usageCount,
    payload,
    coupon.usageLimit,
  );

  if (!incremented) {
    return Response.json(
      { error: "This coupon has reached its usage limit." },
      { status: 400 },
    );
  }

  try {
    await payload.create({
      collection: "orders",
      data: {
        orderedBy: user.id,
        currency: "usd",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: cartItems.map((item): any => ({
          ...(item.product
            ? {
                product:
                  typeof item.product === "object"
                    ? (item.product as { id: number }).id
                    : item.product,
              }
            : {}),
          ...(item.stripeProductID ? { stripeProductID: item.stripeProductID } : {}),
          quantity: item.quantity ?? 1,
          purchaseDate: new Date().toISOString(),
        })),
        total: 0,
      },
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    payload.logger.error(`Free order creation error: ${message}`);
    return Response.json({ error: "Failed to create order." }, { status: 400 });
  }
};

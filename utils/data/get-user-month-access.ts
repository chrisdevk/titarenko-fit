"use server";

import { checkRole } from "@/access/check-role";
import type { Order, Product } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { getCurrentUser } from "./get-current-user";

export const getUserAccessibleMonths = async (): Promise<Set<number>> => {
  const { user } = await getCurrentUser();
  if (!user) return new Set();

  if (checkRole(["admin"], user)) {
    return new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  }

  const payload = await getPayload({ config: configPromise });
  const now = new Date();

  const [orders, months] = await Promise.all([
    payload.find({
      collection: "orders",
      depth: 2,
      where: { orderedBy: { equals: user.id } },
    }),
    payload.find({
      collection: "club-months",
      depth: 0,
      limit: 12,
    }),
  ]);

  // Build set of Stripe product IDs with valid (non-expired) access
  const accessibleStripeIds = new Set<string>();
  orders.docs.forEach((order: Order) => {
    order.items?.forEach((item) => {
      const { purchaseDate } = item;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyItem = item as any;

      // Club month purchase: stripeProductID stored directly on order item
      if (anyItem.stripeProductID && !item.product) {
        const expiryDate = new Date(purchaseDate);
        expiryDate.setDate(expiryDate.getDate() + 45);
        if (now < expiryDate) accessibleStripeIds.add(anyItem.stripeProductID);
        return;
      }

      // Regular product purchase
      const { product } = item;
      if (typeof product === "number") return;
      const prod = product as Product;
      if (!prod.stripeProductID) return;
      const expiryDate = new Date(purchaseDate);
      expiryDate.setDate(expiryDate.getDate() + (prod.expiryDuration || 45));
      if (now < expiryDate) accessibleStripeIds.add(prod.stripeProductID);
    });
  });

  // Map accessible Stripe IDs to month numbers
  const accessibleMonths = new Set<number>();
  months.docs.forEach((month) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stripeId = (month as any).stripeProductID as string | undefined;
    if (!stripeId) return;
    if (accessibleStripeIds.has(stripeId)) {
      accessibleMonths.add(month.monthNumber);
    }
  });

  return accessibleMonths;
};

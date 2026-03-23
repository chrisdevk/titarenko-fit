"use server";

import type { Order, Product, User } from "@/payload-types";
import { getCurrentUser } from "./get-current-user";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { checkRole } from "@/access/check-role";

const CLUB_STRIPE_PRODUCT_ID = "prod_UCAvJM085olUtY";

export const checkClubAccess = async (): Promise<{
  hasAccess: boolean;
  user: User | null;
}> => {
  try {
    const { user } = await getCurrentUser();
    if (!user) return { hasAccess: false, user: null };

    if (checkRole(["admin"], user)) {
      return { hasAccess: true, user };
    }

    const payload = await getPayload({ config: configPromise });

    const orders = await payload.find({
      collection: "orders",
      depth: 2,
      where: {
        orderedBy: {
          equals: user.id,
        },
      },
    });

    const now = new Date();

    const hasValidAccess = orders.docs.some((order: Order) =>
      order.items?.some((item) => {
        const { purchaseDate, product } = item;
        if (typeof product === "number") return false;

        const prod = product as Product;
        if (prod.stripeProductID !== CLUB_STRIPE_PRODUCT_ID) return false;

        const expiryDuration = prod.expiryDuration || 45;
        const purchaseDateObj = new Date(purchaseDate);
        const expiryDate = new Date(purchaseDateObj);
        expiryDate.setDate(purchaseDateObj.getDate() + expiryDuration);

        return now < expiryDate;
      }),
    );

    return { hasAccess: hasValidAccess, user };
  } catch (error) {
    console.error("Error checking club access:", error);
    return { hasAccess: false, user: null };
  }
};

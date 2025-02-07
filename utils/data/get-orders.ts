"use server";

import { Order } from "@/payload-types";
import { getCurrentUser } from "./get-current-user";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const getOrders = async ({
  locale,
}: {
  locale: "all" | "en" | "ru";
}) => {
  const payload = await getPayload({ config: configPromise });

  try {
    const { user } = await getCurrentUser();
    if (!user) return null;

    const orders = await payload.find({
      collection: "orders",
      depth: 2,
      locale: locale,
    });

    const isExpired = (purchaseDate: string, expiryDuration: number) => {
      const purchaseDateObj = new Date(purchaseDate);
      const expiryDate = new Date(purchaseDateObj);
      expiryDate.setDate(purchaseDateObj.getDate() + expiryDuration);

      return new Date() > expiryDate;
    };

    const validOrders = orders.docs.map((order: Order) => {
      const validItems = order.items?.filter((item) => {
        const { purchaseDate, product } = item;
        let expiryDuration = 45;

        if (typeof product !== "number") {
          expiryDuration = product?.expiryDuration || expiryDuration;
        }

        return !isExpired(purchaseDate, expiryDuration);
      });

      return { ...order, items: validItems };
    });

    return validOrders.filter((order) => order.items && order.items.length > 0);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

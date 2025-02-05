"use server";

import { Order } from "@/payload-types";
import { getCurrentUser } from "./get-current-user";

export const getOrders = async ({ locale }: { locale: string }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?depth=2&draft=false&locale=${locale}`;
    const { token } = await getCurrentUser();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch orders");
      return null;
    }

    const data = await response.json();

    const isExpired = (purchaseDate: string, expiryDuration: number) => {
      const purchaseDateObj = new Date(purchaseDate);
      const expiryDate = new Date(purchaseDateObj);
      expiryDate.setDate(purchaseDateObj.getDate() + expiryDuration);

      return new Date() > expiryDate;
    };

    const validOrders = data.docs.map((order: Order) => {
      const validItems = order.items?.filter((item) => {
        const { purchaseDate, product } = item;
        let expiryDuration;

        if (typeof product !== "number")
          expiryDuration = product?.expiryDuration || 45;

        if (expiryDuration) return !isExpired(purchaseDate, expiryDuration);

        return null;
      });

      return { ...order, items: validItems };
    });

    const filteredOrders = validOrders.filter(
      (order: Order) => order.items && order.items.length > 0,
    );

    return filteredOrders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

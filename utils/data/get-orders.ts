"use server";

import { getCurrentUser } from "./get-current-user";

export const getOrders = async ({ locale }: { locale: string }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?depth=1&draft=false&locale=${locale}`;

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

    return data.docs || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

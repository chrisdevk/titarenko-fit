"use server";

interface getOrdersProps {
  userId: number;
  locale: string;
}

export const getOrders = async ({ userId, locale }: getOrdersProps) => {
  if (!userId) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?userId=${userId}&depth=1&draft=false&locale=${locale}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

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

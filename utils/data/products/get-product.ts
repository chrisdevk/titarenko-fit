"use server";

import { Product } from "@/payload-types";

export const getProduct = async ({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}?depth=1&draft=false&locale=${locale}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch product");
      return null;
    }

    const data: Product = await response.json();

    return data || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

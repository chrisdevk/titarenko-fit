"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Product } from "@/payload-types";

export const getProduct = async ({
  id,
  locale,
}: {
  id: string;
  locale: "all" | "en" | "ru";
}): Promise<Product | null> => {
  const payload = await getPayload({ config: configPromise });
  try {
    const product = await payload.findByID({
      collection: "products",
      id,
      depth: 1,
      locale: locale,
    });

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

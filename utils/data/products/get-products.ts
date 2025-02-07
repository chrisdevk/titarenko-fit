"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";

export const getProducts = async ({
  locale,
}: {
  locale: "all" | "en" | "ru";
}) => {
  const payload = await getPayload({ config: configPromise });
  try {
    const products = await payload.find({
      collection: "products",
      depth: 2,
      limit: 10,
      overrideAccess: false,
      locale: locale,
    });

    return products.docs || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

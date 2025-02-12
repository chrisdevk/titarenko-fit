"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Product } from "@/payload-types";
import { unstable_cache } from "next/cache";

export const getProduct = unstable_cache(
  async ({
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
  },
  ["products"],
  {
    tags: ["products"],
    revalidate: 604800,
  },
);

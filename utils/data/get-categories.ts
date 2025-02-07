"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";

export const getCategories = async ({
  locale,
}: {
  locale: "all" | "en" | "ru";
}) => {
  const payload = await getPayload({ config: configPromise });
  try {
    const categories = await payload.find({
      collection: "categories",
      depth: 1,
      overrideAccess: false,
      locale: locale,
    });

    return categories.docs || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

"use server";

import configPromise from "@payload-config";
import { getPayload } from "payload";

export const getBlogs = async ({ locale }: { locale: "all" | "en" | "ru" }) => {
  const payload = await getPayload({ config: configPromise });

  try {
    const blogs = await payload.find({
      collection: "blogs",
      locale: locale,
    });

    return blogs.docs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};

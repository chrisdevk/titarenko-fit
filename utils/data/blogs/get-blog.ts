"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Blog } from "@/payload-types";

export const getBlog = async ({
  id,
  locale,
}: {
  id: string;
  locale: "all" | "en" | "ru";
}): Promise<Blog | null> => {
  const payload = await getPayload({ config: configPromise });

  try {
    const blog = await payload.findByID({
      collection: "blogs",
      id,
      locale: locale,
    });

    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ClubMonth } from "@/payload-types";
import { unstable_cache } from "next/cache";

export const getClubMonth = unstable_cache(
  async ({
    monthNumber,
    locale,
  }: {
    monthNumber: number;
    locale: "all" | "en" | "ru";
  }): Promise<ClubMonth | null> => {
    const payload = await getPayload({ config: configPromise });

    try {
      const result = await payload.find({
        collection: "club-months",
        locale: locale,
        where: {
          monthNumber: {
            equals: monthNumber,
          },
        },
        limit: 1,
      });

      return result.docs[0] || null;
    } catch (error) {
      console.error("Error fetching club month:", error);
      return null;
    }
  },
  ["club-months"],
  {
    tags: ["club-months"],
    revalidate: 604800,
  },
);

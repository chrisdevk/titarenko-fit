"use server";

import configPromise from "@payload-config";
import { getPayload } from "payload";

export const getClubMonths = async ({
  locale,
}: {
  locale: "all" | "en" | "ru";
}) => {
  const payload = await getPayload({ config: configPromise });

  try {
    const months = await payload.find({
      collection: "club-months",
      locale: locale,
      sort: "monthNumber",
      limit: 12,
    });

    return months.docs || [];
  } catch (error) {
    console.error("Error fetching club months:", error);
    return null;
  }
};

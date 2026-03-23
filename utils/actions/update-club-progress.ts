"use server";

import { getCurrentUser } from "@/utils/data/get-current-user";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function updateClubProgress(
  monthNumber: number,
  dayNumber?: number,
) {
  try {
    const { user } = await getCurrentUser();
    if (!user) return;

    const payload = await getPayload({ config: configPromise });

    await payload.update({
      id: user.id,
      collection: "users",
      data: {
        clubProgress: {
          clubLastMonth: monthNumber,
          ...(dayNumber !== undefined && { clubLastDay: dayNumber }),
        },
      },
    });
  } catch (error) {
    console.error("Error updating club progress:", error);
  }
}

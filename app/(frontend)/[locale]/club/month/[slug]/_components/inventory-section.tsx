"use client";

import type { ClubMonth } from "@/payload-types";
import { useTranslations } from "next-intl";

type Equipment = NonNullable<ClubMonth["equipment"]>;

interface InventorySectionProps {
  equipment: Equipment;
}

export const InventorySection = ({ equipment }: InventorySectionProps) => {
  const t = useTranslations("ClubMonthPage");

  return (
    <div className="overflow-hidden rounded-[20px] bg-turquoise-light px-4 py-6 md:px-9 md:py-10">
      <h2 className="text-lg font-medium text-off-black md:text-[22px]">
        {t("equipment")}
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-4">
        {equipment.map((eq, index) => (
          <div
            key={index}
            className="flex h-[42px] items-center overflow-hidden rounded-[40px] bg-white py-[10px] pl-5 pr-[10px]"
          >
            <span className="truncate text-sm text-off-black md:text-base">
              {eq.item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

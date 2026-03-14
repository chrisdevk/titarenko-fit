"use client";

import { useTranslations } from "next-intl";
import type { ClubMonth } from "@/payload-types";

type Equipment = NonNullable<ClubMonth["equipment"]>;

interface InventorySectionProps {
  equipment: Equipment;
}

export const InventorySection = ({ equipment }: InventorySectionProps) => {
  const t = useTranslations("ClubPage");

  // Distribute items into 4 columns (column-first order like Figma)
  const columnCount = 4;
  const rowsPerCol = Math.ceil(equipment.length / columnCount);
  const columns: Equipment[] = [];
  for (let col = 0; col < columnCount; col++) {
    columns.push(equipment.slice(col * rowsPerCol, (col + 1) * rowsPerCol));
  }

  return (
    <div className="overflow-hidden rounded-[20px] bg-turquoise-light px-9 py-10">
      <h2 className="text-[22px] font-medium text-off-black">
        {t("equipment")}
      </h2>
      <div className="mt-10 flex items-start justify-between">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-5">
            {col.map((eq, index) => (
              <div
                key={index}
                className="flex h-[42px] w-[266px] items-center overflow-hidden rounded-[40px] bg-white py-[10px] pl-5 pr-[10px]"
              >
                <span className="whitespace-nowrap text-base text-off-black">
                  {eq.item}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

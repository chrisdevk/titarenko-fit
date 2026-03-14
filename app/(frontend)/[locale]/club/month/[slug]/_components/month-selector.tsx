"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthSelectorProps {
  currentMonth: number;
  months: { value: number; label: string }[];
  locale: string;
}

export const MonthSelector = ({
  currentMonth,
  months,
  locale,
}: MonthSelectorProps) => {
  const router = useRouter();
  const t = useTranslations("ClubPage");

  return (
    <Select
      value={String(currentMonth)}
      onValueChange={(value) => {
        router.push(`/${locale}/club/month/${value}`);
      }}
    >
      <SelectTrigger className="h-auto w-[150px] rounded-[20px] border-off-black/50 px-5 py-3 text-base text-off-black">
        <SelectValue placeholder={t("selectMonth")} />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month.value} value={String(month.value)}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

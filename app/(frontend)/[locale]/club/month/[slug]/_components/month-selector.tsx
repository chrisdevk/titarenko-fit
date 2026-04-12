"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

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
  const t = useTranslations("ClubMonthPage");

  return (
    <Select
      value={String(currentMonth)}
      onValueChange={(value) => {
        router.push(`/${locale}/club/month/${value}`);
      }}
    >
      <SelectTrigger className="h-auto w-full min-w-[120px] rounded-[20px] border-off-black/50 px-3 py-3 text-sm text-off-black md:w-[150px] md:px-5 md:text-base">
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

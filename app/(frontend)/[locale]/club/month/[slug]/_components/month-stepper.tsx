"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface MonthStepperProps {
  currentMonth: number;
  totalMonths: number;
  locale: string;
  currentLabel: string;
}

export const MonthStepper = ({
  currentMonth,
  totalMonths,
  locale,
  currentLabel,
}: MonthStepperProps) => {
  const router = useRouter();

  const hasPrev = currentMonth > 1;
  const hasNext = currentMonth < totalMonths;

  return (
    <div className="flex h-auto w-[150px] items-center justify-center gap-[18px] overflow-hidden rounded-[20px] bg-[#e2e8ff] px-[14px] py-3">
      <button
        onClick={() =>
          hasPrev && router.push(`/${locale}/club/month/${currentMonth - 1}`)
        }
        disabled={!hasPrev}
        className="shrink-0 text-off-black disabled:opacity-30"
        aria-label="Previous month"
      >
        <ChevronLeft className="size-3" />
      </button>
      <span className="whitespace-nowrap text-center text-base text-off-black">
        {currentLabel}
      </span>
      <button
        onClick={() =>
          hasNext && router.push(`/${locale}/club/month/${currentMonth + 1}`)
        }
        disabled={!hasNext}
        className="shrink-0 text-off-black disabled:opacity-30"
        aria-label="Next month"
      >
        <ChevronRight className="size-3" />
      </button>
    </div>
  );
};

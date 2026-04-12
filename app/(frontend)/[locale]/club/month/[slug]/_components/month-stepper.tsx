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
    <div className="flex h-auto w-full min-w-[120px] items-center justify-center gap-3 overflow-hidden rounded-[20px] bg-[#e2e8ff] px-3 py-3 md:w-[150px] md:gap-[18px] md:px-[14px]">
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

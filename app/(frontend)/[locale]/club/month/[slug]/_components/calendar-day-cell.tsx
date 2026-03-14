"use client";

import { cn } from "@/lib/utils";
import type { ClubMonth } from "@/payload-types";
import { useTranslations } from "next-intl";

type Day = NonNullable<ClubMonth["days"]>[number];

interface CalendarDayCellProps {
  dayNumber: number;
  day?: Day;
  onClick: () => void;
}

export const CalendarDayCell = ({
  dayNumber,
  day,
  onClick,
}: CalendarDayCellProps) => {
  const t = useTranslations("ClubMonthPage");

  const isWorkout = day?.dayType === "workout";
  const hasVideo = isWorkout && !!day?.videoUrl;
  const badge = day?.badge && day.badge !== "none" ? day.badge : null;

  return (
    <div
      onClick={hasVideo ? onClick : undefined}
      className={cn(
        "flex h-[132px] flex-col gap-[10px] rounded-lg bg-white p-3",
        hasVideo &&
          "cursor-pointer transition-shadow hover:shadow-md hover:ring-2 hover:ring-purple-custom/30",
      )}
    >
      {/* Day number row */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-off-black">{dayNumber}</span>
        {badge && (
          <span
            className={cn(
              "rounded-[20px] px-1.5 py-0.5 text-center text-[11px] text-off-black",
              badge === "start" ? "bg-[#dfffd6]" : "bg-[#ffa69e]",
            )}
          >
            {t(badge)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-auto">
        {isWorkout ? (
          <div className="rounded-[10px] bg-[rgba(155,116,255,0.1)] p-[5px]">
            {day?.lessonName && (
              <p className="text-base text-off-black">{day.lessonName}</p>
            )}
            {day?.duration && (
              <p className="text-base text-off-black">{day.duration}</p>
            )}
          </div>
        ) : (
          <div className="rounded-[10px] bg-[#ffa69e] p-[5px]">
            <p className="text-base text-off-black">{t("rest")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

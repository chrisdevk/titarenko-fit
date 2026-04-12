"use client";

import { cn } from "@/lib/utils";
import type { ClubMonth } from "@/payload-types";
import { useTranslations } from "next-intl";

type Day = NonNullable<ClubMonth["days"]>[number];

interface CalendarDayCellProps {
  dayNumber: number;
  day?: Day;
  onClick: () => void;
  variant?: "mobile" | "desktop";
}

export const CalendarDayCell = ({
  dayNumber,
  day,
  onClick,
  variant = "desktop",
}: CalendarDayCellProps) => {
  const t = useTranslations("ClubMonthPage");

  const isWorkout = day?.dayType === "workout";
  const hasVideo = isWorkout && !!day?.videoUrl;
  const badge = day?.badge && day.badge !== "none" ? day.badge : null;
  const isMobile = variant === "mobile";

  return (
    <div
      onClick={hasVideo ? onClick : undefined}
      className={cn(
        "flex flex-col rounded-lg bg-white",
        isMobile ? "min-h-[110px] gap-1.5 p-2" : "h-[132px] gap-[10px] p-3",
        hasVideo &&
          "cursor-pointer transition-shadow hover:shadow-md hover:ring-2 hover:ring-purple-custom/30",
      )}
    >
      {/* Day number + badge */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "font-bold text-off-black",
            isMobile ? "text-xs" : "text-sm",
          )}
        >
          {dayNumber}
        </span>
        {badge && (
          <span
            className={cn(
              "rounded-[20px] text-center text-off-black",
              isMobile
                ? "px-1 py-px text-[9px]"
                : "px-1.5 py-0.5 text-[11px]",
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
          <div
            className={cn(
              "rounded-[10px] bg-[rgba(155,116,255,0.1)]",
              isMobile ? "p-1" : "p-[5px]",
            )}
          >
            {day?.lessonName && (
              <p
                className={cn(
                  "text-off-black",
                  isMobile ? "line-clamp-2 text-[10px] leading-tight" : "text-base",
                )}
              >
                {day.lessonName}
              </p>
            )}
            {day?.duration && (
              <p
                className={cn(
                  "text-off-black",
                  isMobile ? "text-[9px]" : "text-base",
                )}
              >
                {day.duration}
              </p>
            )}
          </div>
        ) : (
          <div
            className={cn(
              "rounded-[10px] bg-[#ffa69e]",
              isMobile ? "p-1" : "p-[5px]",
            )}
          >
            <p
              className={cn(
                "text-off-black",
                isMobile ? "text-[10px]" : "text-base",
              )}
            >
              {t("rest")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

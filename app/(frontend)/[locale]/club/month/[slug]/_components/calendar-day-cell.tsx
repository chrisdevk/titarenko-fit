"use client";

import { cn } from "@/lib/utils";
import type { ClubMonth } from "@/payload-types";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";

type Day = NonNullable<ClubMonth["days"]>[number];
type Lesson = NonNullable<Day["lessons"]>[number];

interface CalendarDayCellProps {
  dayNumber: number;
  day?: Day;
  onLessonClick: (lesson: Lesson) => void;
  variant?: "mobile" | "desktop";
}

export const CalendarDayCell = ({
  dayNumber,
  day,
  onLessonClick,
  variant = "desktop",
}: CalendarDayCellProps) => {
  const t = useTranslations("ClubMonthPage");

  const isWorkout = day?.dayType === "workout";
  const badge = day?.badge && day.badge !== "none" ? day.badge : null;
  const isMobile = variant === "mobile";
  const lessons = day?.lessons ?? [];

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg bg-white",
        isMobile
          ? "min-h-[110px] gap-1.5 p-2"
          : "h-auto min-h-[132px] gap-[10px] p-3",
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
              isMobile ? "px-1 py-px text-[9px]" : "px-1.5 py-0.5 text-[11px]",
              badge === "start" ? "bg-[#dfffd6]" : "bg-[#ffa69e]",
            )}
          >
            {t(badge)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-auto flex flex-col gap-1">
        {isWorkout ? (
          lessons.map((lesson) => {
            const hasVideo = !!lesson.videoUrl;
            return (
              <div
                key={lesson.id ?? lesson.lessonName}
                onClick={hasVideo ? () => onLessonClick(lesson) : undefined}
                className={cn(
                  "rounded-[10px] bg-[rgba(155,116,255,0.1)]",
                  isMobile ? "p-1" : "p-[5px]",
                  hasVideo &&
                    "cursor-pointer transition-shadow hover:shadow-md hover:ring-2 hover:ring-purple-custom/30",
                )}
              >
                {lesson.lessonName && (
                  <div className="flex items-start gap-x-1">
                    <Play
                      color="#000"
                      size={isMobile ? 12 : 16}
                      className={cn("mt-px shrink-0", isMobile ? "min-h-3 min-w-3" : "min-h-4 min-w-4")}
                    />
                    <p
                      className={cn(
                        "font-bold text-off-black",
                        isMobile
                          ? "line-clamp-2 text-[10px] leading-tight"
                          : "line-clamp-3 text-sm",
                      )}
                    >
                      {lesson.lessonName}
                    </p>
                  </div>
                )}
              </div>
            );
          })
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

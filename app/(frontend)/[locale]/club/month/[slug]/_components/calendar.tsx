"use client";

import type { ClubMonth } from "@/payload-types";
import { updateClubProgress } from "@/utils/actions/update-club-progress";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CalendarDayCell } from "./calendar-day-cell";
import { LessonModal } from "./lesson-modal";

type Day = NonNullable<ClubMonth["days"]>[number];
type Lesson = NonNullable<Day["lessons"]>[number];

interface CalendarProps {
  days: Day[];
  startDayOfWeek: number;
  totalDays: number;
}

export const Calendar = ({
  days,
  startDayOfWeek,
  totalDays,
}: CalendarProps) => {
  const t = useTranslations("ClubMonthPage");
  const { slug } = useParams<{ slug: string }>();
  const monthNumber = parseInt(slug, 10);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const dayHeaders = [
    t("days.sun"),
    t("days.mon"),
    t("days.tue"),
    t("days.wed"),
    t("days.thu"),
    t("days.fri"),
    t("days.sat"),
  ];

  const dayMap = new Map<number, Day>();
  days.forEach((day) => {
    dayMap.set(day.dayNumber, day);
  });

  const dayCells = Array.from({ length: totalDays }, (_, i) => i + 1);
  const totalCells = startDayOfWeek + totalDays;
  const rows = Math.ceil(totalCells / 7);

  const handleLessonClick = (day: Day, lesson: Lesson) => {
    if (!lesson.videoUrl) return;
    setSelectedLesson(lesson);
    updateClubProgress(monthNumber, day.dayNumber);
  };

  return (
    <>
      {/* Mobile: 3-column grid, no weekday header, no offset */}
      <div className="block md:hidden">
        <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-xl bg-purple-custom p-1 lg:rounded-[20px]">
          {dayCells.map((dayNum) => {
            const day = dayMap.get(dayNum);
            return (
              <CalendarDayCell
                key={dayNum}
                dayNumber={dayNum}
                day={day}
                onLessonClick={(lesson) => handleLessonClick(day!, lesson)}
                variant="mobile"
              />
            );
          })}
        </div>
      </div>

      {/* Desktop: 7-column grid with weekday header and offset */}
      <div className="hidden md:flex md:w-full md:flex-col">
        <div className="flex h-[60px] items-center justify-between rounded-t-[20px] bg-purple-custom px-[90px]">
          {dayHeaders.map((header) => (
            <span
              key={header}
              className="w-full text-center text-lg font-medium text-off-white"
            >
              {header}
            </span>
          ))}
        </div>

        <div
          className="grid gap-2 overflow-hidden rounded-b-[20px] bg-purple-custom p-2"
          style={{
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: `repeat(${rows}, auto)`,
          }}
        >
          {Array.from({ length: startDayOfWeek }, (_, i) => (
            <div
              key={`empty-${i}`}
              className="min-h-[132px] rounded-lg bg-white/10"
            />
          ))}

          {dayCells.map((dayNum) => {
            const day = dayMap.get(dayNum);
            return (
              <CalendarDayCell
                key={dayNum}
                dayNumber={dayNum}
                day={day}
                onLessonClick={(lesson) => handleLessonClick(day!, lesson)}
                variant="desktop"
              />
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {selectedLesson?.videoUrl && (
        <LessonModal
          open={!!selectedLesson}
          onClose={() => setSelectedLesson(null)}
          videoUrl={selectedLesson.videoUrl}
          lessonName={selectedLesson.lessonName ?? ""}
        />
      )}
    </>
  );
};

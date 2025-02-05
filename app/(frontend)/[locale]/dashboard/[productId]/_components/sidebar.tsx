"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AudioLines, Check, CirclePlay } from "lucide-react";
import React from "react";
import { useProgress } from "@/context/progress-context";

interface SidebarProps {
  videoCount: number;
  currentVideo: number;
  setVideo: (num: number) => void;
  productId: number;
}

export const Sidebar = ({
  videoCount,
  currentVideo,
  setVideo,
  productId,
}: SidebarProps) => {
  const { progress } = useProgress();

  return (
    <aside className="h-full w-full rounded-3xl bg-turquoise-light py-4 lg:w-1/3">
      <ScrollArea className="h-[510px] w-full px-4">
        {Array.from({ length: videoCount }).map((_, index) => {
          const isCompleted =
            progress[productId]?.completed?.has(index) || false;

          return (
            <Button
              key={index}
              variant="secondary"
              size="lg"
              className={cn(
                "w-full justify-between bg-off-white text-off-black",
                index !== 0 && "mt-3",
              )}
              onClick={() => {
                setVideo(index);
              }}
            >
              <span>Lesson {index + 1}</span>
              {index === currentVideo && !isCompleted && (
                <AudioLines className="ml-2 !size-7 text-purple-custom" />
              )}
              {index !== currentVideo && !isCompleted && (
                <CirclePlay className="ml-2 !size-7 text-purple-custom" />
              )}
              {isCompleted && (
                <Check className="ml-2 !size-7 text-purple-custom" />
              )}
            </Button>
          );
        })}
      </ScrollArea>
    </aside>
  );
};

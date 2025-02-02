import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AudioLines, CirclePlay, Lock } from "lucide-react";
import React from "react";

interface SidebarProps {
  videoCount: number;
  currentVideo: number;
  setVideo: (num: number) => void;
  unlockedVideos: number[];
}

export const Sidebar = ({
  videoCount,
  currentVideo,
  setVideo,
  unlockedVideos,
}: SidebarProps) => {
  return (
    <aside className="h-full w-1/3 rounded-3xl bg-turquoise-light p-4">
      <ScrollArea className="h-full w-full">
        {Array.from({ length: videoCount }).map((_, index) => (
          <Button
            key={index}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full justify-between bg-off-white text-off-black",
              index !== 0 && "mt-3",
            )}
            onClick={() => unlockedVideos.includes(index) && setVideo(index)}
            disabled={!unlockedVideos.includes(index)}
          >
            {unlockedVideos.includes(index) ? (
              <>
                <span>Lesson {index + 1}</span>
                {index === currentVideo && (
                  <AudioLines className="ml-2 !size-7 text-purple-custom" />
                )}
                {index !== currentVideo && (
                  <CirclePlay className="ml-2 !size-7 text-purple-custom" />
                )}
              </>
            ) : (
              <>
                <span>Lesson {index + 1}</span>
                <Lock className="ml-2 !size-7 text-purple-custom" />
              </>
            )}
          </Button>
        ))}
      </ScrollArea>
    </aside>
  );
};

"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface LessonModalProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  lessonName: string;
}

const extractVimeoId = (url: string) => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
};

export const LessonModal = ({
  open,
  onClose,
  videoUrl,
  lessonName,
}: LessonModalProps) => {
  const videoId = extractVimeoId(videoUrl);

  if (!videoId) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl !rounded-3xl">
        <DialogTitle>{lessonName}</DialogTitle>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          allow="fullscreen"
          className="aspect-video h-full w-full max-w-full flex-shrink-0 rounded-3xl"
          title={lessonName}
        />
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useState, useEffect } from "react";
import { Product } from "@/payload-types";
import { Sidebar } from "./sidebar";
import Player from "@vimeo/player";

interface VideoInterfaceProps {
  product: Product;
}

const extractVimeoId = (url: string) => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
};

export const VideoInterface = ({ product }: VideoInterfaceProps) => {
  const videoCount = product.videos?.length ?? 0;
  const [currentVideoNum, setCurrentVideoNum] = useState(0);
  const [unlockedVideos, setUnlockedVideos] = useState<number[]>([]);

  useEffect(() => {
    const savedProgress = JSON.parse(
      localStorage.getItem("videoProgress") || "[]",
    );
    setUnlockedVideos(savedProgress.length > 0 ? savedProgress : [0]);
  }, []);

  useEffect(() => {
    localStorage.setItem("videoProgress", JSON.stringify(unlockedVideos));
  }, [unlockedVideos]);

  useEffect(() => {
    const iframe = document.getElementById("vimeo-player") as HTMLIFrameElement;
    const player = new Player(iframe);

    player.on("ended", () => {
      unlockNextVideo();
    });
  }, [currentVideoNum]);

  const unlockNextVideo = () => {
    if (
      !unlockedVideos.includes(currentVideoNum + 1) &&
      currentVideoNum + 1 < videoCount
    ) {
      setUnlockedVideos((prev) => [...prev, currentVideoNum + 1]);
    }
  };

  const videoUrl = product.videos?.[currentVideoNum]?.video_url;
  const videoId = videoUrl ? extractVimeoId(videoUrl) : null;

  return (
    <section className="mt-6 flex h-[550px] justify-between gap-x-5">
      <iframe
        id="vimeo-player"
        src={
          videoId
            ? `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`
            : ""
        }
        allow="autoplay; fullscreen; picture-in-picture"
        className="aspect-video h-full w-2/3 rounded-3xl"
        title={product?.title}
      />
      <Sidebar
        videoCount={videoCount}
        currentVideo={currentVideoNum}
        setVideo={(num) => {
          if (unlockedVideos.includes(num)) {
            setCurrentVideoNum(num);
          }
        }}
        unlockedVideos={unlockedVideos}
      />
    </section>
  );
};

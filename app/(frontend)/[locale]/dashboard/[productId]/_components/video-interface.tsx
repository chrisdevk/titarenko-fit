"use client";

import { useEffect, useState, useRef } from "react";
import { Product } from "@/payload-types";
import { Sidebar } from "./sidebar";
import { useProgress } from "@/context/progress-context";
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
  const { updateProgress } = useProgress();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoUrl = product.videos?.[currentVideoNum]?.video_url;
  const videoId = videoUrl ? extractVimeoId(videoUrl) : null;

  useEffect(() => {
    if (!iframeRef.current || !videoId) return;

    const player = new Player(iframeRef.current);

    player.on("ended", () => {
      updateProgress(product.id, videoCount, currentVideoNum);
    });

    return () => {
      player.off("ended");
    };
  }, [videoId, product.id, videoCount, currentVideoNum, updateProgress]);

  if (!product) return null;

  return (
    <section className="mt-6 flex flex-col justify-between gap-x-5 gap-y-5 lg:flex-row">
      <iframe
        ref={iframeRef}
        id="vimeo-player"
        key={videoId}
        src={videoId ? `https://player.vimeo.com/video/${videoId}` : ""}
        allow="fullscreen"
        className="aspect-video h-full w-full max-w-full flex-shrink-0 rounded-3xl lg:w-2/3"
        title={product?.title}
      />
      <Sidebar
        videoCount={videoCount}
        currentVideo={currentVideoNum}
        setVideo={setCurrentVideoNum}
        productId={product.id}
      />
    </section>
  );
};

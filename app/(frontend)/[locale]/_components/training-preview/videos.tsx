"use client";

import { useEffect, useRef, useState } from "react";

const sources = [
  "/videos/preview-1.MP4",
  "/videos/preview-2.MP4",
  "/videos/preview-3.MP4",
  "/videos/preview-4.MP4",
];

function LazyVideo({ source }: { source: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "150px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (inView) videoRef.current?.play().catch(() => {});
  }, [inView]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-[280px] md:h-[480px] md:w-[49%] lg:w-[24%]"
    >
      {inView ? (
        <video
          ref={videoRef}
          className="absolute size-full rounded-3xl object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        >
          <source src={source} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute size-full rounded-3xl bg-neutral-800" />
      )}
    </div>
  );
}

export const Videos = () => {
  return (
    <div className="flex flex-col flex-wrap justify-between gap-y-4 md:flex-row">
      {sources.map((source, index) => (
        <LazyVideo key={index} source={source} />
      ))}
    </div>
  );
};

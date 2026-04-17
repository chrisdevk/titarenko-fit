"use client";

import { motion } from "motion/react";

const galleryVideos = [
  "/videos/club-preview-1.mp4",
  "/videos/club-preview-2.mp4",
  "/videos/club-preview-3.mp4",
  "/videos/club-preview-4.mp4",
];

export const ClubGallery = () => {
  return (
    <section className="bg-turquoise-light py-20">
      <div className="mx-auto flex w-11/12 max-w-[1120px] flex-col items-center gap-[58px] sm:flex-row">
        {galleryVideos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative h-[318px] w-[238px] shrink-0 overflow-hidden rounded-[10px] md:h-[330px] md:w-[237px]"
          >
            <video
              className="absolute size-full rounded-3xl object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
            >
              <source src={video} type="video/mp4" />
            </video>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

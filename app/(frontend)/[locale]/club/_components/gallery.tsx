"use client";

import { motion } from "motion/react";
import Image from "next/image";

const galleryImages = [
  "/images/infinite-2.webp",
  "/images/infinite-3.webp",
  "/images/infinite-5.webp",
  "/images/infinite-6.webp",
];

export const ClubGallery = () => {
  return (
    <section className="bg-turquoise-light py-20">
      <div className="mx-auto flex w-11/12 max-w-[1120px] flex-col items-center gap-[58px] sm:flex-row">
        {galleryImages.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative h-[318px] w-[238px] shrink-0 overflow-hidden rounded-[10px] md:h-[330px] md:w-[237px]"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="237px"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

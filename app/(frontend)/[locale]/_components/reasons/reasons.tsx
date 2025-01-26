"use client";

import { ReasonsCard } from "./reasons-card";

import { motion } from "motion/react";
import { reasonsItems } from "@/utils/constants";
import { createElement } from "react";

export const Reasons = () => {
  return (
    <div className="mx-auto flex w-11/12 max-w-[1440px] flex-col items-center gap-y-10 px-3 md:px-12 2xl:px-32">
      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center uppercase"
      >
        Мои программы направления Женский Фитнес онлайн я создала для нас,
        прекрасных женщин! ПОЧЕМУ?
      </motion.h3>
      <div className="flex w-full flex-wrap justify-between gap-10">
        {reasonsItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="w-full md:w-[46%] lg:w-[30%]"
          >
            <ReasonsCard
              icon={createElement(
                item.icon,
                { size: 36, color: "white" },
                null,
              )}
              text={item.text}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

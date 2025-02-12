"use client";

import Image from "next/image";
import { ProgramListTablet } from "./program-list-tablet";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export const ProgramList = () => {
  const t = useTranslations("HomePage");

  const listItems = t.raw("list-items") as string[];

  return (
    <section className="mx-auto mt-16 w-11/12 max-w-[1440px] space-y-2">
      <div className="flex w-full flex-col justify-center gap-4 md:hidden lg:flex lg:flex-row lg:flex-wrap">
        {listItems.map((text, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            key={index}
            className="flex items-center gap-x-4"
          >
            <Image src="/icons/check.svg" alt="check" width={44} height={44} />
            <p>{text}</p>
          </motion.div>
        ))}
      </div>
      <ProgramListTablet />
    </section>
  );
};

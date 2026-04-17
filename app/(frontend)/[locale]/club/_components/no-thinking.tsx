"use client";

import { AudioLines } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export const NoThinking = () => {
  const t = useTranslations("ClubPage.no-thinking");

  return (
    <div className="px-4 pb-12 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex w-full max-w-[990px] flex-col items-center justify-center gap-5 rounded-[14px] bg-turquoise-dark p-[30px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] lg:h-[224px]"
      >
        <div className="flex flex-col items-center">
          <AudioLines color="#fff" size={80} />
          <h3 className="text-center text-2xl font-semibold text-baby-slate md:text-4xl">
            {t("heading")}
          </h3>
        </div>
        <p className="max-w-[602px] text-center text-[17px] text-baby-slate">
          {t("description")}
        </p>
      </motion.div>
    </div>
  );
};

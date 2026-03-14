"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

type DurationItem = {
  minutes: string;
  label: string;
  description: string;
};

export const Duration = () => {
  const t = useTranslations("ClubPage.duration");
  const items = t.raw("items") as DurationItem[];

  return (
    <section className="bg-turquoise-dark py-20">
      <div className="mx-auto w-11/12 max-w-[1000px] space-y-16">
        <div className="space-y-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold text-baby-slate md:text-[48px] md:leading-tight"
          >
            {t("heading")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xl text-baby-slate"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {items.map((item, index) => (
            <motion.div
              key={item.minutes}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex w-full flex-col items-center rounded-[14px] bg-baby-slate px-5 py-6 text-center shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] lg:w-[305px]"
            >
              <span className="text-[48px] font-bold text-purple-custom">
                {item.minutes}
              </span>
              <div className="flex flex-col items-center gap-2.5 text-off-black">
                <span className="text-xl font-bold">{item.label}</span>
                <p className="text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

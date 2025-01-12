"use client";

import { useTranslations } from "next-intl";
import { CategoryCard } from "./category-card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export const Categories = () => {
  const t = useTranslations("HomePage.categories");
  const cards = t.raw("cards") as {
    [key: string]: { title: string; description: string };
  };

  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    <article className="w-11/12 max-w-[1440px] mx-auto space-y-10 mt-24 lg:mt-[120px]">
      <div className="space-y-2.5">
        <span className="bg-violet-500/20 text-violet-900 rounded-3xl px-3 py-2">
          {t("span")}
        </span>
        <h2>{t("heading")}</h2>
      </div>
      <section className="flex flex-wrap justify-between gap-y-4 md:gap-x-2.5 lg:gap-x-0">
        {Object.entries(cards).map(([key, card], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              (key === "cardio_programs" || key === "programs_of_the_day") &&
                "md:w-[49%] lg:w-[32%] xl:w-[30%]",
              (key === "thematic_programs" || key === "intensives") &&
                "md:w-[49%] lg:w-[32%] xl:w-[29%] 2xl:w-[27%]",
              (key === "marathons" || key === "zone_training") &&
                "md:w-[49%] lg:w-[32%] xl:w-[39%] 2xl:w-5/12"
            )}
          >
            <CategoryCard
              key={key}
              imgSrc={`/images/${key}.jpg`}
              title={card.title}
              description={card.description}
              link={`/${locale}/programs/#${key}`}
            />
          </motion.div>
        ))}
      </section>
    </article>
  );
};

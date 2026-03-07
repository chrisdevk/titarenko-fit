"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CategoryCard } from "./category-card";

export const Categories = () => {
  const t = useTranslations("HomePage.categories");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] as "en" | "ru";
  const cards = t.raw("cards") as {
    [key: string]: { title: string; description: string } | null;
  };
  const cardEntries = Object.entries(cards).filter(
    (entry): entry is [string, { title: string; description: string }] =>
      entry[1] != null,
  );

  return (
    <article className="bg-turquoise-dark">
      <div className="relative rounded-t-3xl bg-purple-custom py-16">
        <div className="relative z-10 mx-auto w-11/12 max-w-[1440px] space-y-10">
          <div className="space-y-3">
            <span className="rounded-3xl bg-white px-3 py-2 text-off-black">
              {t("span")}
            </span>
            <h2 className="text-white">{t("heading")}</h2>
          </div>
          <section className="flex flex-wrap justify-between gap-y-3 md:gap-x-2.5 lg:gap-x-0">
            {cardEntries.map(([key, card], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  (key === "cardio_programs" ||
                    key === "programs_of_the_day") &&
                    "md:w-[49%] lg:w-[32%] xl:w-[30%]",
                  (key === "thematic_programs" || key === "intensives") &&
                    "md:w-[49%] lg:w-[32%] xl:w-[29%] 2xl:w-[27%]",
                  (key === "marathons" || key === "zone_training") &&
                    "md:w-[49%] lg:w-[32%] xl:w-[39%] 2xl:w-5/12",
                )}
              >
                <CategoryCard
                  key={key}
                  imgSrc={`/images/${locale === "ru" ? key : `${key}_en`}.jpg`}
                  title={card.title}
                  description={card.description}
                  link={`/${locale}/programs#${card.title.toLowerCase()}`}
                />
              </motion.div>
            ))}
          </section>
        </div>
        <div className="absolute right-0 top-0 h-[332px] w-[720px]">
          <Image src="/icons/lines-turquoise.svg" alt="turquoise lines" fill />
        </div>
      </div>
    </article>
  );
};

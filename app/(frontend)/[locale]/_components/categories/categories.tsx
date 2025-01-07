"use client";

import { useTranslations } from "next-intl";
import { CategoryCard } from "./category-card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Categories = () => {
  const t = useTranslations("HomePage.categories");
  const cards = t.raw("cards") as {
    [key: string]: { title: string; description: string };
  };

  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    <article className="w-11/12 max-w-[1440px] mx-auto space-y-10 mt-24">
      <h2>{t("heading")}</h2>
      <section className="flex flex-wrap justify-between gap-y-4">
        {Object.entries(cards).map(([key, card]) => (
          <CategoryCard
            key={key}
            imgSrc={`/images/${key}.jpg`}
            title={card.title}
            description={card.description}
            link={`/${locale}/${key}`}
            className={cn(
              (key === "card_one" || key === "card_six") &&
                "w-[32%] xl:w-[30%]",
              (key === "card_two" || key === "card_five") &&
                "w-[32%] xl:w-[29%] 2xl:w-[27%]",
              (key === "card_three" || key === "card_four") &&
                "w-[32%] xl:w-[39%] 2xl:w-5/12"
            )}
          />
        ))}
      </section>
    </article>
  );
};

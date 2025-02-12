"use client";

import { useState } from "react";
import { CategoryDropdown } from "./category-dropdown";
import { Category, Product } from "@/payload-types";
import { ProgramCard } from "./program-card";
import { useTranslations } from "next-intl";

interface ProgramsMobileProps {
  locale: string;
  categories: Category[];
  programs: Product[];
}

export const ProgramsMobile = ({
  locale,
  categories,
  programs,
}: ProgramsMobileProps) => {
  const [currentCategory, setCurrentCategory] = useState("all");

  const t = useTranslations("ProgramPage");

  const filteredPrograms = programs.filter((program) => {
    if (typeof program.categories === "number") {
      return (
        program.categories ===
        categories.find((c) => c.title === currentCategory)?.id
      );
    }

    if (typeof program.categories === "object") {
      return program.categories.title === currentCategory;
    }

    return false;
  });

  const categoryProgramCounts = categories.map((category) => ({
    id: category.id,
    title: category.title,
    count: programs.filter((program) => {
      if (typeof program.categories === "number") {
        return program.categories === category.id;
      }
      if (typeof program.categories === "object") {
        return program.categories.title === category.title;
      }
      return false;
    }).length,
  }));

  return (
    <div className="mt-8 space-y-8 lg:hidden">
      <CategoryDropdown
        categories={categoryProgramCounts}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        programs={programs}
        filteredPrograms={filteredPrograms}
      />
      {currentCategory === "all" && <h2>{t("all")}</h2>}
      {currentCategory !== "all" && <h2>{currentCategory}</h2>}
      <div className="flex flex-col flex-wrap justify-between gap-y-4 md:flex-row">
        {currentCategory === "all" &&
          programs.map((program) => {
            const imgSrc =
              typeof program.product_thumbnail === "object" &&
              program.product_thumbnail?.url
                ? program.product_thumbnail.url
                : null;

            return (
              <div key={program.id} className="w-full md:w-[49%]">
                <ProgramCard
                  title={program.title}
                  question={program.product_question}
                  description={program.product_description}
                  imgSrc={imgSrc || "/images/no-image.webp"}
                  path={`/${locale}/programs/${program.id}`}
                />
              </div>
            );
          })}
        {currentCategory !== "all" &&
          filteredPrograms.map((program) => {
            const imgSrc =
              typeof program.product_thumbnail === "object" &&
              program.product_thumbnail?.url
                ? program.product_thumbnail.url
                : null;

            return (
              <div key={program.id} className="w-full md:w-[49%]">
                <ProgramCard
                  title={program.title}
                  question={program.product_question}
                  description={program.product_description}
                  imgSrc={imgSrc || "/images/no-image.webp"}
                  path={`/${locale}/programs/${program.id}`}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

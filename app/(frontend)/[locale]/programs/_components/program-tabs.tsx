"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Category, Product } from "@/payload-types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProgramCard } from "./program-card";

interface ProgramTabsProps {
  programs: Product[];
  categories: Category[];
  locale: string;
}

export const ProgramTabs = ({
  programs,
  categories,
  locale,
}: ProgramTabsProps) => {
  const [currentCategory, setCurrentCategory] = useState("all");

  const t = useTranslations("ProgramPage");

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

  let filteredPrograms = programs.filter((program) => {
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

  const splitIntoRows = (programs: Product[], itemsPerRow: number) => {
    const rows = [];
    for (let i = 0; i < programs.length; i += itemsPerRow) {
      rows.push(programs.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const productRows = splitIntoRows(programs, 3);
  const filteredProductsRows = splitIntoRows(filteredPrograms, 3);

  return (
    <Tabs defaultValue="all" className="w-full mt-10">
      <TabsList className="w-full justify-between bg-transparent border-b-2 border-b-baby-slate rounded-none">
        <TabsTrigger
          value="all"
          onClick={() => setCurrentCategory("all")}
          className="flex items-center gap-x-2 bg-transparent rounded-none relative"
        >
          {t("all")}{" "}
          <span className="text-xs text-indigo-custom bg-baby-slate rounded-3xl px-1.5">
            {programs.length}
          </span>
          {currentCategory === "all" && (
            <motion.div
              layoutId="underline"
              id="underline"
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-custom rounded-3xl"
            />
          )}
        </TabsTrigger>
        {categoryProgramCounts.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.title!}
            onClick={() => setCurrentCategory(category.title!)}
            className="relative flex items-center gap-x-2"
          >
            {category.title}
            <span className="text-xs text-indigo-custom bg-baby-slate rounded-3xl px-1.5">
              {category.count}
            </span>
            {category.title === currentCategory && (
              <motion.div
                layoutId="underline"
                id="underline"
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-custom rounded-3xl"
              />
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent
        value="all"
        className="mt-10 bg-baby-slate rounded-3xl px-7 py-4"
      >
        <article className="space-y-5">
          <h2 className="flex items-center gap-x-2">
            {t("all")}{" "}
            <span className="text-xl text-indigo-custom bg-off-white rounded-3xl px-1.5 w-11 text-center">
              {programs.length}
            </span>
          </h2>
          <section className="flex flex-wrap justify-between gap-y-5">
            {productRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex flex-wrap gap-y-5 ${
                  row.length === 3 ? "justify-between" : "justify-start gap-x-5"
                }`}
              >
                {row.map((program, index) => {
                  const imgSrc =
                    typeof program.product_thumbnail === "object" &&
                    program.product_thumbnail?.url
                      ? program.product_thumbnail.url
                      : null;

                  return (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="w-[32.5%]"
                    >
                      <ProgramCard
                        title={program.title}
                        question={program.product_question}
                        description={program.product_description!}
                        imgSrc={imgSrc!}
                        path={`${locale}/programs/${program.slug}`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </section>
        </article>
      </TabsContent>
      {currentCategory !== "all" && (
        <TabsContent
          value={currentCategory}
          className="mt-10 bg-baby-slate rounded-3xl px-7 py-4"
        >
          <article className="space-y-5">
            <h2 className="flex items-center gap-x-2">
              {currentCategory}
              <span className="text-xl text-indigo-custom bg-off-white rounded-3xl px-1.5 w-11 text-center">
                {filteredPrograms.length}
              </span>
            </h2>
            <AnimatePresence mode="wait">
              {filteredPrograms.length === 0 ? (
                <p className="min-h-[500px]">{t("no-programs")}</p>
              ) : (
                <section className="gap-y-5">
                  {filteredProductsRows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className={`flex flex-wrap gap-y-5 ${
                        row.length === 3
                          ? "justify-between"
                          : "justify-start gap-x-5"
                      }`}
                    >
                      {row.map((program, index) => {
                        const imgSrc =
                          typeof program.product_thumbnail === "object" &&
                          program.product_thumbnail?.url
                            ? program.product_thumbnail.url
                            : null;

                        return (
                          <motion.div
                            key={program.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1,
                            }}
                            className="w-[32.5%]"
                          >
                            <ProgramCard
                              title={program.title}
                              question={program.product_question}
                              description={program.product_description!}
                              imgSrc={imgSrc!}
                              path={`${locale}/programs/${program.slug}`}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </section>
              )}
            </AnimatePresence>
          </article>
        </TabsContent>
      )}
    </Tabs>
  );
};

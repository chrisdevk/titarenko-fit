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

  const validPrograms = programs.filter((program) => program.title);

  const categoryProgramCounts = categories.map((category) => ({
    id: category.id,
    title: category.title,
    count: validPrograms.filter((program) => {
      if (typeof program.categories === "number") {
        return program.categories === category.id;
      }
      if (typeof program.categories === "object") {
        return program.categories.title === category.title;
      }
      return false;
    }).length,
  }));

  const filteredPrograms = validPrograms.filter((program) => {
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
    <Tabs defaultValue="all" className="mt-10 hidden w-full lg:block">
      <TabsList className="w-full justify-between rounded-none border-b-2 border-b-turquoise-dark bg-transparent">
        <TabsTrigger
          value="all"
          onClick={() => setCurrentCategory("all")}
          className="relative flex items-center gap-x-2 rounded-none bg-transparent"
        >
          {t("all")}{" "}
          <span className="rounded-3xl bg-purple-custom px-1.5 text-xs text-white">
            {validPrograms.length}
          </span>
          {currentCategory === "all" && (
            <motion.div
              layoutId="underline"
              id="underline"
              className="absolute -bottom-1 left-0 h-0.5 w-full rounded-3xl bg-purple-custom"
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
            <span className="rounded-3xl bg-purple-custom px-1.5 text-xs text-white">
              {category.count}
            </span>
            {category.title === currentCategory && (
              <motion.div
                layoutId="underline"
                id="underline"
                className="absolute -bottom-1 left-0 h-0.5 w-full rounded-3xl bg-purple-custom"
              />
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="min-h-[560px] py-8">
        <TabsContent value="all">
          <article className="space-y-5">
            <h2 className="flex items-center gap-x-2">
              {t("all")}{" "}
              <span className="w-11 rounded-3xl bg-purple-custom px-1.5 text-center text-xl text-white">
                {validPrograms.length}
              </span>
            </h2>
            <section className="flex flex-wrap justify-between gap-y-5">
              {validPrograms.length === 0 ? (
                <p>{t("no-programs")}</p>
              ) : (
                productRows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`flex w-full flex-wrap gap-y-5 ${
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
                      if (program.title) {
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
                              imgSrc={imgSrc || "/images/no-image.jpg"}
                              path={`/${locale}/programs/${program.id}`}
                            />
                          </motion.div>
                        );
                      }
                    })}
                  </div>
                ))
              )}
            </section>
          </article>
        </TabsContent>
        {currentCategory !== "all" && (
          <TabsContent value={currentCategory}>
            <article className="space-y-5">
              <h2 className="flex items-center gap-x-2">
                {currentCategory}
                <span className="w-11 rounded-3xl bg-purple-custom px-1.5 text-center text-xl text-white">
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

                          if (program.title) {
                            return (
                              <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
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
                                  imgSrc={imgSrc || "/images/no-image.jpg"}
                                  path={`/${locale}/programs/${program.id}`}
                                />
                              </motion.div>
                            );
                          }
                        })}
                      </div>
                    ))}
                  </section>
                )}
              </AnimatePresence>
            </article>
          </TabsContent>
        )}
      </div>
    </Tabs>
  );
};

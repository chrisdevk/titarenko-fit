"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Category, Product } from "@/payload-types";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ProgramTabsProps {
  programs: Product[];
  categories: Category[];
}

export const ProgramTabs = ({ programs, categories }: ProgramTabsProps) => {
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

  const getTabValue = (program: Product): string => {
    if (typeof program.categories === "object" && program.categories.title) {
      return program.categories.title;
    }
    return "";
  };

  return (
    <Tabs defaultValue="all" className="w-full mt-10">
      <TabsList className="w-full justify-between">
        <TabsTrigger
          value="all"
          onClick={() => setCurrentCategory("all")}
          className="flex items-center gap-x-2"
        >
          {t("all")}{" "}
          <span className="text-xs text-indigo-custom bg-baby-slate rounded-3xl px-1.5">
            {programs.length}
          </span>
        </TabsTrigger>
        {categoryProgramCounts.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.title!}
            onClick={() => setCurrentCategory(category.title!)}
          >
            {category.title}
            <span className="text-xs text-indigo-custom bg-baby-slate rounded-3xl px-1.5">
              {category.count}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="all">
        {programs.map((program) => program.title)}
      </TabsContent>
      {filteredPrograms.map((program) => (
        <TabsContent value={getTabValue(program)} key={program.id}>
          {program.title}
        </TabsContent>
      ))}
    </Tabs>
  );
};

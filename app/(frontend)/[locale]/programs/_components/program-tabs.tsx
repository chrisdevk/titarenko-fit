"use client";

import { Tabs, TabsList } from "@/components/ui/tabs";
import type { Category, Product } from "@/payload-types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FilteredProgramsContent } from "./filtered-programs-content";
import { TabTrigger } from "./tab-trigger";

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
  const searchParams = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    const categoryId = searchParams.get("category");
    if (categoryId) {
      const matched = categories.find((c) => String(c.id) === categoryId);
      if (matched?.title) setCurrentCategory(matched.title);
    }
  }, [searchParams, categories]);

  const validPrograms = programs.filter((program) => program.title);

  const categoryProgramCounts = categories.map((category) => ({
    id: category.id,
    title: category.title,
    count: validPrograms.filter((program) => {
      if (typeof program.categories === "number") {
        return program.categories === category.id;
      }
      if (typeof program.categories === "object") {
        return program.categories?.title === category.title;
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
      return program.categories?.title === currentCategory;
    }
    return false;
  });

  return (
    <Tabs defaultValue="all" className="mt-10 hidden w-full xl:block">
      <TabsList className="w-full justify-between rounded-none border-b-2 border-b-turquoise-dark bg-transparent">
        <TabTrigger
          value="all"
          onClick={() => setCurrentCategory("all")}
          isActive={currentCategory === "all"}
          count={validPrograms.length}
        />
        {categoryProgramCounts.map((category) => (
          <TabTrigger
            key={category.id}
            value={category.title!}
            onClick={() => setCurrentCategory(category.title!)}
            isActive={category.title === currentCategory}
            count={category.count}
          />
        ))}
      </TabsList>
      <div className="min-h-[560px] py-8">
        <FilteredProgramsContent
          filteredPrograms={
            currentCategory === "all" ? validPrograms : filteredPrograms
          }
          locale={locale}
          categoryName={currentCategory}
        />
      </div>
    </Tabs>
  );
};

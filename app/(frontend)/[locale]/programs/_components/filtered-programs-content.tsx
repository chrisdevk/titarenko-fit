import { AnimatePresence } from "motion/react";
import { ProgramRow } from "./program-row";
import { Product } from "@/payload-types";
import { useTranslations } from "next-intl";

interface FilteredProgramsContentProps {
  filteredPrograms: Product[];
  locale: string;
  categoryName: string;
}

export const FilteredProgramsContent = ({
  filteredPrograms,
  locale,
  categoryName,
}: FilteredProgramsContentProps) => {
  const t = useTranslations("ProgramPage");

  return (
    <article className="space-y-5">
      <h2 className="flex items-center gap-x-2">
        {t(categoryName)}
        <span className="w-11 rounded-3xl bg-purple-custom px-1.5 text-center text-xl text-white">
          {filteredPrograms.length}
        </span>
      </h2>
      <AnimatePresence mode="wait">
        {filteredPrograms.length === 0 ? (
          <p className="min-h-[500px]">No programs found</p>
        ) : (
          <section className="gap-y-5">
            <ProgramRow programs={filteredPrograms} locale={locale} />
          </section>
        )}
      </AnimatePresence>
    </article>
  );
};

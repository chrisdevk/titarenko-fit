import { ProgramCard } from "./program-card";
import { motion } from "motion/react";
import { Product } from "@/payload-types";
import { cn } from "@/lib/utils";

interface ProgramRowProps {
  programs: Product[];
  locale: string;
}

export const ProgramRow = ({ programs, locale }: ProgramRowProps) => {
  const localizedPrograms = programs.filter((program) => program.title?.trim());

  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-5",
        localizedPrograms.length === 3
          ? "justify-between"
          : "justify-start gap-x-5",
      )}
    >
      {localizedPrograms.map((program, index) => {
        const imgSrc =
          typeof program.product_thumbnail === "object" &&
          program.product_thumbnail?.url
            ? program.product_thumbnail.url
            : "/images/no-image.webp";

        return (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <ProgramCard
              title={program.title}
              question={program.product_question}
              description={program.product_description!}
              imgSrc={imgSrc}
              path={`/${locale}/programs/${program.id}`}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

import { ProgramCard } from "./program-card";
import { motion } from "motion/react";
import { Product } from "@/payload-types";
import { cn } from "@/lib/utils";

interface ProgramRowProps {
  programs: Product[];
  locale: string;
}

export const ProgramRow = ({ programs, locale }: ProgramRowProps) => (
  <div
    className={cn(
      "flex w-full flex-wrap gap-y-5",
      programs.length === 3 ? "justify-between" : "justify-start gap-x-5",
    )}
  >
    {programs.map((program, index) => {
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
          className="w-[32.5%]"
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

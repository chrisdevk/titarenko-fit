"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export const Awards = () => {
  const t = useTranslations("HomePage.awards");
  const achievements = t.raw("achievements") as {
    [key: string]: string;
  };

  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    <section className="bg-gradient-to-r from-[#E1E2E5] to-[#D8D9DE]">
      <div className="bg-turquoise-dark rounded-t-3xl relative">
        <div className="w-11/12 max-w-[1440px] mx-auto space-y-5 md:space-y-10 py-16 flex flex-col items-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="uppercase text-center text-white"
          >
            {t("heading")}
          </motion.h2>
          <div className="flex flex-wrap items-center justify-between z-10 gap-y-2">
            {Object.entries(achievements).map(([key, value], index) => (
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 bg-turquoise-light rounded-3xl w-[49%] lg:w-[24%] h-[140px] lg:h-[140px] flex items-center"
              >
                {value}
              </motion.p>
            ))}
          </div>
          <Link
            href={`/${locale}/awards`}
            className={cn("z-10", buttonVariants({ size: "lg" }))}
          >
            {t("button")}
            <MoveUpRight size={24} />
          </Link>
        </div>
        <div className="absolute left-0 top-0 w-[226px] h-[160px]">
          <Image src="/images/icons/lines.svg" alt="lines" fill />
        </div>
        <div className="absolute right-0 bottom-0 w-[226px] h-[160px] rotate-180">
          <Image src="/images/icons/lines.svg" alt="lines" fill />
        </div>
      </div>
    </section>
  );
};

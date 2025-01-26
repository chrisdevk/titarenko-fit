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
      <div className="relative rounded-t-3xl bg-turquoise-dark">
        <div className="mx-auto flex w-11/12 max-w-[1440px] flex-col items-center space-y-5 py-16 md:space-y-10">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center uppercase text-white"
          >
            {t("heading")}
          </motion.h2>
          <div className="z-10 flex flex-wrap items-center justify-between gap-y-2">
            {Object.entries(achievements).map(([key, value], index) => (
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex h-[140px] w-[49%] items-center rounded-3xl bg-turquoise-light p-4 lg:h-[140px] lg:w-[24%]"
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
        <div className="absolute left-0 top-0 h-[160px] w-[226px]">
          <Image src="/images/icons/lines.svg" alt="lines" fill />
        </div>
        <div className="absolute bottom-0 right-0 h-[160px] w-[226px] rotate-180">
          <Image src="/images/icons/lines.svg" alt="lines" fill />
        </div>
      </div>
    </section>
  );
};

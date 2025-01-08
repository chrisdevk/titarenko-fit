"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export const Awards = () => {
  const t = useTranslations("HomePage.awards");
  return (
    <section className="w-11/12 max-w-[1200px] 2xl:max-w-[1440px] mx-auto space-y-5 md:space-y-10 mt-24">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="uppercase text-center"
      >
        {t("heading")} <span className="px-2 md:px-3">• </span>
        <span className="text-indigo-custom">{t("heading-span")}</span>
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-x-11 gap-y-5 md:max-h-[380px] lg:max-h-none">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full md:w-1/2 h-[280px] md:h-auto flex-grow"
        >
          <Image
            src="/images/awards-img.png"
            alt="Awards & Achievements"
            fill
            className="object-cover rounded-3xl"
          />
        </motion.div>
        <div className="space-y-6 md:w-1/2">
          <div className="space-y-2 md:max-h-[128px] lg:max-h-none">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="uppercase flex items-center gap-x-2"
            >
              {t("achievements")}{" "}
              <Image
                src="/images/icons/award-i.svg"
                alt="Medal icon"
                width={24}
                height={24}
              />
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="leading-[30px] text-base text-grey-custom md:line-clamp-3 lg:line-clamp-none"
            >
              {t("achievements-paragraph")}
            </motion.p>
          </div>
          <div className="space-y-2 md:max-h-[158px] lg:max-h-none">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="uppercase flex items-center gap-x-2"
            >
              {t("experience")}
              <Image
                src="/images/icons/pen-i.svg"
                alt="Medal icon"
                width={24}
                height={24}
              />
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="leading-[30px] text-base text-grey-custom md:line-clamp-4 lg:line-clamp-none"
            >
              {t("experience-paragraph")}
            </motion.p>
          </div>
          <Link
            href="/"
            className={cn(
              "w-fit",
              buttonVariants({ variant: "secondary", size: "lg" })
            )}
          >
            <span>{t("button")}</span>
            <MoveUpRight size={24} />
          </Link>
        </div>
      </div>
    </section>
  );
};

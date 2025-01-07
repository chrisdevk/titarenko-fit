"use client";

import { buttonVariants } from "@/components/ui/button";
import { Socials } from "@/components/ui/socials";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export const Hero = () => {
  const t = useTranslations("HomePage.hero");

  const heading = t("heading")
    .split(/(\s+)/)
    .map((word, index) => {
      const trimmedWord = word.trim();
      if (/^(stronger|сильнее)$/i.test(trimmedWord)) {
        return (
          <span key={index} className="text-indigo-custom">
            {trimmedWord}{" "}
          </span>
        );
      }
      return `${word}`;
    });

  return (
    <section className="w-11/12 mx-auto mt-[90px] h-fit flex flex-col gap-y-24 px-8 pt-24 pb-8 relative max-w-[1200px] 2xl:max-w-[1440px]">
      <div className="flex flex-col gap-y-10 max-w-[692px]">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl max-w-[480px]"
        >
          {t("paragraph")}
        </motion.p>
        <Link
          href="/"
          className={cn(
            "w-fit",
            buttonVariants({ variant: "default", size: "lg" })
          )}
        >
          <span>{t("button")}</span>
          <MoveUpRight size={24} />
        </Link>
      </div>
      <div>
        <Socials />
      </div>
      <div className="absolute left-0 top-0 w-full h-full -z-10">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero image"
          fill
          quality={100}
          priority
          className="object-cover overflow-hidden rounded-3xl"
        />
      </div>
    </section>
  );
};

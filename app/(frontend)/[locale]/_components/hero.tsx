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
    <section className="w-11/12 mx-auto mt-20 h-fit flex flex-col gap-y-20 md:gap-y-44 lg:gap-y-24 py-9 px-2.5 md:py-9 md:px-6 lg:px-8 lg:pt-24 lg:pb-8 relative max-w-[1200px] 2xl:max-w-[1440px] bg-[#DCDCDC] md:bg-transparent rounded-3xl">
      <div className="flex flex-col gap-y-6 md:gap-y-10 md:max-w-[451px] lg:max-w-[692px]">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center md:text-start"
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-xl max-w-[480px] text-center md:text-start"
        >
          {t("paragraph")}
        </motion.p>
        <Link
          href="/"
          className={cn(
            "w-fit mx-auto md:mx-0",
            buttonVariants({ variant: "default", size: "lg" })
          )}
        >
          <span>{t("button")}</span>
          <MoveUpRight size={24} />
        </Link>
      </div>
      <div className="flex justify-center md:justify-start">
        <Socials />
      </div>
      <div className="absolute left-0 top-0 size-full -z-10 hidden lg:block">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero image"
          fill
          quality={100}
          priority
          className="object-cover overflow-hidden rounded-3xl"
        />
      </div>
      <div className="absolute left-0 top-0 size-full -z-10 hidden md:block lg:hidden">
        <Image
          src="/images/hero-tablet.png"
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

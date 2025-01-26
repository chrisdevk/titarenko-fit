"use client";

import { buttonVariants } from "@/components/ui/button";
import { Socials } from "@/components/ui/socials";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export const Hero = () => {
  const t = useTranslations("HomePage.hero");

  const heading = t("heading")
    .split(/(\s+)/)
    .map((word, index) => {
      const trimmedWord = word.trim();
      if (/^(stronger|сильнее)$/i.test(trimmedWord)) {
        return (
          <span key={index} className="text-purple-custom lg:ml-[-16px]">
            {trimmedWord}
          </span>
        );
      }
      return `${word}`;
    });

  const pullupVariant = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="mt-20 h-fit py-9 px-2.5 md:py-9 md:px-0 md:pt-20 lg:mt-0 lg:px-8 lg:pt-40 lg:h-screen lg:pb-8 relative bg-[#DCDCDC] md:bg-transparent lg:flex lg:items-center">
      <div className="w-11/12 max-w-[1440px] mx-auto flex flex-col gap-y-20 md:gap-y-44 lg:gap-y-24">
        <div className="flex flex-col gap-y-6 md:gap-y-10 max-w-[692px]">
          <div className="flex flex-wrap justify-center md:justify-start">
            {heading.map((current, i) => (
              <motion.h1
                key={i}
                ref={ref}
                variants={pullupVariant}
                initial="initial"
                animate={isInView ? "animate" : ""}
                custom={i}
                className={cn("text-center md:text-start pr-2 text-off-black")}
              >
                {current == "" ? <span>&nbsp;</span> : current}
              </motion.h1>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-[480px] text-center md:text-start"
          >
            {t("paragraph")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-fit mx-auto md:mx-0"
          >
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              <span>{t("button")}</span>
              <MoveUpRight size={24} />
            </Link>
          </motion.div>
        </div>
        <div className="flex justify-center md:justify-start">
          <Socials />
        </div>
      </div>
      <div className="absolute left-0 top-0 size-full -z-10 hidden lg:block">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero image"
          fill
          quality={100}
          priority
          className="object-cover overflow-hidden"
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

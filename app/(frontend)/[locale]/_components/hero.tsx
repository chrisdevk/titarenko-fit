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
          <span key={index} className="-ml-2 text-purple-custom lg:ml-[-16px]">
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
    <section className="relative mt-20 h-fit bg-[#DCDCDC] py-9 md:bg-transparent md:px-0 md:py-9 md:pt-20 lg:mt-0 lg:flex lg:h-screen lg:items-center lg:px-8 lg:pb-8 lg:pt-40">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-y-6 md:w-11/12 md:gap-y-44 lg:gap-y-24">
        <div className="flex max-w-[692px] flex-col gap-y-6 md:gap-y-10">
          <div className="mx-auto flex w-11/12 flex-wrap justify-center px-2.5 md:mx-0 md:w-full md:justify-start md:px-0">
            {heading.map((current, i) => (
              <motion.h1
                key={i}
                ref={ref}
                variants={pullupVariant}
                initial="initial"
                animate={isInView ? "animate" : ""}
                custom={i}
                className={cn(
                  "pr-1 text-center text-off-black md:pr-2 md:text-start",
                )}
              >
                {current == "" ? <span>&nbsp;</span> : current}
              </motion.h1>
            ))}
          </div>
          <div className="relative h-[320px] w-full md:hidden">
            <Image
              src="/images/hero-mobile.jpg"
              alt="Hero image"
              fill
              quality={100}
              priority
              className="overflow-hidden object-cover object-bottom"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-11/12 max-w-[480px] text-center md:mx-0 md:w-full md:text-start md:text-xl"
          >
            {t("paragraph")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto w-fit md:mx-0"
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
      <div className="absolute left-0 top-0 -z-10 hidden size-full lg:block">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero image"
          fill
          quality={100}
          priority
          className="overflow-hidden object-cover"
        />
      </div>
      <div className="absolute left-0 top-0 -z-10 hidden size-full md:block lg:hidden">
        <Image
          src="/images/hero-tablet.png"
          alt="Hero image"
          fill
          quality={100}
          priority
          className="overflow-hidden rounded-3xl object-cover"
        />
      </div>
    </section>
  );
};

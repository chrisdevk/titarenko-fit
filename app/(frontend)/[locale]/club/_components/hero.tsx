"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export const ClubHero = () => {
  const t = useTranslations("ClubPage.hero");

  return (
    <section className="relative overflow-hidden bg-purple-custom pb-20 pt-32 md:pt-40 lg:pb-24">
      <div className="relative z-10 mx-auto flex w-11/12 max-w-[1440px] flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[670px] flex-col gap-y-12">
          <div className="flex flex-col gap-y-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-semibold text-baby-slate md:text-5xl lg:text-[64px] lg:leading-none"
            >
              {t("heading")}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-[621px] text-[22px] leading-normal text-baby-slate"
            >
              <p>{t("paragraph")}</p>
              <br />
              <p>
                {t("paragraph-emphasis").replace("ЖЕНЩИН", "").trim()}{" "}
                <span className="font-medium">ЖЕНЩИН</span>.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              href="#subscription"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "h-[50px] w-[320px] rounded-[56px] text-lg font-semibold",
              )}
            >
              {t("button")}
              <MoveUpRight className="size-5" />
            </Link>
          </motion.div>
        </div>

        <Image src="/images/club-hero.png" alt="" width={500} height={500} />
      </div>
    </section>
  );
};

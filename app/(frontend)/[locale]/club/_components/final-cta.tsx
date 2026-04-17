"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveUpRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export const FinalCta = () => {
  const t = useTranslations("ClubPage.cta");

  return (
    <section className="relative overflow-hidden bg-cyan-light py-20">
      <div className="mx-auto flex w-11/12 max-w-[1100px] flex-col items-center justify-between gap-y-10 lg:flex-row lg:gap-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex max-w-[755px] flex-col gap-10"
        >
          <div className="flex flex-col gap-[30px]">
            <div className="flex gap-[22px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-[50px] fill-purple-custom text-purple-custom"
                />
              ))}
            </div>
            <div className="flex flex-col gap-[30px] text-off-black">
              <h2 className="text-3xl font-semibold md:text-[48px] md:leading-tight">
                {t("heading")}
              </h2>
              <p className="text-2xl">{t("paragraph")}</p>
            </div>
          </div>
          <Link
            href="#subscription"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "z-10 w-fit",
            )}
          >
            {t("button")}
            <MoveUpRight className="size-5" />
          </Link>
        </motion.div>
        <Image src="/images/final-cta.png" alt="" width={305} height={313} />
      </div>

      <div className="absolute -bottom-1 -right-[5%] hidden h-[299px] w-[400px] -rotate-90 -scale-y-100 lg:block">
        <Image src="/icons/lines-purple.svg" alt="" fill />
      </div>
    </section>
  );
};

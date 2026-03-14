"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const WhySection = () => {
  const t = useTranslations("ClubPage.why");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="relative overflow-hidden bg-baby-slate py-20">
      <div className="mx-auto flex w-11/12 max-w-[1100px] flex-col items-center gap-14 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-[389px] shrink-0"
        >
          <Image src="/images/club-cta.png" alt="" width={389} height={407} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex max-w-[607px] flex-col gap-9"
        >
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-[18px]">
              <div className="w-fit rounded-3xl bg-[#e3e3ff] px-3.5 py-2">
                <span className="text-[17px] font-medium text-purple-custom">
                  {t("badge")}
                </span>
              </div>
              <h2 className="text-3xl font-semibold text-off-black md:text-[48px] md:leading-tight">
                {t("heading")}
              </h2>
            </div>
            <div className="flex flex-col gap-[26px] text-lg text-off-black">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="font-medium">{t("cta-text")}</p>
            </div>
          </div>
          <Link
            href={`/${locale}/club#subscription`}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "z-10 w-fit",
            )}
          >
            {t("button")}
            <MoveUpRight className="size-5" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute -bottom-[6%] right-0 hidden h-[351px] w-[355px] rotate-180 lg:block">
        <Image src="/icons/lines-purple.svg" alt="" fill />
      </div>
    </section>
  );
};

"use client";

import { cn } from "@/lib/utils";
import {
  Activity,
  Dumbbell,
  Flame,
  Heart,
  Sparkles,
  Target,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const workoutIcons = [
  Heart,
  Dumbbell,
  Flame,
  Waves,
  Activity,
  Wind,
  Zap,
  Target,
  Sparkles,
];

export const WorkoutVariety = () => {
  const t = useTranslations("ClubPage.workout-variety");
  const types = t.raw("types") as string[];

  return (
    <section className="relative overflow-hidden bg-purple-custom py-20">
      <div className="relative z-10 mx-auto w-11/12 max-w-[1056px] space-y-12">
        <div className="space-y-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold text-baby-slate md:text-[48px] md:leading-tight"
          >
            {t("heading")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-xl text-baby-slate"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-[975px] grid-cols-1 gap-[30px] sm:grid-cols-2 md:grid-cols-3">
          {types.map((type, index) => {
            const Icon = workoutIcons[index % workoutIcons.length];
            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex h-[139px] w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-[14px] bg-baby-slate px-3 py-7 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
              >
                <Icon
                  className={cn(
                    "size-[43px]",
                    index % 3 === 1
                      ? "text-turquoise-dark"
                      : "text-purple-custom",
                  )}
                  strokeWidth={1.5}
                />
                <span className="text-center text-xl font-semibold text-off-black">
                  {type}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute -bottom-[5%] right-0 hidden h-[323px] w-[588px] -scale-y-100 lg:block">
        <Image src="/icons/lines-turquoise.svg" alt="" fill />
      </div>
    </section>
  );
};

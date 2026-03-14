"use client";

import { cn } from "@/lib/utils";
import { Calendar, CalendarCheck, Crown, Flame, Link } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type IntroCard = {
  title: string;
  description: string;
};

const cardIcons = [
  { icon: Crown, bg: "bg-turquoise-light" },
  { icon: Flame, bg: "bg-[#e3e3ff]" },
  { icon: Calendar, bg: "bg-turquoise-light" },
  { icon: CalendarCheck, bg: "bg-[#e3e3ff]" },
];

const cardImages = [
  "/images/exclusive.png",
  "/images/participation.png",
  "/images/calender.png",
  "/images/balanced_load.png",
];

export const ClubIntro = () => {
  const t = useTranslations("ClubPage.intro");
  const cards = t.raw("cards") as IntroCard[];

  return (
    <div className="py-20">
      <div className="mx-auto w-11/12 max-w-[990px] space-y-12">
        <div className="flex flex-col items-center gap-y-3 text-center">
          <div className="flex size-[49px] items-center justify-center rounded-full border border-baby-slate bg-turquoise-dark">
            <Link color="#fff" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold text-off-black md:text-[48px] md:leading-tight">
              {t("heading-1")}
              <br />
              {t("heading-2")}
            </h2>
          </motion.div>
          <div className="mx-auto h-[3px] w-[97px] rounded bg-off-black" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center text-xl text-off-black"
        >
          {t("description")}
        </motion.p>

        <div className="flex flex-wrap gap-[34px]">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex w-full overflow-hidden rounded-[14px] bg-baby-slate shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] md:w-[calc(50%-17px)]"
            >
              <div className="flex flex-col gap-5 p-5">
                {(() => {
                  const { icon: Icon, bg } = cardIcons[index];
                  return (
                    <div
                      className={cn(
                        "flex w-fit items-center justify-center rounded-lg p-3",
                        bg,
                      )}
                    >
                      <Icon className="size-6 text-off-black" />
                    </div>
                  );
                })()}
                <div className="flex flex-col gap-3.5">
                  <h3 className="text-xl font-bold text-off-black">
                    {card.title}
                  </h3>
                  <p className="text-[17px] text-off-black">
                    {card.description}
                  </p>
                </div>
              </div>
              <div className="relative ml-auto h-full w-[174px] shrink-0">
                <Image
                  src={cardImages[index]}
                  alt={card.title}
                  fill
                  className="rounded-br-[14px] rounded-tr-[14px] object-cover"
                  sizes="174px"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

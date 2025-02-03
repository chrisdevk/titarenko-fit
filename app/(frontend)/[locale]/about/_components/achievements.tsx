import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export const Achievements = () => {
  const t = useTranslations("AboutPage.achievements");

  return (
    <article className="bg-turquoise-light pb-16 pt-32">
      <section className="mx-auto flex w-11/12 max-w-[1440px] flex-col items-stretch justify-between gap-x-3 gap-y-5 md:flex-row lg:gap-x-10">
        <div className="relative h-[250px] w-full md:h-auto md:w-1/2">
          <Image
            src="/images/achievements-img.jpg"
            alt="achievements"
            fill
            className="z-10 rounded-3xl object-cover"
          />
          <div className="absolute -bottom-3 -left-3 hidden h-full w-full rounded-3xl bg-turquoise-dark md:block lg:-bottom-6 lg:-left-6" />
        </div>
        <div className="space-y-5 md:w-1/2">
          <h2 className="text-center md:text-start">{t("heading")}</h2>
          <div className="space-y-4 rounded-3xl bg-off-white p-4">
            <h3>{t("achievement-subheading")}</h3>
            <p>{t("achievement-paragraph")}</p>
          </div>
          <div className="space-y-4 rounded-3xl bg-off-white p-4">
            <h3>{t("award-subheading")}</h3>
            <p>{t("award-paragraph")}</p>
          </div>
        </div>
      </section>
    </article>
  );
};

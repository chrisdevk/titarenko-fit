import React from "react";
import { TestimonialCarousel } from "./testimonial-carousel";
import { useTranslations } from "next-intl";

export const Testimonials = () => {
  const t = useTranslations("HomePage.testimonials");

  return (
    <section className="mt-24 lg:mt-[120px] w-11/12 max-w-[1440px] mx-auto">
      <div className="space-y-2.5 max-w-[550px]">
        <span className="bg-violet-500/20 text-violet-900 rounded-3xl px-3 py-2">
          {t("span")}
        </span>
        <h2>{t("heading")}</h2>
      </div>
      <TestimonialCarousel />
    </section>
  );
};

import React from "react";
import { TestimonialCarousel } from "./testimonial-carousel";
import { useTranslations } from "next-intl";

export const Testimonials = () => {
  const t = useTranslations("HomePage.testimonials");

  return (
    <article className="bg-purple-custom">
      <section className="bg-off-white rounded-t-3xl py-16">
        <div className="w-11/12 max-w-[1440px] mx-auto">
          <div className="space-y-3 max-w-[550px]">
            <span className="bg-purple-custom text-white rounded-3xl px-3 py-2">
              {t("span")}
            </span>
            <h2>{t("heading")}</h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>
    </article>
  );
};

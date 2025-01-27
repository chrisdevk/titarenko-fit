import React from "react";
import { TestimonialCarousel } from "./testimonial-carousel";
import { useTranslations } from "next-intl";

export const Testimonials = () => {
  const t = useTranslations("HomePage.testimonials");

  return (
    <article className="bg-purple-custom">
      <section className="rounded-t-3xl bg-turquoise-light py-16">
        <div className="mx-auto w-11/12 max-w-[1440px]">
          <div className="max-w-[550px] space-y-3">
            <span className="rounded-3xl bg-purple-custom px-3 py-2 text-white">
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

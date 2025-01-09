import React from "react";
import { TestimonialCarousel } from "./testimonial-carousel";

export const Testimonials = () => {
  return (
    <section className="mt-24 lg:mt-[120px] ml-[6%]">
      <div className="space-y-2.5 max-w-[550px]">
        <span className="bg-violet-500/20 text-violet-900 rounded-3xl px-3 py-2">
          Отзывы
        </span>
        <h2>Что говорят мои замечательные клиенты</h2>
      </div>
      <TestimonialCarousel />
    </section>
  );
};

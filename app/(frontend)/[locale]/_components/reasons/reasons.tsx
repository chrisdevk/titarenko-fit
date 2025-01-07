"use client";

import {
  Clock11,
  Dumbbell,
  Heart,
  House,
  Notebook,
  Shield,
} from "lucide-react";
import { ReasonsCard } from "./reasons-card";

import { motion } from "motion/react";

const reasonsItems = [
  {
    icon: <Clock11 className="size-9 text-white" />,
    text: "Потому что у нас женщин есть время для всех в семье, кроме себя!",
  },
  {
    icon: <House className="size-9 text-white" />,
    text: "Вам не нужно никуда идти, мы будем заниматься в уюте вашего дома, в удобное для вас время.",
  },
  {
    icon: <Heart className="size-9 text-white" />,
    text: "Пора полюбить себя и уделить себе и своему здоровью 10-40 минут в день",
  },
  {
    icon: <Notebook className="size-9 text-white" />,
    text: "Все программы разные по времени и содержанию",
  },
  {
    icon: <Dumbbell className="size-9 text-white" />,
    text: "Тренажерный зал у вас дома с полноценными тренировками",
  },
  {
    icon: <Shield className="size-9 text-white" />,
    text: "Мы тренируемся качественно и безопасно",
  },
];

export const Reasons = () => {
  return (
    <article className="w-11/12 max-w-[1440px] mx-auto flex flex-col items-center gap-y-10 py-16 px-12 2xl:px-32 mt-24 bg-baby-slate rounded-3xl">
      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="uppercase text-center"
      >
        Мои программы направления Женский Фитнес онлайн я создала для нас,
        прекрасных женщин! ПОЧЕМУ?
      </motion.h3>
      <section className="flex flex-wrap w-full justify-between gap-10">
        {reasonsItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="w-[30%]"
          >
            <ReasonsCard icon={item.icon} text={item.text} />
          </motion.div>
        ))}
      </section>
    </article>
  );
};

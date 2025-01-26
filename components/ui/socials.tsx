"use client";

import { motion } from "motion/react";
import { socialLinks } from "@/utils/constants";
import { createElement } from "react";

export const Socials = ({ isFooter }: { isFooter?: boolean }) => {
  return (
    <ul className="flex items-center gap-x-8 md:gap-x-10 gap-y-8">
      {socialLinks.map((social, index) => (
        <motion.li
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          key={social.name}
          transition={{ delay: index * 0.1 }}
        >
          <a
            href={social.link}
            className="hover:scale-110 duration-300 transition-all hidden md:block"
          >
            {createElement(
              social.icon,
              {
                size: isFooter ? 24 : 32,
                color: isFooter ? "white" : "#32324D",
              },
              null
            )}
          </a>
          <a href={social.link} className="md:hidden">
            {createElement(
              social.icon,
              { size: 24, color: isFooter ? "white" : "#32324D" },
              null
            )}
          </a>
        </motion.li>
      ))}
    </ul>
  );
};

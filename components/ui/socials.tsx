"use client";

import { motion } from "motion/react";
import { socialLinks } from "@/lib/constants";
import { createElement } from "react";

export const Socials = () => {
  return (
    <ul className="flex items-center gap-x-10">
      {socialLinks.map((social, index) => (
        <motion.li
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          key={social.name}
          transition={{ delay: index * 0.1 }}
        >
          <a href={social.link} className="hover:opacity-80 transition-opacity">
            {createElement(social.icon, { size: 35 }, null)}
          </a>
        </motion.li>
      ))}
    </ul>
  );
};

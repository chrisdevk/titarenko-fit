"use client";

import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import { motion } from "motion/react";

const socials = [
  {
    name: "Instagram",
    link: "https://instagram.com/alyatitarenko?igshid=YmMyMTA2M2Y=",
    icon: <FaInstagram size={35} />,
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=100086424248283&sk=about_contact_and_basic_info",
    icon: <FaFacebook size={35} />,
  },
  {
    name: "Telegram",
    link: "https://t.me/AlyaTitarenkoFitness",
    icon: <FaTelegram size={35} />,
  },
  {
    name: "Tiktok",
    link: "https://www.tiktok.com/@alyatitarenko?_t=8Wdg3Sde1ZN&_r=1",
    icon: <FaTiktok size={35} />,
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/channel/UChovPG9aAxOmormhdjQWSbg",
    icon: <FaYoutube size={35} />,
  },
];

export const Socials = () => {
  return (
    <ul className="flex items-center gap-x-10">
      {socials.map((social, index) => (
        <motion.li
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          key={social.name}
          transition={{ delay: index * 0.1 }}
        >
          <a href={social.link} className="hover:opacity-80 transition-opacity">
            {social.icon}
          </a>
        </motion.li>
      ))}
    </ul>
  );
};

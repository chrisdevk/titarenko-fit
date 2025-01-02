import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const socials = [
  {
    name: "Instagram",
    link: "#",
    icon: <FaInstagram size={35} />,
  },
  {
    name: "Facebook",
    link: "#",
    icon: <FaFacebook size={35} />,
  },
  {
    name: "Telegram",
    link: "#",
    icon: <FaTelegram size={35} />,
  },
  {
    name: "Tiktok",
    link: "#",
    icon: <FaTiktok size={35} />,
  },
  {
    name: "Youtube",
    link: "#",
    icon: <FaYoutube size={35} />,
  },
];

export const Socials = () => {
  return (
    <ul className="flex items-center gap-x-10">
      {socials.map((social) => (
        <li key={social.name}>
          <a href={social.link} className="hover:opacity-80 transition-opacity">
            {social.icon}
          </a>
        </li>
      ))}
    </ul>
  );
};

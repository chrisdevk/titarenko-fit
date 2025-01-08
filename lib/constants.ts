import {
  Clock11,
  Dumbbell,
  Heart,
  House,
  Notebook,
  Shield,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

export const navlinks = [
  {
    text: "About me",
    path: "/about",
  },
  {
    text: "Programs",
    path: "/programs",
  },
  {
    text: "Blogs",
    path: "/blogs",
  },
];

export const socialLinks = [
  {
    name: "Instagram",
    link: "https://instagram.com/alyatitarenko?igshid=YmMyMTA2M2Y=",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/profile.php?id=100086424248283&sk=about_contact_and_basic_info",
    icon: FaFacebook,
  },
  {
    name: "Telegram",
    link: "https://t.me/AlyaTitarenkoFitness",
    icon: FaTelegram,
  },
  {
    name: "Tiktok",
    link: "https://www.tiktok.com/@alyatitarenko?_t=8Wdg3Sde1ZN&_r=1",
    icon: FaTiktok,
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/channel/UChovPG9aAxOmormhdjQWSbg",
    icon: FaYoutube,
  },
];

export const reasonsItems = [
  {
    icon: Clock11,
    text: "Потому что у нас женщин есть время для всех в семье, кроме себя!",
  },
  {
    icon: House,
    text: "Вам не нужно никуда идти, мы будем заниматься в уюте вашего дома, в удобное для вас время.",
  },
  {
    icon: Heart,
    text: "Пора полюбить себя и уделить себе и своему здоровью 10-40 минут в день",
  },
  {
    icon: Notebook,
    text: "Все программы разные по времени и содержанию",
  },
  {
    icon: Dumbbell,
    text: "Тренажерный зал у вас дома с полноценными тренировками",
  },
  {
    icon: Shield,
    text: "Мы тренируемся качественно и безопасно",
  },
];

export const listItems = [
  "Учитывают разный уровень фитнеса",
  "Адаптированы для Фитнеса Дома",
  "Разнообразны и необычно созданы",
  "Полноценны",
  "Я объясняю возможные ошибки и как их избежать",
  "Уникальны в подборе упражнений",
  "Вам не нужно ничего придумывать! За вас это сделала Я.",
];

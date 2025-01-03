"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { LanguageSelect } from "./language-select";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/user-service";
import { useTranslations } from "next-intl";

const navlinks = [
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

export const MainNavigation = ({ locale }: { locale: string }) => {
  const t = useTranslations("MainNavigation");

  const currentUser = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  }).data;

  return (
    <header className="bg-off-white fixed top-0 left-0 w-full py-4 z-50">
      <div className="flex items-center justify-between w-11/12 mx-auto">
        <Link href="/" className="font-bold text-xl">
          ALYA TITARENKO
        </Link>
        <nav className="absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-4">
            {navlinks.map((link) => (
              <li key={link.text}>
                <Link
                  href={locale + link.path}
                  className="hover:opacity-80 transition-opacity"
                >
                  {t(link.text)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-x-4 items-center">
          <LanguageSelect locale={locale} />
          {currentUser ? (
            <Link
              href={`${locale}/dashboard`}
              className={buttonVariants({ variant: "default" })}
            >
              {t("Dashboard")}
            </Link>
          ) : (
            <Link
              href={`${locale}/auth`}
              className={buttonVariants({ variant: "default" })}
            >
              {t("Log in")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

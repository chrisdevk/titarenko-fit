import { navlinks } from "@/utils/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import { Socials } from "./ui/socials";

export const Footer = ({ locale }: { locale: string }) => {
  const t = useTranslations("MainNavigation");

  return (
    <footer className="bg-turquoise-dark rounded-t-3xl py-6">
      <div className="w-11/12 max-w-[1440px] mx-auto flex flex-col items-center gap-y-7">
        <div className="flex flex-col items-center gap-y-7 w-full">
          <div className="flex flex-col md:flex-row gap-y-4 items-center w-full justify-between">
            <Link
              href="/"
              className="font-bold text-xl hidden md:block text-white"
            >
              ALYA TITARENKO
            </Link>
            <Socials isFooter />
          </div>
          <Separator className="bg-white" />
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-y-7 items-center w-full justify-between">
          <p className="text-white text-xs md:text-sm">
            ALYA TITARENKO © Copyright 2025. All rights reserved.
          </p>
          <ul className="flex items-center gap-x-5 text-white">
            {navlinks.map((link) => (
              <li key={link.text}>
                <Link
                  href={`/${locale}${link.path}`}
                  className="transition-all hover:bg-baby-slate p-1 rounded-sm"
                >
                  {t(link.text)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

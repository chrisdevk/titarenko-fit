import { navlinks } from "@/lib/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import { Socials } from "./ui/socials";

export const Footer = ({ locale }: { locale: string }) => {
  const t = useTranslations("MainNavigation");

  return (
    <footer className="w-11/12 max-w-[1440px] mx-auto flex flex-col items-center gap-y-7 mt-24 lg:mt-[120px] pb-3">
      <div className="flex flex-col items-center gap-y-7 w-full">
        <div className="flex items-center w-full justify-between">
          <Link href="/" className="font-bold text-xl">
            ALYA TITARENKO
          </Link>
          <Socials />
        </div>
        <Separator className="bg-indigo-custom" />
      </div>
      <div className="flex items-center w-full justify-between">
        <p className="text-grey-custom text-xs md:text-sm">
          ALYA TITARENKO © Copyright 2025. All rights reserved.
        </p>
        <ul className="flex items-center gap-x-5">
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
    </footer>
  );
};

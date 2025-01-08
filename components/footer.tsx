import { navlinks } from "@/lib/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import { Socials } from "./ui/socials";

export const Footer = ({ locale }: { locale: string }) => {
  const t = useTranslations("MainNavigation");

  return (
    <footer className="w-11/12 max-w-[1440px] mx-auto flex flex-col items-center gap-y-7 mt-24 pb-3">
      <div className="flex flex-col items-center gap-y-3 w-full">
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
        <Separator className="bg-indigo-custom" />
      </div>
      <Socials />
      <p className="text-grey-custom text-xs md:text-base">
        ALYA TITARENKO © Copyright 2025. All rights reserved.
      </p>
    </footer>
  );
};

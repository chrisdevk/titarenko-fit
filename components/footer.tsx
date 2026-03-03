import { navlinks } from "@/utils/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Socials } from "./ui/socials";

export const Footer = ({ locale }: { locale: string }) => {
  const t = useTranslations("MainNavigation");

  return (
    <footer className="relative z-10 space-y-7 bg-turquoise-dark py-6">
      <div className="mx-auto flex w-11/12 max-w-[1440px] flex-col items-center gap-y-7">
        <div className="flex w-full flex-col items-center gap-y-7">
          <div className="flex w-full flex-col items-center justify-between gap-y-4 md:flex-row">
            <Link
              href="/"
              className="hidden text-xl font-bold text-white md:block"
            >
              ALYA TITARENKO
            </Link>
            <Socials isFooter />
          </div>
        </div>
        <Separator className="bg-white" />
      </div>
      <div className="mx-auto flex w-11/12 max-w-[1440px] flex-col-reverse items-center justify-between gap-y-7 md:flex-row">
        <p className="text-xs text-white md:text-sm">
          ALYA TITARENKO © Copyright 2025. All rights reserved.
        </p>
        <ul className="flex items-center gap-x-5 text-white">
          {navlinks.map((link) => (
            <li key={link.text}>
              <Link href={`/${locale}${link.path}`}>{t(link.text)}</Link>
            </li>
          ))}
          <li>
            <Link href={`/${locale}/terms`} className="text-white">
              {t("Terms of Service")}
            </Link>
          </li>
          <li>
            <Link href={`/${locale}/privacy`} className="text-white">
              {t("Privacy Policy")}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

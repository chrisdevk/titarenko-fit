import Link from "next/link";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { useTranslations } from "next-intl";
import { navlinks } from "@/lib/constants";
import { LanguageSelect } from "./language-select";

export const MobileMenu = ({ locale }: { locale: string }) => {
  const t = useTranslations("MainNavigation");

  return (
    <nav className="pt-24 pb-4 w-10/12 mx-auto space-y-4">
      <ul className="font-semibold text-base text-off-black flex flex-col items-center gap-y-4">
        {navlinks.map((link) => (
          <li key={link.text}>
            <Link
              href={locale + link.path}
              className="transition-all hover:bg-baby-slate p-1 rounded-sm"
            >
              {t(link.text)}
            </Link>
          </li>
        ))}
      </ul>
      <div className="w-fit mx-auto">
        <LanguageSelect locale={locale} />
      </div>
      <Separator className="bg-off-black" />
      <Link
        href={`/${locale}/auth`}
        className={cn("w-full", buttonVariants({ variant: "default" }))}
      >
        {t("Log in")}
      </Link>
    </nav>
  );
};

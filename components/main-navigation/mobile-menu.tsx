import Link from "next/link";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { useTranslations } from "next-intl";
import { navlinks } from "@/utils/constants";
import { LanguageSelect } from "./language-select";

interface MobileMenuProps {
  locale: string;
  setOpen: (open: boolean) => void;
}

export const MobileMenu = ({ locale, setOpen }: MobileMenuProps) => {
  const t = useTranslations("MainNavigation");

  return (
    <nav className="mx-auto w-10/12 space-y-4 pb-4 pt-24">
      <ul className="flex flex-col items-center gap-y-4 text-lg font-semibold text-off-black">
        {navlinks.map((link) => (
          <li key={link.text}>
            <Link
              href={locale + link.path}
              onClick={() => setOpen(false)}
              className="rounded-sm p-1 transition-all hover:bg-baby-slate"
            >
              {t(link.text)}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mx-auto w-fit">
        <LanguageSelect locale={locale} />
      </div>
      <Separator className="bg-off-black" />
      <Link
        href={`/${locale}/auth`}
        onClick={() => setOpen(false)}
        className={cn("w-full", buttonVariants({ variant: "default" }))}
      >
        {t("Log in")}
      </Link>
    </nav>
  );
};

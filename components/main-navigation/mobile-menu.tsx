import Link from "next/link";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { useTranslations } from "next-intl";
import { navlinks } from "@/utils/constants";
import { LanguageSelect } from "./language-select";
import { User } from "@/payload-types";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  locale: string;
  setOpen: (open: boolean) => void;
  user: User | null | undefined;
}

export const MobileMenu = ({ locale, setOpen, user }: MobileMenuProps) => {
  const t = useTranslations("MainNavigation");

  return (
    <nav className="mx-auto w-10/12 space-y-4 pb-4 pt-24">
      <ul className="flex flex-col items-center gap-y-4 text-lg font-semibold text-off-black">
        {navlinks.map((link) => (
          <li key={link.text}>
            <Link
              href={`/${locale}/${link.path}`}
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
      {user ? (
        <Link
          href={`/${locale}/dashboard`}
          className={cn("w-full", buttonVariants({ variant: "default" }))}
          onClick={() => setOpen(false)}
        >
          {t("Dashboard")}
        </Link>
      ) : (
        <Link
          href={`/${locale}/auth`}
          className={cn("w-full", buttonVariants({ variant: "default" }))}
          onClick={() => setOpen(false)}
        >
          {t("Log in")}
        </Link>
      )}
    </nav>
  );
};

import { cn } from "@/lib/utils";
import { User } from "@/payload-types";
import { navlinks } from "@/utils/constants";
import { Computer, Layers, ShoppingBasket, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { createElement } from "react";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { LanguageSelect } from "./language-select";

interface MobileMenuProps {
  locale: string;
  setOpen: (open: boolean) => void;
  user: User | null | undefined;
  cartCount: number;
  hasMonthAccess: boolean;
}

export const MobileMenu = ({
  locale,
  setOpen,
  user,
  cartCount,
  hasMonthAccess,
}: MobileMenuProps) => {
  const t = useTranslations("MainNavigation");

  return (
    <nav className="mx-auto w-10/12 space-y-4 pb-4 pt-24">
      <ul className="flex flex-col gap-y-4 text-lg font-semibold text-off-black">
        {navlinks.map((link) => (
          <li key={link.text}>
            <Link
              href={`/${locale}/${link.path}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-x-2 rounded-sm p-1 transition-all hover:bg-baby-slate"
            >
              {createElement(link.icon, { size: 24, color: "#32324D" })}
              {t(link.text)}
            </Link>
          </li>
        ))}
      </ul>
      <Separator className="bg-off-black" />
      <Link
        href={`/${locale}/club${hasMonthAccess ? "/month" : ""}`}
        onClick={() => setOpen(false)}
        className="flex items-center gap-x-2 rounded-sm p-1 text-lg font-semibold text-off-black transition-all hover:bg-baby-slate"
      >
        <Layers color="#B683F3" size={24} />
        {t("Club")}
      </Link>
      <Link
        href={`/${locale}/programs`}
        onClick={() => setOpen(false)}
        className="flex items-center gap-x-2 rounded-sm p-1 text-lg font-semibold text-off-black transition-all hover:bg-baby-slate"
      >
        <Computer color="#FC4700" size={24} />
        {t("Programs")}
      </Link>
      <Separator className="bg-off-black" />
      <Link
        href={`/${locale}/auth?tab=signup`}
        onClick={() => setOpen(false)}
        className="flex items-center gap-x-2 rounded-sm p-1 text-lg font-semibold text-off-black transition-all hover:bg-baby-slate"
      >
        <UserPlus color="#32324D" size={24} />
        {t("Sign up")}
      </Link>
      <Link
        href={`/${locale}/checkout`}
        onClick={() => setOpen(false)}
        className="flex items-center gap-x-2 rounded-sm p-1 text-lg font-semibold text-off-black transition-all hover:bg-baby-slate"
      >
        <ShoppingBasket color="#32324D" size={24} />
        {t("Cart")}
        {cartCount > 0 && (
          <span className="ml-auto flex size-6 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
            {cartCount}
          </span>
        )}
      </Link>

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
      <div className="flex justify-center">
        <LanguageSelect locale={locale} />
      </div>
    </nav>
  );
};

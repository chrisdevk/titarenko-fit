"use client";

import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart";
import {
  ChevronDown,
  LogIn,
  ShoppingBasket,
  User,
  UserPlus,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LanguageSelect } from "./language-select";

export const UserMenuDropdown = ({ locale }: { locale: string }) => {
  const t = useTranslations("MainNavigation");
  const { user } = useAuth();
  const { cart } = useCart();
  const cartCount = cart?.items?.length ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative z-10 flex items-center gap-1 rounded-md p-2 outline-none hover:bg-black/5 focus:ring-2 focus:ring-purple-custom/30">
        <User className="size-6" />
        <ChevronDown className="size-4 opacity-80" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-[200px] rounded-xl border-0 bg-turquoise-light p-3 shadow-lg"
      >
        {user?.id ? (
          <DropdownMenuItem asChild className="text-lg">
            <Link
              href={`/${locale}/dashboard`}
              className="flex cursor-pointer items-center gap-2 py-1 text-lg focus:bg-turquoise-dark/20"
            >
              <LogIn className="size-6 text-purple-custom" />
              {t("Dashboard")}
            </Link>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem asChild className="text-lg">
              <Link
                href={`/${locale}/auth`}
                className="flex cursor-pointer items-center gap-2 py-1 focus:bg-turquoise-dark/20"
              >
                <LogIn className="size-6 text-purple-custom" />
                {t("Log in")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-lg">
              <Link
                href={`/${locale}/auth?tab=signup`}
                className="flex cursor-pointer items-center gap-2 py-1 focus:bg-turquoise-dark/20"
              >
                <UserPlus className="size-6 text-emerald-600" />
                {t("Sign up")}
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem asChild className="text-lg">
          <Link
            href={`/${locale}/checkout`}
            className="flex cursor-pointer items-center gap-2 py-1 focus:bg-turquoise-dark/20"
          >
            <ShoppingBasket className="size-6 text-neutral-700" />
            {t("Cart")}
            {cartCount > 0 && (
              <span className="ml-auto flex size-6 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-3 bg-neutral-300/50" />
        <LanguageSelect locale={locale} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

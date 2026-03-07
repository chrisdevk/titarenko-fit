"use client";

import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart";
import { cn } from "@/lib/utils";
import { navlinks } from "@/utils/constants";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Hamburger from "./hamburger";
import { MobileMenu } from "./mobile-menu";
import { UserMenuDropdown } from "./user-menu-dropdown";

export const MainNavigation = ({ locale }: { locale: string }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const t = useTranslations("MainNavigation");

  const { user } = useAuth();
  const { cart } = useCart();

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full transition-shadow duration-300">
        {pathname === `/${locale}` && (
          <div
            className={cn(
              "absolute left-0 top-0 hidden w-full bg-turquoise-dark py-3.5 text-center uppercase text-white transition-all duration-300 lg:block",
              scrolled && "origin-top scale-y-0 opacity-0",
            )}
          >
            {t("header-text")}
          </div>
        )}
        <div
          className={cn(
            "w-full bg-turquoise-light py-4 transition-all duration-300",
            pathname === `/${locale}` && !scrolled && "lg:mt-12",
            scrolled && "mt-0",
          )}
        >
          <div className="relative ml-auto flex w-full max-w-[1440px] items-center justify-end md:mx-auto md:w-11/12 md:justify-between">
            <div className="flex items-center justify-between gap-x-2 lg:justify-start">
              <Link
                href={`/${locale}`}
                className="absolute left-1/2 -translate-x-1/2 text-xl font-bold md:static md:translate-x-0"
              >
                ALYA TITARENKO
              </Link>
              <div className="flex items-center gap-x-2 md:hidden">
                <Hamburger
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  setScrolled={setScrolled}
                />
              </div>
              <nav className="hidden lg:ml-8 lg:block">
                <ul className="flex items-center gap-2 lg:gap-4">
                  {navlinks.map((link) => (
                    <li key={link.text}>
                      <Link
                        href={`/${locale}${link.path}`}
                        className="font-medium"
                      >
                        {t(link.text)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="hidden items-center gap-x-5 lg:flex">
              <Button variant="secondary" asChild>
                <Link href={`/${locale}/programs`}>{t("Programs")}</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href={`/${locale}/club`}>{t("Club")}</Link>
              </Button>
              <UserMenuDropdown locale={locale} />
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="fixed left-0 top-0 z-40 w-screen overflow-hidden bg-turquoise-light shadow-md"
          >
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ delay: 0.2 }}
            >
              <MobileMenu
                locale={locale}
                setOpen={setIsOpen}
                user={user}
                cartCount={cart?.items?.length ?? 0}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

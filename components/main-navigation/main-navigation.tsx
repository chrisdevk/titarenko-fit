"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { LanguageSelect } from "./language-select";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navlinks } from "@/utils/constants";
import Hamburger from "./hamburger";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { MobileMenu } from "./mobile-menu";
import { getCurrentUser } from "@/utils/data/get-current-user";
import { usePathname } from "next/navigation";

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

  const currentUser = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  }).data;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-shadow duration-300">
        {pathname === `/${locale}` && (
          <div
            className={cn(
              "text-center text-white bg-turquoise-dark py-3.5 transition-all duration-300 absolute top-0 left-0 w-full hidden md:block",
              scrolled && "scale-y-0 origin-top opacity-0"
            )}
          >
            {t("header-text")}
          </div>
        )}
        <div
          className={cn(
            "bg-turquoise-light w-full py-4 transition-all duration-300",
            pathname === `/${locale}` && !scrolled && "md:mt-12",
            scrolled && "mt-0"
          )}
        >
          <div className="flex items-center justify-between w-2/3 md:w-11/12 ml-auto md:mx-auto max-w-[1440px]">
            <Link href="/" className="font-bold text-xl">
              ALYA TITARENKO
            </Link>
            <Hamburger
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setScrolled={setScrolled}
            />
            <nav className="absolute left-1/2 -translate-x-1/2 hidden md:block">
              <ul className="flex items-center gap-4">
                {navlinks.map((link) => (
                  <li key={link.text}>
                    <Link href={`/${locale}${link.path}`}>{t(link.text)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="md:flex gap-x-4 items-center hidden">
              <LanguageSelect locale={locale} />
              {currentUser ? (
                <Link
                  href={`/${locale}/dashboard`}
                  className={buttonVariants({ variant: "default" })}
                >
                  {t("Dashboard")}
                </Link>
              ) : (
                <Link
                  href={`/${locale}/auth`}
                  className={buttonVariants({ variant: "default" })}
                >
                  {t("Log in")}
                </Link>
              )}
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
            className="fixed top-0 left-0 z-40 bg-turquoise-light w-screen overflow-hidden shadow-md"
          >
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ delay: 0.2 }}
            >
              <MobileMenu locale={locale} setOpen={setIsOpen} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

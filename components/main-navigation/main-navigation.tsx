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

export const MainNavigation = ({ locale }: { locale: string }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      <header
        className={cn(
          "bg-off-white fixed top-0 left-0 w-full py-4 z-50 transition-shadow duration-300",
          scrolled && "shadow-lg"
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
                  <Link
                    href={`/${locale}${link.path}`}
                    className="transition-all hover:bg-baby-slate p-1 rounded-sm"
                  >
                    {t(link.text)}
                  </Link>
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
      </header>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="fixed top-0 left-0 z-40 bg-white w-screen overflow-hidden shadow-md"
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

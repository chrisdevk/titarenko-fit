"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { LanguagePopover } from "./language-popover";

const navlinks = [
  {
    text: "About me",
    path: "/about",
  },
  {
    text: "Programs",
    path: "/programs",
  },
  {
    text: "Blog",
    path: "/blog",
  },
];

export const MainNavigation = () => {
  return (
    <nav className="bg-off-white fixed top-0 left-0 w-full py-4">
      <div className="flex items-center justify-between w-11/12 mx-auto">
        <Link href="/" className="font-bold text-xl">
          ALYA TITARENKO
        </Link>
        <ul className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
          {navlinks.map((link) => (
            <li key={link.text}>
              <Link
                href={link.path}
                className="hover:opacity-80 transition-opacity"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-x-4 items-center">
          <LanguagePopover />
          <Link
            href="/signin"
            className={buttonVariants({ variant: "default" })}
          >
            Log in
          </Link>
        </div>
      </div>
    </nav>
  );
};

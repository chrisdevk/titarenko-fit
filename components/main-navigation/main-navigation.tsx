"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { LanguagePopover } from "./language-popover";
import { getSession } from "@/services/session";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logout } from "@/services/auth-service";

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
    text: "Blogs",
    path: "/blogs",
  },
];

export const MainNavigation = () => {
  const session = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  }).data?.user;

  return (
    <nav className="bg-off-white fixed top-0 left-0 w-full py-4 z-50">
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
          {session ? (
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "default" })}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth"
              className={buttonVariants({ variant: "default" })}
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

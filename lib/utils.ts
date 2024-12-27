import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Roboto } from "next/font/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

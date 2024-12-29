import type { Metadata } from "next";
import "../globals.css";
import { cn, roboto } from "@/lib/utils";
import { MainNavigation } from "@/components/main-navigation/main-navigation";
import Providers from "../providers";

export const metadata: Metadata = {
  title: "Alya Titarenko",
  description: "At body by design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("bg-off-white font-sans text-off-black", roboto.variable)}
      >
        <Providers>
          <MainNavigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}

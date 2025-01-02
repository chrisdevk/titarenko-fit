import type { Metadata } from "next";
import "../../globals.css";
import { cn, roboto } from "@/lib/utils";
import { MainNavigation } from "@/components/main-navigation/main-navigation";
import Providers from "@/app/providers";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Alya Titarenko",
  description: "At body by design",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={cn("bg-off-white font-sans text-off-black", roboto.variable)}
      >
        <Providers>
          <MainNavigation locale={locale} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

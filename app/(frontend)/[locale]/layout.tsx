import type { Metadata } from "next";
import "../../globals.css";
import { cn, roboto } from "@/lib/utils";
import { MainNavigation } from "@/components/main-navigation/main-navigation";
import Providers from "@/app/providers";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Alya Titarenko",
  description: "At body by design",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: "en" | "ru" };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={cn(
          "bg-white font-sans text-off-black overflow-x-hidden",
          roboto.variable
        )}
      >
        <Providers>
          <MainNavigation locale={locale} />
          {children}
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}

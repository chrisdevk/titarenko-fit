import type { Metadata } from "next";
import "../../globals.css";
import { cn, roboto } from "@/lib/utils";
import { MainNavigation } from "@/components/main-navigation/main-navigation";
import Providers from "@/app/providers";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Alya Titarenko",
  description:
    "Достигайте своих фитнес-целей с курсами под руководством экспертов, созданными специально для женщин. Сжигайте жир, укрепляйте мышцы и повышайте уверенность с тренировками, адаптированными под ваши потребности. Начните свой путь уже сегодня!",
  keywords:
    "женский фитнес, тренировки, жир, мышцы, уверенность, фитнес, тренировка, женщина, курсы, здоровье, сила",
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
          "flex min-h-screen flex-col overflow-x-hidden bg-off-white font-sans text-off-black",
          roboto.variable,
        )}
      >
        <Providers>
          <MainNavigation locale={locale} />
          <Suspense fallback={<Loading />}>
            <main className="flex-1">{children}</main>
          </Suspense>
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}

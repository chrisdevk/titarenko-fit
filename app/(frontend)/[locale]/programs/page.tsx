import { getTranslations } from "next-intl/server";
import { ProgramTabs } from "./_components/program-tabs";
import { getProducts } from "@/utils/data/products/get-products";
import { getCategories } from "@/utils/data/get-categories";
import Image from "next/image";
import { ProgramsMobile } from "./_components/programs-mobile";

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "ProgramPage" });
  const programs = await getProducts({ locale });
  const categories = await getCategories({ locale });

  return (
    <article className="relative h-full w-screen">
      <section className="relative z-10 mx-auto mt-28 w-11/12 max-w-[1440px] pb-14">
        <h1>{t("heading")}</h1>
        <ProgramTabs
          programs={programs}
          categories={categories}
          locale={locale}
        />
        <ProgramsMobile
          locale={locale}
          categories={categories}
          programs={programs}
        />
      </section>
      <div className="absolute -bottom-[40%] -right-[2%] rotate-180 md:h-[231px] md:w-[320px] lg:bottom-0 lg:right-0 lg:h-[340px] lg:w-[470px]">
        <Image src="/images/icons/lines-purple.svg" alt="purple lines" fill />
      </div>
    </article>
  );
}

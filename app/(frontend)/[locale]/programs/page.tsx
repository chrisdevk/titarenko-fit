import { getTranslations } from "next-intl/server";
import { ProgramTabs } from "./_components/program-tabs";
import { getProducts } from "@/utils/data/products/get-products";
import { getCategories } from "@/utils/data/get-categories";
import Image from "next/image";

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
      <section className="mx-auto mt-28 w-11/12 max-w-[1440px]">
        <h1>{t("heading")}</h1>
        <ProgramTabs
          programs={programs}
          categories={categories}
          locale={locale}
        />
      </section>
      <div className="absolute bottom-0 right-0 h-[340px] w-[470px] rotate-180">
        <Image src="/images/icons/lines-purple.svg" alt="purple lines" fill />
      </div>
    </article>
  );
}

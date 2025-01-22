import { getTranslations } from "next-intl/server";
import { ProgramTabs } from "./_components/program-tabs";
import { getProducts } from "@/utils/data/products/get-products";
import { getCategories } from "@/utils/data/get-categories";

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
    <main className="w-11/12 max-w-[1440px] mx-auto mt-36">
      <h1>{t("heading")}</h1>
      <ProgramTabs programs={programs} categories={categories} />
    </main>
  );
}

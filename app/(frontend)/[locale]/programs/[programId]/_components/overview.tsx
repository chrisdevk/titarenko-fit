import { Product } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useTranslations } from "next-intl";
import React from "react";

interface OverviewProps {
  for_whom: Product["for_whom"];
  program: Product["program"];
  lessons: Product["lessons"];
  equipment: Product["equipment"];
  contradictions: Product["contradictions"];
}

export const Overview = ({
  for_whom,
  program,
  lessons,
  equipment,
  contradictions,
}: OverviewProps) => {
  const t = useTranslations("SingleProgramPage.overview");

  return (
    <section className="mt-7 space-y-10">
      <div className="space-y-3">
        <h2>{t("for_whom")}</h2>
        <RichText data={for_whom} />
      </div>
      <div className="space-y-3">
        <h2>{t("program")}</h2>
        <RichText data={program} />
      </div>
      <div className="space-y-3">
        <h2>{t("lessons")}</h2>
        <RichText data={lessons} />
      </div>
      <div className="space-y-3">
        <h2>{t("equipment")}</h2>
        <RichText data={equipment} />
      </div>
      <div className="space-y-3">
        <h2>{t("contradictions")}</h2>
        <RichText data={contradictions} />
      </div>
    </section>
  );
};

import { Product } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { BookOpen, CircleHelp, ListChecks, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface OverviewProps {
  for_whom: Product["for_whom"];
  program: Product["program"];
  equipment: Product["equipment"];
  contradictions: Product["contradictions"];
}

export const Overview = ({
  for_whom,
  program,
  equipment,
  contradictions,
}: OverviewProps) => {
  const t = useTranslations("SingleProgramPage.overview");

  return (
    <section className="mt-7 space-y-10">
      <div className="space-y-3 rounded-3xl bg-white shadow-md">
        <div className="flex w-full items-center space-x-2.5 rounded-t-3xl bg-turquoise-dark px-5 py-3 text-white">
          <CircleHelp size={24} />
          <h2>{t("for_whom")}</h2>
        </div>
        <div className="py-4 pl-16">
          <RichText data={for_whom} />
        </div>
      </div>
      <div className="space-y-3 rounded-3xl bg-white shadow-md">
        <div className="flex w-full items-center space-x-2.5 rounded-t-3xl bg-turquoise-dark px-5 py-3 text-white">
          <BookOpen size={24} />
          <h2>{t("program")}</h2>
        </div>
        <div className="py-4 pl-16">
          <RichText data={program} />
        </div>
      </div>
      <div className="space-y-3 rounded-3xl bg-white shadow-md">
        <div className="flex w-full items-center space-x-2.5 rounded-t-3xl bg-turquoise-dark px-5 py-3 text-white">
          <ListChecks size={24} />{" "}
          <h2>{t("equipment")}</h2>
        </div>
        <div className="py-4 pl-16">
          <RichText data={equipment} />
        </div>
      </div>
      <div className="space-y-3 rounded-3xl bg-white shadow-md">
        <div className="flex w-full items-center space-x-2.5 rounded-t-3xl bg-turquoise-dark px-5 py-3 text-white">
          <TriangleAlert size={24} />{" "}
          <h2>{t("contradictions")}</h2>
        </div>
        <div className="py-4 pl-16">
          <RichText data={contradictions} />
        </div>
      </div>
    </section>
  );
};

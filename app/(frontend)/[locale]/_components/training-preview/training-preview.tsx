import { useTranslations } from "next-intl";
import Image from "next/image";
import { Videos } from "./videos";

export const TrainingPreview = () => {
  const t = useTranslations("HomePage.training-preview");

  return (
    <article className="bg-turquoise-light">
      <section className="relative rounded-t-3xl bg-off-white">
        <div className="relative z-10 mx-auto flex w-11/12 max-w-[1440px] flex-col gap-y-10 py-16">
          <h2 className="text-center uppercase">{t("heading")}</h2>
          <Videos />
        </div>
        <div className="absolute left-0 top-0 h-[184px] w-[244px]">
          <Image src="/images/icons/lines-purple.svg" alt="purple lines" fill />
        </div>
      </section>
    </article>
  );
};

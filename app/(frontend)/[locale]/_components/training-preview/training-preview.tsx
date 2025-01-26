import { useTranslations } from "next-intl";
import Image from "next/image";
import { Videos } from "./videos";

export const TrainingPreview = () => {
  const t = useTranslations("HomePage.training-preview");

  return (
    <article className="bg-turquoise-light">
      <section className="bg-off-white rounded-t-3xl relative">
        <div className="flex flex-col gap-y-10 py-16 w-11/12 max-w-[1440px] mx-auto z-10 relative">
          <h2 className="uppercase text-center">{t("heading")}</h2>
          <Videos />
        </div>
        <div className="absolute w-[244px] h-[184px] top-0 left-0">
          <Image src="/images/icons/lines-purple.svg" alt="purple lines" fill />
        </div>
      </section>
    </article>
  );
};

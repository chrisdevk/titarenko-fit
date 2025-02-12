import { InfiniteMovingCards } from "@/components/ui/infinite-cards";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Story = ({ locale }: { locale: string }) => {
  const t = useTranslations("AboutPage.story");

  return (
    <article className="overflow-hidden bg-purple-custom">
      <section className="relative rounded-t-3xl bg-turquoise-light py-16">
        <InfiniteMovingCards speed="normal" />
        <div className="relative z-10 mx-auto mt-16 w-11/12 space-y-10 md:max-w-[980px]">
          <h2 className="text-center">{t("heading")}</h2>
          <div className="flex flex-col items-stretch justify-between gap-x-12 gap-y-5 md:flex-row md:items-center">
            <div className="relative h-[250px] w-full md:h-auto md:min-h-[350px] md:w-5/12">
              <Image
                src="/images/circus.webp"
                alt="circus"
                fill
                className="rounded-3xl object-cover object-top md:object-center"
              />
            </div>
            <div className="w-full space-y-5 md:w-7/12">
              <p>{t("circus.paragraph-one")}</p>
              <p>{t("circus.paragraph-two")}</p>
            </div>
          </div>
          <div className="flex flex-col-reverse items-stretch justify-between gap-x-12 gap-y-5 md:flex-row md:items-center">
            <div className="w-full space-y-5 md:w-7/12">
              <p>{t("competitions.paragraph-one")}</p>
              <p>{t("competitions.paragraph-two")}</p>
            </div>
            <div className="relative h-[250px] w-full md:h-auto md:min-h-[350px] md:w-5/12">
              <Image
                src="/images/competition.webp"
                alt="circus"
                fill
                className="rounded-3xl object-cover object-top"
              />
            </div>
          </div>
          <div className="flex flex-col items-stretch justify-between gap-x-12 gap-y-5 md:flex-row md:items-center">
            <div className="relative h-[250px] w-full md:h-auto md:min-h-[350px] md:w-5/12">
              {locale === "en" ? (
                <Image
                  src="/images/transformation-en.webp"
                  alt="circus"
                  fill
                  className="rounded-3xl object-cover object-top"
                />
              ) : (
                <Image
                  src="/images/transformation.webp"
                  alt="circus"
                  fill
                  className="rounded-3xl object-cover object-top"
                />
              )}
            </div>
            <div className="w-full space-y-5 md:w-7/12">
              <p>{t("competitions.paragraph-three")}</p>
            </div>
          </div>
        </div>
        <div className="absolute -top-[9%] left-0 h-[338px] w-[257px]">
          <Image src="/icons/lines-purple.svg" alt="purple lines" fill />
        </div>
        <div className="absolute -bottom-[9%] right-0 h-[338px] w-[257px] rotate-180">
          <Image src="/icons/lines-purple.svg" alt="purple lines" fill />
        </div>
      </section>
    </article>
  );
};

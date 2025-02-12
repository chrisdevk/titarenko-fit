import { useTranslations } from "next-intl";
import Image from "next/image";

export const Education = () => {
  const t = useTranslations("AboutPage.education");
  const cardTwoList = t.raw("card-two-list");
  const cardThreeList = t.raw("card-three-list");

  return (
    <article className="bg-turquoise-light">
      <section className="relative overflow-hidden rounded-t-3xl bg-turquoise-dark">
        <div className="relative z-10 mx-auto flex w-11/12 max-w-[1440px] flex-col-reverse items-stretch justify-between gap-y-5 py-16 md:flex-row md:gap-x-5 lg:gap-x-10">
          <div className="w-full space-y-5 md:w-1/2">
            <h2 className="uppercase text-white">{t("heading")}</h2>
            <p className="rounded-3xl bg-turquoise-light p-4">
              {t("card-one")}
            </p>
            <div className="rounded-3xl bg-turquoise-light p-4">
              <p>{t("card-two-paragraph")}</p>
              <ul className="list-disc pl-8">
                {cardTwoList.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-turquoise-light p-4">
              <p>{t("card-three-paragraph")}</p>
              <ul className="list-disc pl-8">
                {cardThreeList.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative h-[250px] w-full items-stretch md:h-auto md:w-1/2">
            <Image
              src="/images/education-img.webp"
              alt="education"
              fill
              className="rounded-3xl object-cover"
            />
          </div>
        </div>
        <div className="absolute -right-[11%] -top-[4%] h-[365px] w-[277px] rotate-90 md:-right-[5%] md:-top-[6%] lg:-right-[2.5%]">
          <Image src="/icons/lines.svg" alt="white lines" fill />
        </div>
        <div className="absolute -bottom-[4%] -left-[11%] h-[365px] w-[277px] -rotate-90 md:-bottom-[6%] md:-left-[2.5%]">
          <Image src="/icons/lines.svg" alt="white lines" fill />
        </div>
      </section>
    </article>
  );
};

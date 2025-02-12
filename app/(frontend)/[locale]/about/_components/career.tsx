import { useTranslations } from "next-intl";
import Image from "next/image";

export const Career = () => {
  const t = useTranslations("AboutPage.career");
  const cardOneList = t.raw("card-one-list");
  const cardTwoList = t.raw("card-two-list");

  return (
    <article className="bg-turquoise-dark">
      <section className="relative space-y-10 rounded-t-3xl bg-off-white py-16">
        <h2 className="text-center uppercase">{t("heading")}</h2>
        <div className="relative z-10 mx-auto flex w-11/12 max-w-[1054px] flex-col justify-between gap-x-10 gap-y-5 md:flex-row">
          <ul className="list-disc rounded-3xl bg-turquoise-light p-10 md:w-[500px]">
            {cardOneList.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul className="list-disc rounded-3xl bg-turquoise-light p-10 md:w-[500px]">
            {cardTwoList.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="absolute -bottom-[6%] right-0 h-[270px] w-[205px] rotate-180 md:-bottom-[12%]">
          <Image src="/icons/lines-purple.svg" alt="purple lines" fill />
        </div>
      </section>
    </article>
  );
};

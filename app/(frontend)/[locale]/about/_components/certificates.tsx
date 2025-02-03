import { certificates } from "@/utils/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Certificates = () => {
  const t = useTranslations("AboutPage.certificates");

  return (
    <article className="bg-off-white">
      <section className="rounded-t-3xl bg-purple-custom py-16">
        <div className="mx-auto w-11/12 max-w-[1440px] space-y-10">
          <h2 className="text-center uppercase text-white">{t("heading")}</h2>
          <div className="flex flex-wrap justify-between gap-5 lg:gap-y-8">
            {certificates.map((item) => (
              <div
                key={item.alt}
                className="relative mx-auto h-[250px] w-full md:h-[151px] md:w-[31.5%] lg:h-[200px] lg:w-[245px]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="rounded-3xl object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

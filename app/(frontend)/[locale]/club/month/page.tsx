import { ClubMonth } from "@/payload-types";
import { getClubMonths } from "@/utils/data/club-months/get-club-months";
import { getTranslations } from "next-intl/server";
import { MonthCard } from "./_components/month-card";

export default async function ClubMonthPage({
  params,
}: {
  params: Promise<{ locale: "en" | "ru" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ClubMonthPage" });

  const months = await getClubMonths({ locale });

  return (
    <main className="pb-14 pt-28">
      <h1 className="text-center text-[48px] font-semibold text-off-black">
        {t("heading")}
      </h1>

      <div className="mx-auto mt-[60px] flex max-w-[1150px] flex-col items-center gap-10">
        <h2 className="text-center text-[32px] font-medium text-off-black">
          {t("howItWorks")}
        </h2>
        <div className="flex flex-col items-center gap-[19px]">
          <div className="flex flex-wrap justify-center gap-[26px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="rounded-[50px] bg-[rgba(96,138,255,0.1)] px-[18px] py-3 text-center text-lg font-normal text-off-black"
              >
                {t(`pills.${i}`)}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[3, 4].map((i) => (
              <span
                key={i}
                className="rounded-[50px] bg-[rgba(96,138,255,0.1)] px-[18px] py-3 text-center text-lg font-normal text-off-black"
              >
                {t(`pills.${i}`)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!months || months.length === 0 ? (
        <p className="mt-[60px] text-center text-gray-500">
          No months available yet...
        </p>
      ) : (
        <section className="mx-auto mt-[60px] grid max-w-[1273px] grid-cols-1 gap-x-[22px] gap-y-[23px] px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {months.map((month: ClubMonth) => {
            const imgSrc =
              typeof month.coverImage === "object" && month.coverImage?.url
                ? month.coverImage.url
                : "/images/no-image.webp";

            return (
              <MonthCard
                key={month.id}
                title={month.title}
                monthNumber={month.monthNumber}
                imgSrc={imgSrc}
                locale={locale}
              />
            );
          })}
        </section>
      )}
    </main>
  );
}

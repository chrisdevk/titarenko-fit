import { getClubMonth } from "@/utils/data/club-months/get-club-month";
import { getClubMonths } from "@/utils/data/club-months/get-club-months";
import { checkClubAccess } from "@/utils/data/check-club-access";
import { updateClubProgress } from "@/utils/actions/update-club-progress";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { Calendar } from "./_components/calendar";
import { InfoCard } from "./_components/info-card";
import { InventorySection } from "./_components/inventory-section";
import { MonthSelector } from "./_components/month-selector";
import { MonthStepper } from "./_components/month-stepper";

type Props = {
  params: Promise<{ locale: "en" | "ru"; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const monthNumber = parseInt(slug, 10);
  const month = await getClubMonth({ monthNumber, locale });

  if (!month) return {};

  return {
    title: month.title,
    description: `${month.title} — training calendar`,
  };
}

export default async function ClubMonthCalendarPage({ params }: Props) {
  const { locale, slug } = await params;

  const { hasAccess, user } = await checkClubAccess();
  if (!hasAccess) {
    redirect(`/${locale}/club${user ? "?expired=true" : ""}`);
  }

  const monthNumber = parseInt(slug, 10);

  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    notFound();
  }

  const [month, allMonths] = await Promise.all([
    getClubMonth({ monthNumber, locale }),
    getClubMonths({ locale }),
  ]);

  if (!month) {
    notFound();
  }

  await updateClubProgress(monthNumber);

  const t = await getTranslations({ locale, namespace: "ClubMonthPage" });

  const monthOptions = (allMonths || []).map((m) => ({
    value: m.monthNumber,
    label: m.title,
  }));

  const totalMonths = monthOptions.length || 12;

  return (
    <main className="bg-[#f9feff] pb-0 pt-28">
      {/* Heading */}
      <div className="mx-auto flex max-w-[803px] flex-col items-center gap-4 text-center">
        <h1 className="text-[48px] font-semibold text-off-black">
          {t("pageTitle")}
        </h1>
        <p className="text-[22px] font-medium text-off-black">{month.title}</p>
      </div>

      {/* Month Controls */}
      <div className="mx-auto mt-10 flex max-w-[1440px] items-center gap-4 px-10">
        <MonthSelector
          currentMonth={monthNumber}
          months={monthOptions}
          locale={locale}
        />
        <MonthStepper
          currentMonth={monthNumber}
          totalMonths={totalMonths}
          locale={locale}
          currentLabel={month.title}
        />
      </div>

      {/* Calendar */}
      <div className="mx-auto mt-6 max-w-[1440px] px-10">
        <Calendar
          days={month.days || []}
          startDayOfWeek={parseInt(month.startDayOfWeek, 10)}
          totalDays={month.totalDays}
        />
      </div>

      {/* Equipment */}
      {month.equipment && month.equipment.length > 0 && (
        <div className="mx-auto mt-10 max-w-[1440px] px-10">
          <InventorySection equipment={month.equipment} />
        </div>
      )}

      {/* Notes & How to Increase Load */}
      {(month.notes || month.howToIncreaseLoad) && (
        <div className="mt-10 bg-[#199aad] px-[115px] py-[104px]">
          <div className="mx-auto flex max-w-[1210px] items-start gap-[42px]">
            <div className="flex flex-1 flex-col gap-[21px]">
              {month.notes && (
                <InfoCard title={t("notes")} content={month.notes} />
              )}
            </div>
            {month.howToIncreaseLoad && (
              <div className="flex-1">
                <InfoCard
                  title={t("howToIncrease")}
                  content={month.howToIncreaseLoad}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

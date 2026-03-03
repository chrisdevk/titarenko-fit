import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: "en" | "ru" }>;

type PrivacySection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export default async function PrivacyPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPage" });

  const sections = t.raw("sections") as PrivacySection[];

  return (
    <article className="mx-auto mb-24 mt-32 w-11/12 max-w-[880px] text-sm leading-relaxed text-off-black md:mt-40 md:text-base lg:mt-[160px]">
      <header className="mb-10 text-center">
        <h1 className="font-semibold uppercase tracking-[0.16em] lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-xs text-off-black md:text-sm">
          {t("effectiveDate")}
        </p>
      </header>

      <div className="space-y-16">
        {sections.map((section, index) => (
          <section key={index} className="space-y-4">
            <h2 className="font-semibold uppercase tracking-[0.12em]">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
            {section.list && section.list.length > 0 && (
              <ul className="ml-5 list-disc space-y-1">
                {section.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}


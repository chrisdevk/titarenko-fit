import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: "en" | "ru" }>;

type TermsSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export default async function TermsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsPage" });

  const intro = t.raw("intro") as string[];
  const sections = t.raw("sections") as TermsSection[];
  const contacts = t.raw("contacts") as {
    emailLabel: string;
    email: string;
    siteLabel: string;
    site: string;
  };

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

      <section className="space-y-4">
        {intro.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </section>

      <div className="mt-16 space-y-16">
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

        <section className="space-y-2">
          <p>
            {contacts.emailLabel}:{" "}
            <a
              href={`mailto:${contacts.email}`}
              className="font-medium underline underline-offset-4"
            >
              {contacts.email}
            </a>
          </p>
          <p>
            {contacts.siteLabel}:{" "}
            <a
              href={`https://${contacts.site}`}
              className="font-medium underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              {contacts.site}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}

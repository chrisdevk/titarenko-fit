import { ContactForm } from "@/components/forms/contact-form";
import { getCurrentUser } from "@/utils/data/get-current-user";
import { getTranslations } from "next-intl/server";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const { user } = await getCurrentUser();

  return (
    <article className="mx-auto mb-14 mt-24 flex w-11/12 max-w-[1440px] flex-col gap-x-[86px] gap-y-4 rounded-3xl bg-turquoise-light px-3 py-8 md:px-10 lg:mt-[120px] lg:flex-row">
      <section className="space-y-4 lg:w-1/2">
        <h2>{t("heading")}</h2>
        <p>{t("paragraph")}</p>
      </section>
      <ContactForm user_name={user?.name} user_email={user?.email} />
    </article>
  );
}

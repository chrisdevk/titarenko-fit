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
  const currentUser = await getCurrentUser();

  return (
    <article className="mx-auto mt-24 flex w-11/12 max-w-[1440px] flex-col gap-x-[86px] gap-y-4 rounded-3xl bg-baby-slate px-3 py-8 md:flex-row md:px-10 lg:mt-[120px]">
      <section className="space-y-4 md:w-1/2">
        <h2>{t("heading")}</h2>
        <p>{t("paragraph")}</p>
      </section>
      <ContactForm
        user_name={currentUser?.name}
        user_email={currentUser?.email}
      />
    </article>
  );
}

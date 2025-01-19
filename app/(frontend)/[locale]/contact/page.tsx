import { ContactForm } from "@/components/forms/contact-form";
import { getCurrentUser } from "@/services/user-service";
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
    <section className="w-11/12 mx-auto max-w-[1440px] flex gap-x-[86px] bg-baby-slate rounded-3xl py-8 px-3 md:px-10 mt-24 lg:mt-[120px]">
      <div className="space-y-4 w-1/2">
        <h2>{t("heading")}</h2>
        <p>{t("paragraph")}</p>
      </div>
      <ContactForm
        user_name={currentUser?.name}
        user_email={currentUser?.email}
      />
    </section>
  );
}

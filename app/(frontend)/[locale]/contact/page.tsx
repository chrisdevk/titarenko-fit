import { ContactForm } from "@/components/forms/contact-form";
import { getCurrentUser } from "@/utils/data/get-current-user";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

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
      <section className="flex flex-col justify-between lg:w-1/2">
        <div className="space-y-4">
          <h2>{t("heading")}</h2>
          <p>{t("paragraph")}</p>
        </div>
        <div className="relative h-2/3 w-full">
          <Image
            src="/images/contact-img.jpg"
            alt="contact"
            fill
            className="rounded-3xl object-cover"
          />
        </div>
      </section>
      <ContactForm user_name={user?.name} user_email={user?.email} />
    </article>
  );
}

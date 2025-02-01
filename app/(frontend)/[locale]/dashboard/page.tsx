import { getCurrentUser } from "@/utils/data/get-current-user";
import { getTranslations } from "next-intl/server";
import { LogoutComp } from "./_components/logout-comp";
import { Progress } from "./_components/progress";
import { getOrders } from "@/utils/data/get-orders";
import { Order } from "@/payload-types";
import { Orders } from "./_components/orders";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "DashboardPage" });
  const { user } = await getCurrentUser();

  if (!user || !user.name) {
    return (
      <main className="mx-auto mt-36 w-11/12 max-w-[1440px]">
        <p>Not logged in</p>
      </main>
    );
  }

  const orders: Order[] = await getOrders({
    locale,
  });

  return (
    <div className="mx-auto mt-28 w-11/12 max-w-[1440px]">
      <article className="space-y-10">
        <h1>{t("title")}</h1>
        <section className="grid grid-cols-5 gap-5">
          <div className="col-span-2 flex flex-col gap-y-5">
            <LogoutComp user_name={user.name} button_text={t("logout")} />
            <Progress />
          </div>
          <div className="col-span-3 flex flex-col gap-y-7 rounded-3xl bg-turquoise-light p-4">
            <h2>{t("Courses")}</h2>
            {!orders && <p>{t("no-courses")}</p>}
            {orders && <Orders />}
          </div>
        </section>
      </article>
    </div>
  );
}

import { getCurrentUser } from "@/utils/data/get-current-user";
import { getTranslations } from "next-intl/server";
import { LogoutComp } from "./_components/logout-comp";
import { Progress } from "./_components/progress";
import { getOrders } from "@/utils/data/get-orders";
import { Order } from "@/payload-types";
import { Orders } from "./_components/orders";
import { Payments } from "./_components/payments";

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
    <div className="mx-auto mt-28 w-11/12 max-w-[1440px] pb-16">
      <article className="space-y-10">
        <h1>{t("title")}</h1>
        <section className="grid grid-cols-5 gap-5">
          <div className="col-span-2 flex flex-col gap-y-5">
            <LogoutComp user_name={user.name} button_text={t("logout")} />
            <div className="flex h-full flex-col items-stretch gap-y-7 rounded-3xl bg-turquoise-light p-4">
              <h2>{t("Progress")}</h2>
              <Progress orders={orders} />
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-y-7 rounded-3xl bg-turquoise-light p-4">
            <h2>{t("Courses")}</h2>
            {orders.length === 0 && <p>{t("no-courses")}</p>}
            {orders.length >= 1 && (
              <Orders
                orders={orders}
                locale={locale}
                course_btn_text={t("course-button")}
              />
            )}
          </div>
          <div className="col-span-5 space-y-7 rounded-3xl bg-purple-custom p-4">
            <h2 className="text-white">{t("Payments")}</h2>
            <Payments
              orders={orders}
              order_id={t("payment-table.order-id")}
              createdAt={t("payment-table.createdAt")}
              status={t("payment-table.status")}
              price={t("payment-table.price")}
              paid={t("payment-table.paid")}
            />
          </div>
        </section>
      </article>
    </div>
  );
}

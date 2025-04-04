import { getCurrentUser } from "@/utils/data/get-current-user";
import { getTranslations } from "next-intl/server";
import { LogoutComp } from "./_components/logout-comp";
import { Progress } from "./_components/progress";
import { getOrders } from "@/utils/data/get-orders";
import { Order } from "@/payload-types";
import { Orders } from "./_components/orders";
import { Payments } from "./_components/payments";
import { getProducts } from "@/utils/data/products/get-products";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: "en" | "ru" }>;
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

  let orders: Order[] | null = await getOrders({
    locale,
  });

  if (user.roles?.includes("admin")) {
    const allProducts = await getProducts({ locale });
    orders =
      allProducts?.map((product) => ({
        id: product.id,
        items: [
          {
            product: product,
            purchaseDate: new Date().toISOString(),
          },
        ],
        total: JSON.parse(product.priceJSON!) ?? 0,
        currency: "USD",
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      })) ?? [];
  }

  if (!orders) return <p>Something went wrong</p>;

  return (
    <div className="mx-auto mt-28 w-11/12 max-w-[1440px] pb-16">
      <article className="space-y-10">
        <h1 className="text-xl font-medium md:text-2xl lg:text-4xl xl:text-5xl">
          {t("title")}
        </h1>
        <section className="grid grid-cols-5 gap-5">
          <div className="col-span-5 flex flex-col gap-y-5 lg:col-span-2">
            <LogoutComp user_name={user.name} button_text={t("logout")} />
            <div className="hidden h-full flex-col items-stretch gap-y-7 rounded-3xl bg-turquoise-light p-4 lg:flex">
              <h2>{t("Progress")}</h2>
              <Progress orders={orders} />
            </div>
          </div>
          <div className="col-span-5 flex flex-col-reverse gap-x-5 gap-y-7 rounded-3xl md:flex-row md:justify-between lg:col-span-3 lg:flex-col lg:justify-normal lg:bg-turquoise-light lg:p-4">
            <div className="flex h-full flex-col gap-y-7 rounded-3xl bg-turquoise-light p-4 md:w-5/12 lg:hidden">
              <h2>{t("Progress")}</h2>
              <Progress orders={orders} />
            </div>
            <div className="flex flex-col gap-y-7 rounded-3xl bg-turquoise-light p-4 md:w-7/12 lg:w-full lg:items-stretch">
              <h2>{t("Courses")}</h2>
              <div className="w-full">
                {orders.length === 0 && <p>{t("no-courses")}</p>}
                {orders.length >= 1 && (
                  <Orders
                    orders={orders}
                    locale={locale}
                    course_btn_text={t("course-button")}
                  />
                )}
              </div>
            </div>
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

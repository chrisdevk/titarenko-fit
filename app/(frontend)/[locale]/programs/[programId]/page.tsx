import { getImageSrc } from "@/lib/get-image-src";
import { getProduct } from "@/utils/data/products/get-product";
import Image from "next/image";
import { PurchaseCard } from "./_components/purchase-card";
import { Overview } from "./_components/overview";
import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "./_components/faq-accordion";
import { getCurrentUser } from "@/utils/data/get-current-user";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ programId: string; locale: "en" | "ru" }>;
}) {
  const { programId, locale } = await params;

  const t = await getTranslations({ locale, namespace: "SingleProgramPage" });

  const product = await getProduct({ id: programId, locale });
  const { user } = await getCurrentUser();

  if (!product)
    return <p>Product not found or not available in the current locale</p>;

  const imgSrc = getImageSrc(product?.product_thumbnail, "product_thumbnail");

  let price;
  try {
    price = JSON.parse(product.priceJSON ?? "{}");
  } catch (error) {
    console.error("Error parsing price JSON:", error);
    price = {};
  }

  return (
    <div className="mt-28">
      <article className="mx-auto flex w-11/12 max-w-[1440px] flex-col justify-between gap-x-4 md:flex-row lg:gap-x-0">
        <div className="flex flex-col md:w-2/3">
          <h1 className="text-purple-custom">{product?.title}</h1>
          <section className="relative mt-4 h-[240px] w-full overflow-hidden rounded-3xl lg:h-[440px]">
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={product.title || "Product image"}
                fill
                className="rounded-3xl object-cover object-top"
                quality={100}
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-3xl bg-gray-200">
                <p>No image available</p>
              </div>
            )}
          </section>
          <div className="mt-4 md:hidden">
            <PurchaseCard
              user={user}
              locale={locale}
              product={product}
              price={price}
              recurring={price.recurring?.interval}
            />
          </div>
          <Overview
            for_whom={product?.for_whom}
            program={product?.program}
            lessons={product?.lessons}
            equipment={product?.equipment}
            contradictions={product?.contradictions}
          />
        </div>
        <aside className="sticky top-44 hidden w-1/4 self-start md:block md:w-1/3 lg:top-24 lg:w-[32%] 2xl:w-1/4">
          <PurchaseCard
            user={user}
            locale={locale}
            product={product}
            price={price}
            recurring={price.recurring?.interval}
          />
        </aside>
      </article>
      <article className="relative mt-20 overflow-hidden rounded-t-3xl bg-turquoise-light pb-20 pt-10">
        <section className="relative z-10 flex flex-col items-center gap-y-8">
          <h2 className="text-off-black">{t("faq_heading")}</h2>
          <FaqAccordion />
        </section>
        <div className="absolute -right-[5%] top-0 h-[400px] w-[500px] rotate-90">
          <Image src="/icons/lines.svg" alt="white lines" fill />
        </div>
        <div className="absolute -left-[5%] bottom-0 h-[423px] w-[522px] -rotate-90">
          <Image src="/icons/lines.svg" alt="white lines" fill />
        </div>
      </article>
    </div>
  );
}

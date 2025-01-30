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
  params: Promise<{ programId: number; locale: string }>;
}) {
  const { programId, locale } = await params;

  const t = await getTranslations({ locale, namespace: "SingleProgramPage" });

  const product = await getProduct({ id: programId.toString(), locale });
  const currentUser = await getCurrentUser();

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
    <main className="mt-28">
      <article className="mx-auto flex w-11/12 max-w-[1440px] flex-col justify-between md:flex-row">
        <div className="flex flex-col md:w-2/3">
          <h1 className="text-purple-custom">{product?.title}</h1>
          <section className="relative mt-4 h-[440px] w-full">
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
              user={currentUser}
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
        <aside className="sticky top-24 hidden w-1/4 self-start md:block">
          <PurchaseCard
            user={currentUser}
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
          <Image src="/images/icons/lines.svg" alt="white lines" fill />
        </div>
        <div className="absolute -left-[5%] bottom-0 h-[423px] w-[522px] -rotate-90">
          <Image src="/images/icons/lines.svg" alt="white lines" fill />
        </div>
      </article>
    </main>
  );
}

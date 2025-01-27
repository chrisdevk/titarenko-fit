import { getImageSrc } from "@/lib/get-image-src";
import { getProduct } from "@/utils/data/products/get-product";
import Image from "next/image";
import { PurchaseCard } from "./_components/purchase-card";
import { Overview } from "./_components/overview";
import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "./_components/faq-accordion";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ programId: number; locale: string }>;
}) {
  const { programId, locale } = await params;

  const t = await getTranslations({ locale, namespace: "SingleProgramPage" });

  const product = await getProduct({ id: programId.toString(), locale });

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
      <article className="mx-auto flex w-11/12 max-w-[1440px] justify-between">
        <div className="flex w-2/3 flex-col">
          <h1>{product?.title}</h1>
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
          <Overview
            for_whom={product?.for_whom}
            program={product?.program}
            lessons={product?.lessons}
            equipment={product?.equipment}
            contradictions={product?.contradictions}
          />
        </div>
        <aside className="sticky top-24 w-1/4 self-start">
          <PurchaseCard
            duration={product?.duration}
            intensity={product?.intensity}
            fitness_level={product?.fitness_level}
            description={product?.product_description}
            price={price}
            recurring={price.recurring?.interval}
          />
        </aside>
      </article>
      <article className="relative mt-20 overflow-hidden rounded-t-3xl bg-turquoise-light pb-20 pt-10">
        <section className="flex flex-col items-center gap-y-8">
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

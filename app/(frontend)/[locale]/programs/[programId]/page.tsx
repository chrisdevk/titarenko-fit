import { getImageSrc } from "@/lib/get-image-src";
import { getProduct } from "@/utils/data/products/get-product";
import Image from "next/image";
import { PurchaseCard } from "./_components/purchase-card";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ programId: number; locale: string }>;
}) {
  const { programId, locale } = await params;

  const product = await getProduct({ id: programId.toString(), locale });

  const imgSrc = getImageSrc(product?.product_thumbnail, "product_thumbnail");

  const price = JSON.parse(product?.priceJSON!);

  if (!product)
    return <p>Product not found or not available in the current locale</p>;

  return (
    <main className="w-11/12 max-w-[1440px] mx-auto mt-36 flex justify-between">
      <div className="flex flex-col gap-y-4 w-2/3">
        <h1>{product?.title}</h1>
        <div className="relative w-full h-[440px]">
          <Image
            src={imgSrc!}
            alt={product?.title!}
            fill
            className="object-cover rounded-3xl object-top"
            quality={100}
            priority
          />
        </div>
      </div>
      <div className="w-1/4">
        <PurchaseCard
          duration={product?.duration}
          intensity={product?.intensity}
          fitness_level={product?.fitness_level}
          description={product?.product_description}
          price={price}
          recurring={price.recurring?.interval}
        />
      </div>
    </main>
  );
}

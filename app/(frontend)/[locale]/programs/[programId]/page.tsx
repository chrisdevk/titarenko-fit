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
    <main className="mx-auto mt-36 flex w-11/12 max-w-[1440px] justify-between">
      <div className="flex w-2/3 flex-col gap-y-4">
        <h1>{product?.title}</h1>
        <div className="relative h-[440px] w-full">
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

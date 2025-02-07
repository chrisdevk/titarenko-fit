import { getProduct } from "@/utils/data/products/get-product";
import { VideoInterface } from "./_components/video-interface";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ productId: string; locale: "en" | "ru" }>;
}) {
  const { productId, locale } = await params;

  const product = await getProduct({ id: productId, locale });

  if (!product)
    return <p>Product not found or not available in the current locale</p>;

  return (
    <article className="mx-auto mt-28 w-11/12 max-w-[1440px] pb-16">
      <h1>{product?.title}</h1>
      <VideoInterface product={product} />
    </article>
  );
}

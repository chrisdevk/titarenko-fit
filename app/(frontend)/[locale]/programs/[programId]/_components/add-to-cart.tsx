"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { Product } from "@/payload-types";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import Stripe from "stripe";

interface AddToCartProps {
  product: Product;
  locale: string;
  price: Stripe.Price[];
}

export const AddToCart = ({ product, locale, price }: AddToCartProps) => {
  const { addItemToCart } = useCart();
  const t = useTranslations("SingleProgramPage");
  console.log(addItemToCart);

  const productUrl = `/${locale}/programs/${product.slug}`;

  const unitPrice = price && price[0] && price[0].unit_amount !== null ? price[0].unit_amount : 0;

  const handleAddToCart = useCallback(() => {
    addItemToCart({
      id: product.id.toString(),
      product,
      quantity: 1,
      url: productUrl,
      unitPrice,
    });
  }, [addItemToCart, product, productUrl, unitPrice]);

  return (
    <Button
      aria-label="Add to cart"
      onClick={handleAddToCart}
      className="z-10 w-full"
    >
      {t("add-to-cart")}
    </Button>
  );
};

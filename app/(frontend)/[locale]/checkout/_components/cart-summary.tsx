import { Button } from "@/components/ui/button";
import { User } from "@/payload-types";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface CartSummaryProps {
  cart: User["cart"];
  cartTotal: number;
  onDelete: (id: string) => void;
}

export const CartSummary = ({
  cart,
  cartTotal,
  onDelete,
}: CartSummaryProps) => {
  const t = useTranslations("CheckoutPage");

  return (
    <div className="flex flex-col gap-y-7">
      <h2 className="font-semibold">{t("cart")}</h2>
      <div className="space-y-3">
        {cart?.items?.map((item) => {
          if (!item.product) return null;

          if (typeof item.product === "number") return null;

          const {
            product: { product_thumbnail, title },
            unitPrice,
          } = item;

          const thumbnail =
            typeof product_thumbnail === "object" && product_thumbnail?.url
              ? product_thumbnail?.url
              : null;

          const formattedPrice = `$${(unitPrice / 100).toFixed(2)}`;

          return (
            <div
              key={item.id}
              className="w-full rounded-xl bg-off-white md:p-1"
            >
              {item.product && (
                <div className="flex w-full md:items-end md:justify-between">
                  <div className="flex w-full flex-col items-center gap-x-2.5 md:flex-row">
                    {thumbnail && (
                      <div className="relative h-[120px] w-full lg:w-[140px]">
                        <Image
                          src={thumbnail}
                          alt={title}
                          fill
                          className="size-full rounded-t-xl object-cover md:rounded-xl"
                        />
                      </div>
                    )}
                    <div className="w-full space-y-5 px-3 py-2">
                      <h3 className="uppercase">{title}</h3>
                      <div className="flex items-center justify-between gap-x-2">
                        <p className="w-fit text-2xl font-semibold text-purple-custom">
                          {formattedPrice}
                        </p>
                        <Button
                          size="icon"
                          onClick={() => onDelete(item.id || "")}
                          className="bg-transparent p-0 hover:bg-transparent md:hidden"
                        >
                          <Trash2 className="!size-6 text-off-black transition-colors group-hover:text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    onClick={() => onDelete(item.id || "")}
                    className="mb-4 hidden bg-transparent p-0 hover:bg-transparent md:block"
                  >
                    <Trash2 className="!size-6 text-off-black transition-colors group-hover:text-red-500" />
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <h3 className="flex justify-between text-2xl">
        Total: <span>${cartTotal / 100}</span>
      </h3>
    </div>
  );
};

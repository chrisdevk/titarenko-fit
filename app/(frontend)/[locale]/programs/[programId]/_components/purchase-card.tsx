import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product, User } from "@/payload-types";
import { ChartNoAxesColumnIncreasing, Clock4, Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Stripe from "stripe";
import { AddToCart } from "./add-to-cart";

interface PurchaseCardProps {
  user: User | null;
  locale: string;
  product: Product;
  price: Stripe.Price[];
  recurring: string | null;
}

export const PurchaseCard = ({
  user,
  locale,
  product,
  price,
  recurring,
}: PurchaseCardProps) => {
  const t = useTranslations("SingleProgramPage");

  const formattedPrice = `$${(price[0].unit_amount! / 100).toFixed(2)}${recurring ? `/${t(recurring)}` : ""}`;

  return (
    <div className="space-y-4 rounded-3xl bg-turquoise-light px-6 py-5 md:space-y-10">
      <h2>{t("details")}</h2>
      <p className="text-xl text-grey-custom">{product.product_description}</p>
      <ul className="space-y-4 text-lg font-medium">
        <li className="flex items-center gap-x-3.5">
          <Clock4 className="text-purple-custom" />
          <span className="text-grey-custom">{t("duration")}:</span>
          <span>{product.duration}</span>
        </li>
        <li className="flex items-center gap-x-3.5">
          <Flame className="text-purple-custom" />
          <span className="text-grey-custom">{t("intensity")}:</span>
          <span>{product.intensity}</span>
        </li>
        <li className="flex items-center gap-x-3.5">
          <ChartNoAxesColumnIncreasing className="text-purple-custom" />
          <span className="text-grey-custom">{t("fitness level")}:</span>
          <span>{product.fitness_level}</span>
        </li>
      </ul>
      <div className="space-y-5">
        <h2 className="font-semibold">{formattedPrice}</h2>
        {user ? (
          <AddToCart product={product} locale={locale} price={price} />
        ) : (
          <div className="space-y-2">
            <p className="text-sm">{t("login-check")}</p>
            <Link
              href={`/${locale}/auth`}
              className={cn("z-10 w-full", buttonVariants({ size: "lg" }))}
            >
              {t("login")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

"use client";

import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MonthCardProps {
  title: string;
  monthNumber: number;
  imgSrc: string;
  locale: string;
  isLocked: boolean;
  stripeProductID?: string;
  priceInCents: number;
}

export const MonthCard = ({
  title,
  monthNumber,
  imgSrc,
  locale,
  isLocked,
  stripeProductID,
  priceInCents,
}: MonthCardProps) => {
  const t = useTranslations("ClubMonthPage");
  const router = useRouter();
  const { user } = useAuth();
  const { addItemToCart } = useCart();

  const handleLockedClick = () => {
    if (!user) {
      router.push(`/${locale}/auth`);
      return;
    }

    if (!stripeProductID) return;

    addItemToCart({
      stripeProductID,
      unitPrice: priceInCents,
      quantity: 1,
    });

    localStorage.setItem("postCheckoutRedirect", `/${locale}/club/month`);
    router.push(`/${locale}/checkout`);
  };

  const inner = (
    <>
      <Image
        src={imgSrc}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 rounded-[14px] bg-black/60 transition-colors duration-300 group-hover:bg-black/50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[32px] font-medium text-off-white">
          {t("monthLabel", { number: monthNumber })}
        </span>
      </div>
      {isLocked && (
        <div className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5">
          <Lock className="size-4 text-off-white" />
        </div>
      )}
    </>
  );

  if (isLocked) {
    return (
      <button
        type="button"
        onClick={handleLockedClick}
        className="group relative h-[191px] w-full overflow-hidden rounded-[14px]"
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      href={`/${locale}/club/month/${monthNumber}`}
      className="group relative h-[191px] overflow-hidden rounded-[14px]"
    >
      {inner}
    </Link>
  );
};

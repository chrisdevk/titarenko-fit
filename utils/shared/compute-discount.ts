type CartItem = {
  product?: unknown;
  stripeProductID?: string | null;
  unitPrice?: number;
};

type CouponForDiscount = {
  discountType: "percentage" | "fixed";
  discountValue: number;
  applicableProductIds: number[];
  applicableStripeProductIds: string[];
};

export function computeDiscountAmount(
  coupon: CouponForDiscount,
  cartItems: CartItem[],
  cartTotal: number,
): number {
  const { discountType, discountValue, applicableProductIds, applicableStripeProductIds } = coupon;
  const isGlobal = applicableProductIds.length === 0 && applicableStripeProductIds.length === 0;

  let applicableSubtotal: number;
  if (isGlobal) {
    applicableSubtotal = cartTotal;
  } else {
    applicableSubtotal = cartItems.reduce((sum, item) => {
      const productId =
        typeof item.product === "object" && item.product !== null
          ? (item.product as { id: number }).id
          : (item.product as number | undefined);
      const stripeId = item.stripeProductID ?? undefined;

      if (
        (productId != null && applicableProductIds.includes(productId)) ||
        (stripeId != null && applicableStripeProductIds.includes(stripeId))
      ) {
        return sum + (item.unitPrice ?? 0);
      }
      return sum;
    }, 0);
  }

  if (discountType === "percentage") {
    return Math.round(applicableSubtotal * (discountValue / 100));
  } else {
    return Math.min(discountValue, applicableSubtotal);
  }
}

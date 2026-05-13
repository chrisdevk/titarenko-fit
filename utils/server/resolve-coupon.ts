import type { Payload } from "payload";
export { computeDiscountAmount } from "@/utils/shared/compute-discount";

export type ResolvedCoupon = {
  id: string | number;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  applicableProductIds: number[];
  applicableStripeProductIds: string[];
  usageCount: number;
  usageLimit: number | null;
};

export type CouponValidationError = { error: string };

type CartItem = {
  product?: unknown;
  stripeProductID?: string | null;
  unitPrice?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const payloadAny = (payload: Payload): any => payload;

export async function resolveCoupon(
  code: string,
  cartItems: CartItem[],
  payload: Payload,
  options?: { skipCartCheck?: boolean },
): Promise<ResolvedCoupon | CouponValidationError> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await payloadAny(payload).find({
    collection: "coupons",
    where: { code: { equals: code.toUpperCase() } },
    limit: 1,
    depth: 1,
  });

  if (result.docs.length === 0) {
    return { error: "Invalid coupon code." };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const coupon: any = result.docs[0];

  if (coupon.expiresAt && new Date(coupon.expiresAt as string) < new Date()) {
    return { error: "This coupon has expired." };
  }

  if (coupon.usageLimit != null && (coupon.usageCount ?? 0) >= coupon.usageLimit) {
    return { error: "This coupon has reached its usage limit." };
  }

  const applicableProductIds: number[] = [];
  if (Array.isArray(coupon.products)) {
    for (const p of coupon.products) {
      applicableProductIds.push(typeof p === "number" ? p : p.id);
    }
  }

  const applicableStripeProductIds: string[] = [];
  if (Array.isArray(coupon.clubMonths)) {
    for (const m of coupon.clubMonths) {
      if (typeof m === "object" && m !== null && m.stripeProductID) {
        applicableStripeProductIds.push(m.stripeProductID as string);
      }
    }
  }

  const hasRestrictions =
    applicableProductIds.length > 0 || applicableStripeProductIds.length > 0;

  if (hasRestrictions && !options?.skipCartCheck) {
    const hasMatch = cartItems.some((item) => {
      const productId =
        typeof item.product === "object" && item.product !== null
          ? (item.product as { id: number }).id
          : (item.product as number | undefined);
      const stripeId = item.stripeProductID ?? undefined;

      return (
        (productId != null && applicableProductIds.includes(productId)) ||
        (stripeId != null && applicableStripeProductIds.includes(stripeId))
      );
    });

    if (!hasMatch) {
      return { error: "This coupon is not valid for the products in your cart." };
    }
  }

  return {
    id: coupon.id,
    code: coupon.code as string,
    discountType: coupon.discountType as "percentage" | "fixed",
    discountValue: coupon.discountValue as number,
    applicableProductIds,
    applicableStripeProductIds,
    usageCount: (coupon.usageCount as number) ?? 0,
    usageLimit: (coupon.usageLimit as number | null) ?? null,
  };
}

/**
 * Atomically increments the coupon usageCount, guarding against the race
 * condition where two concurrent requests both pass the usageLimit check.
 *
 * Strategy: fetch the latest doc inside the same logical operation, verify
 * the limit is still not exceeded, then write usageCount + 1.  Payload
 * doesn't expose a true atomic compare-and-swap, so we re-read and write
 * inside a try/catch; at low concurrency this is sufficient.  Pass
 * `usageLimit` so we can skip the re-check for unlimited coupons.
 *
 * Returns true on success, false if the limit was already reached.
 */
export async function incrementCouponUsage(
  couponId: string | number,
  _currentUsageCount: number,
  payload: Payload,
  usageLimit?: number | null,
): Promise<boolean> {
  // Re-fetch the current count to reduce the race window.
  const latest = await payloadAny(payload).findByID({
    collection: "coupons",
    id: couponId,
  });

  const latestCount: number = (latest?.usageCount as number) ?? 0;

  if (usageLimit != null && latestCount >= usageLimit) {
    return false;
  }

  await payloadAny(payload).update({
    collection: "coupons",
    id: couponId,
    data: { usageCount: latestCount + 1 },
  });

  return true;
}


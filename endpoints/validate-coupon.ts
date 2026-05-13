import type { PayloadHandler } from "payload";
import { addDataAndFileToRequest } from "payload";
import { resolveCoupon } from "@/utils/server/resolve-coupon";

export const validateCoupon: PayloadHandler = async (req) => {
  await addDataAndFileToRequest(req);

  const { payload } = req;
  const data = req.data as { code?: string; cartItems?: unknown[] };

  if (!data.code) {
    return Response.json({ error: "Coupon code is required." }, { status: 400 });
  }

  const cartItems = (data.cartItems ?? []) as Array<{
    product?: unknown;
    stripeProductID?: string;
    unitPrice?: number;
  }>;

  const result = await resolveCoupon(data.code, cartItems, payload);

  if ("error" in result) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  return Response.json(
    {
      valid: true,
      discountType: result.discountType,
      discountValue: result.discountValue,
      applicableProductIds: result.applicableProductIds,
      applicableStripeProductIds: result.applicableStripeProductIds,
    },
    { status: 200 },
  );
};

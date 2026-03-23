"use server";

import type { Product } from "@/payload-types";
import { getPayload } from "payload";
import configPromise from "@payload-config";

const CLUB_STRIPE_PRODUCT_ID = "prod_UCAvJM085olUtY";

export const getClubProduct = async (): Promise<{
  product: Product | null;
  unitPrice: number;
}> => {
  try {
    const payload = await getPayload({ config: configPromise });

    const products = await payload.find({
      collection: "products",
      where: {
        stripeProductID: {
          equals: CLUB_STRIPE_PRODUCT_ID,
        },
      },
      limit: 1,
    });

    const product = products.docs[0] || null;

    if (!product) return { product: null, unitPrice: 0 };

    let unitPrice = 0;
    if (product.priceJSON) {
      try {
        const prices = JSON.parse(product.priceJSON);
        if (Array.isArray(prices) && prices.length > 0) {
          unitPrice = prices[0].unit_amount || 0;
        }
      } catch {
        // priceJSON not parseable
      }
    }

    return { product, unitPrice };
  } catch (error) {
    console.error("Error fetching club product:", error);
    return { product: null, unitPrice: 0 };
  }
};

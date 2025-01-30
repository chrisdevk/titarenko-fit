import { checkRole } from "@/access/check-role";
import type { Product } from "@/payload-types";
import type { FieldAccess } from "payload";

// we need to prevent access to documents behind a paywall
// to do this we check the document against the user's list of active purchases
export const checkUserPurchases: FieldAccess<Product> = async ({
  req: { user },
  doc,
}): Promise<boolean> => {
  if (!user) {
    return false;
  }

  if (checkRole(["admin"], user)) {
    return true;
  }

  if (
    doc &&
    user &&
    typeof user === "object" &&
    Array.isArray(user?.orders) &&
    user.orders.length > 0
  ) {
    return (
      user.orders?.some(
        (purchase) =>
          doc.id === (typeof purchase === "object" ? purchase.id : purchase),
      ) ?? false
    );
  }

  return false;
};

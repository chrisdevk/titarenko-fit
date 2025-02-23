import * as qs from "qs-esm";

import { Access } from "payload";
import { User } from "@/payload-types";
import { checkRole } from "./check-role";

export const adminsOrOrderedByOrPaymentId: Access = ({ req }) => {
  const typedUser = req.user as User | undefined;
  const isAdmin = checkRole(["admin"], typedUser);

  console.log("user:", typedUser)

  const referer = req.headers?.get("referer") || "";
  const isAdminPanelRequest = referer.includes("/admin");

  if (isAdmin && isAdminPanelRequest) {
    return true;
  }

  const searchParams = req.searchParams;
  const where = searchParams.get("where");

  console.log("search params:", searchParams)

  const query = where ? qs.parse(where) : {};
  const paymentIntentID = (query.stripePaymentIntentID as qs.ParsedQs)
    ?.equals as string | undefined;

    if (paymentIntentID) {
      return {
        and: [
          {
            stripePaymentIntentID: {
              equals: paymentIntentID,
            },
          },
        ],
      };
    }

  if (!typedUser?.id) {
    return false;
  }

  if (!isAdmin) {
    return {
      and: [
        {
          orderedBy: {
            equals: typedUser.id,
          },
        },
      ],
    };
  }

  return true;
};

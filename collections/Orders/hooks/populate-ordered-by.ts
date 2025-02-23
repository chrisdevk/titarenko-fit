import type { FieldHook } from "payload";

import type { Order } from "@/payload-types";

export const populateOrderedBy: FieldHook<Order> = async ({ operation, req, value }) => {
  if ((operation === "create" || operation === "update") && !value && req.user) {
    console.log("Assigning user ID to orderedBy:", req.user.id); // Debug log
    return req.user.id;
  }
  return value;
};


import type { CollectionConfig } from "payload";
import { admins } from "@/access/admins";

export const Coupons: CollectionConfig = {
  slug: "coupons",
  access: {
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, originalDoc, req }) => {
        // Prevent external HTTP requests from setting usageCount.
        // Internal server-side calls via the local Payload API (e.g.
        // incrementCouponUsage) have req.payloadAPI === 'local' and are
        // allowed to set usageCount freely.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isLocalApi = (req as any).payloadAPI === "local";
        if (!isLocalApi) {
          if (operation === "update") {
            data.usageCount = originalDoc?.usageCount ?? 0;
          } else if (operation === "create") {
            data.usageCount = 0;
          }
        }
        return data;
      },
    ],
  },
  admin: {
    defaultColumns: ["code", "discountType", "discountValue", "usageCount", "expiresAt"],
    useAsTitle: "code",
  },
  fields: [
    {
      name: "code",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "The coupon code users enter at checkout (stored and matched as uppercase).",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "discountType",
          type: "select",
          required: true,
          options: [
            { label: "Percentage (%)", value: "percentage" },
            { label: "Fixed Amount (cents)", value: "fixed" },
          ],
        },
        {
          name: "discountValue",
          type: "number",
          required: true,
          min: 0,
          admin: {
            description: "For percentage: 0–100. For fixed: amount in cents (e.g. 2000 = $20.00).",
          },
        },
      ],
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      admin: {
        description:
          "Restrict this coupon to specific products. Leave empty to apply to everything.",
      },
    },
    {
      name: "clubMonths",
      type: "relationship",
      relationTo: "club-months",
      hasMany: true,
      admin: {
        description:
          "Restrict this coupon to specific club months. Leave empty to apply to everything.",
      },
    },
    {
      name: "expiresAt",
      type: "date",
      admin: {
        description: "Optional expiry date. Leave empty for no expiry.",
        position: "sidebar",
      },
    },
    {
      name: "usageLimit",
      type: "number",
      min: 1,
      admin: {
        description: "Maximum redemptions. Leave empty for unlimited.",
        position: "sidebar",
      },
    },
    {
      name: "usageCount",
      type: "number",
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: "How many times this coupon has been used.",
        position: "sidebar",
      },
    },
  ],
};

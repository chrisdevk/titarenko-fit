import type { CollectionConfig } from "payload";
import { adminsOrLoggedIn } from "@/access/admins-or-loggedin";
import { admins } from "@/access/admins";
import { adminsOrOrderedByOrPaymentId } from "@/access/admin-or-ordered-by-payment-id";
import { populateOrderedBy } from "./hooks/populate-ordered-by";
import { clearUserCart } from "./hooks/clear-user-cart";

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    create: adminsOrLoggedIn,
    delete: admins,
    read: adminsOrOrderedByOrPaymentId,
    update: admins,
  },
  admin: {
    defaultColumns: ["createdAt", "orderedBy"],
    useAsTitle: "createdAt",
  },
  fields: [
    {
      name: "orderedBy",
      type: "relationship",
      hooks: {
        beforeChange: [populateOrderedBy],
      },
      relationTo: "users",
    },
    {
      name: "stripePaymentIntentID",
      type: "text",
      admin: {
        /* components: {
          Field: LinkToPaymentIntent,
        }, */
        position: "sidebar",
      },
      label: "Stripe Payment Intent ID",
    },
    {
      type: "row",
      fields: [
        {
          name: "total",
          type: "number",
          min: 0,
          required: true,
        },
        {
          name: "currency",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "product",
              type: "relationship",
              relationTo: "products",
              required: true,
            },
            {
              name: "purchaseDate",
              type: "date",
              required: true,
            },
          ],
        },
        {
          name: "quantity",
          type: "number",
          min: 0,
          max: 1,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [clearUserCart],
  },
};

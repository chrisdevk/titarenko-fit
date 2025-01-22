import type { CollectionConfig } from "payload";

import { beforeProductChange } from "./hooks/before-change";
import { slugField } from "@/fields/slug";
import { admins } from "../Users/access/admins";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "stripeProductID", "_status"],
  },
  hooks: {
    beforeChange: [beforeProductChange],
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "product_description",
      type: "text",
      label: "Product Description",
      localized: true,
    },
    {
      name: "product_question",
      type: "text",
      label: "Product Question",
      localized: true,
    },
    {
      name: "product_thumbnail",
      label: "Product Thumbnail",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "publishedOn",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "for whom",
              label: "For Whom",
              type: "richText",
              localized: true,
            },
            {
              name: "program",
              label: "Program",
              type: "richText",
              localized: true,
            },
            {
              name: "lessons",
              label: "Lessons",
              type: "richText",
              localized: true,
            },
            {
              name: "equipment",
              label: "Equipment",
              type: "richText",
              localized: true,
            },
            {
              name: "contradictions",
              label: "Contradictions",
              type: "richText",
              localized: true,
            },
            {
              name: "faq",
              label: "FAQ",
              type: "richText",
              localized: true,
            },
          ],
        },
        {
          label: "Product Details",
          fields: [
            {
              name: "stripeProductID",
              label: "Stripe Product",
              type: "text",
              admin: {
                components: {
                  Field:
                    "@/collections/Products/ui/StripeProductSelect#StripeProductSelect",
                },
              },
            },
            {
              name: "priceJSON",
              label: "Price JSON",
              type: "textarea",
              admin: {
                readOnly: true,
                hidden: true,
                rows: 10,
              },
            },
          ],
        },
      ],
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      required: true,
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
    slugField(),
    {
      name: "skipSync",
      label: "Skip Sync",
      type: "checkbox",
      admin: {
        position: "sidebar",
        readOnly: true,
        hidden: true,
      },
    },
  ],
};

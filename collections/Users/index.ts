import type { CollectionConfig } from "payload";
import adminsAndUser from "../../access/admins-and-user";
import { anyone } from "../../access/anyone";
import { admins } from "../../access/admins";
import { checkRole } from "../../access/check-role";
import { ensureFirstUserIsAdmin } from "./hooks/ensure-first-user-is-admin";
// import { resolveDuplicatePurchases } from "./hooks/resolve-duplicate-purchases";
import { createStripeCustomer } from "./hooks/create-stripe-customer";
import { loginAfterCreate } from "./hooks/login-after-create";
import { customerProxy } from "./endpoints/customer";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email"],
  },
  auth: {
    tokenExpiration: 28800,
    cookies: {
      sameSite: "None",
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(["admin"], user!),
  },
  hooks: {
    beforeChange: [createStripeCustomer],
    afterChange: [loginAfterCreate],
  },
  endpoints: [
    {
      handler: customerProxy,
      method: "get",
      path: "/:teamID/customer",
    },
    {
      handler: customerProxy,
      method: "patch",
      path: "/:teamID/customer",
    },
  ],
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["customer"],
      options: [
        {
          label: "admin",
          value: "admin",
        },
        {
          label: "customer",
          value: "customer",
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      name: "orders",
      type: "join",
      collection: "orders",
      on: "orderedBy",
      admin: {
        allowCreate: false,
        defaultColumns: ["id", "createdAt", "total", "currency", "items"],
      },
    },
    {
      name: "stripeCustomerID",
      label: "Stripe Customer",
      type: "text",
      access: {
        read: ({ req: { user } }) => checkRole(["admin"], user!),
      },
    },
    {
      name: "cart",
      type: "group",
      fields: [
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
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "unitPrice",
                  type: "number",
                  required: true,
                },
                {
                  name: "stripeProductID",
                  type: "text",
                  label: "Stripe Product ID",
                },
                {
                  name: "quantity",
                  type: "number",
                  admin: {
                    step: 1,
                  },
                  required: true,
                  min: 0,
                },
              ],
            },
            {
              name: "url",
              type: "text",
            },
          ],
          interfaceName: "CartItems",
          label: "Items",
        },
      ],
      label: "Cart",
    },
    {
      name: "skipSync",
      type: "checkbox",
      admin: {
        hidden: true,
        position: "sidebar",
        readOnly: true,
      },
      label: "Skip Sync",
    },
  ],
  timestamps: true,
};

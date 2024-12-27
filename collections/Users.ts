import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      hasMany: true,
      options: [
        {
          value: "admin",
          label: "Admin",
        },
        {
          value: "user",
          label: "User",
        },
      ],
      defaultValue: "user",
      required: true,
    },
  ],
  access: {
    admin: ({ req }) => {
      return req.user?.role?.includes("admin") || false;
    },
  },
};

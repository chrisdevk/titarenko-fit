import type { CollectionConfig } from "payload";
import { admins } from "./Users/access/admins";

export const Blogs: CollectionConfig = {
  slug: "blogs",
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
      name: "thumbnail",
      type: "upload",
      required: true,
      relationTo: "media",
    },
    {
      name: "body",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
};

import type { CollectionConfig } from "payload";
import { admins } from "../access/admins";

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
    {
      name: "metadata_title",
      type: "text",
      label: "Metadata Title",
      admin: {
        position: "sidebar"
      }
    },
    {
      name: "metadata_description",
      type: "textarea",
      label: "Metadata Description",
      admin: {
        position: "sidebar"
      }
    },
    {
      name: "metadata_keywords",
      type: "textarea",
      label: "Metadata Keywords",
      admin: {
        position: "sidebar"
      }
    }
  ],
};

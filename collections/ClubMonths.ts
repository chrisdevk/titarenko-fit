import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";
import { admins } from "../access/admins";

export const ClubMonths: CollectionConfig = {
  slug: "club-months",
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
      name: "monthNumber",
      type: "number",
      required: true,
      unique: true,
      min: 1,
      max: 12,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "stripeProductID",
      type: "text",
      label: "Stripe Product ID",
      admin: {
        position: "sidebar",
        description:
          "The Stripe product ID (e.g. prod_xxx) users must purchase to unlock this month.",
      },
    },
    {
      name: "priceInCents",
      type: "number",
      label: "Price (in cents)",
      admin: {
        position: "sidebar",
        description: "Price in cents (e.g. 4900 = $49.00).",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      required: true,
      relationTo: "media",
    },
    {
      name: "description",
      type: "richText",
      localized: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Calendar Days",
          fields: [
            {
              name: "startDayOfWeek",
              type: "select",
              required: true,
              defaultValue: "0",
              options: [
                { label: "Sunday", value: "0" },
                { label: "Monday", value: "1" },
                { label: "Tuesday", value: "2" },
                { label: "Wednesday", value: "3" },
                { label: "Thursday", value: "4" },
                { label: "Friday", value: "5" },
                { label: "Saturday", value: "6" },
              ],
            },
            {
              name: "totalDays",
              type: "number",
              required: true,
              defaultValue: 31,
              min: 28,
              max: 35,
            },
            {
              name: "days",
              type: "array",
              minRows: 1,
              maxRows: 35,
              fields: [
                {
                  name: "dayNumber",
                  type: "number",
                  required: true,
                  min: 1,
                  max: 35,
                },
                {
                  name: "dayType",
                  type: "select",
                  required: true,
                  defaultValue: "rest",
                  options: [
                    { label: "Workout", value: "workout" },
                    { label: "Rest", value: "rest" },
                  ],
                },
                {
                  name: "lessons",
                  type: "array",
                  minRows: 1,
                  maxRows: 2,
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.dayType === "workout",
                  },
                  fields: [
                    {
                      name: "lessonName",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "duration",
                      type: "number",
                      min: 1,
                      admin: { description: "Duration in minutes" },
                    },
                    {
                      name: "videoUrl",
                      type: "text",
                      label: "Video URL",
                      admin: { description: "Vimeo video URL" },
                    },
                  ],
                },
                {
                  name: "badge",
                  type: "select",
                  defaultValue: "none",
                  options: [
                    { label: "None", value: "none" },
                    { label: "Start", value: "start" },
                    { label: "Finish", value: "finish" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Equipment & Notes",
          fields: [
            {
              name: "equipment",
              type: "array",
              fields: [
                {
                  name: "item",
                  type: "text",
                  required: true,
                  localized: true,
                },
              ],
            },
            {
              name: "notes",
              type: "richText",
              localized: true,
            },
            {
              name: "howToIncreaseLoad",
              type: "richText",
              localized: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        console.log(`Revalidating cache for club month: ${doc.id}`);
        revalidateTag("club-months", "default");
      },
    ],
  },
};

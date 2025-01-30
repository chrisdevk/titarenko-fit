// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { stripePlugin } from "@payloadcms/plugin-stripe";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

import { Media } from "./collections/Media";
import { Blogs } from "./collections/Blogs";
import { Products } from "./collections/Products";
import { Categories } from "./collections/Categories";
import { Users } from "./collections/Users";
import { productsProxy } from "./endpoints/products";
import { createPaymentIntent } from "./endpoints/create-payment-intent";
import { Orders } from "./collections/Orders";
import { paymentSucceeded } from "./stripe/webhooks/payment-succeded";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Blogs, Products, Categories, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_USER || "",
    defaultFromName: "Titarenko Fit Website",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  endpoints: [
    {
      handler: productsProxy,
      method: "get",
      path: "/stripe/products",
    },
    {
      handler: createPaymentIntent,
      method: "post",
      path: "/create-payment-intent",
    },
    /*
    {
      handler: customersProxy,
      method: 'get',
      path: '/stripe/customers',
    }, */
  ],
  plugins: [
    payloadCloudPlugin(),
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
      isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
      logs: true,
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
      webhooks: {
        "payment_intent.succeeded": paymentSucceeded,
      },
    }),
  ],
  localization: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
  },
});

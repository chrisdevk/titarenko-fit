module.exports = {
  apps: [
    {
      name: "app",
      script: "npm",
      args: "start",
      cwd: "/var/www/titarenko-fit",
      env: {
        NODE_ENV: "production",
        DATABASE_URI: process.env.DATABASE_URI || "",
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET || "",
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || "",
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
        SMTP_HOST: process.env.SMTP_HOST || "",
        SMTP_USER: process.env.SMTP_USER || "",
        SMTP_PASS: process.env.SMTP_PASS || "",
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
        STRIPE_WEBHOOKS_SIGNIN_SECRET: process.env.STRIPE_WEBHOOKS_SIGNIN_SECRET || "",
        COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "",
      },
    },
  ],
};

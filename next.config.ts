import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPayload(withNextIntl(nextConfig));

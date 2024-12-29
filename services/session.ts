"use server";

import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

export const getSession = async () => {
  const headers = await getHeaders();
  const payload = await getPayload({ config });

  const { permissions, user } = await payload.auth({ headers });

  return { permissions, user };
};

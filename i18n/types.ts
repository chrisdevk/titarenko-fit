import { getTranslations } from "next-intl/server";

export type ServerT = Awaited<ReturnType<typeof getTranslations<"HomePage">>>;

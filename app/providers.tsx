import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/query-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <QueryProvider>
      <NextIntlClientProvider messages={messages}>
        <Toaster />
        {children}
      </NextIntlClientProvider>
    </QueryProvider>
  );
}

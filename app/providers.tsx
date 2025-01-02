import { Toaster } from "@/components/ui/sonner";
import { LanguageContextProvider } from "@/context/language-context";
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
        <LanguageContextProvider>
          <Toaster />
          {children}
        </LanguageContextProvider>
      </NextIntlClientProvider>
    </QueryProvider>
  );
}

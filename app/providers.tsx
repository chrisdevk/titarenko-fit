import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart";
import { ProgressProvider } from "@/context/progress-context";
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
        <AuthProvider>
          <CartProvider>
            <ProgressProvider>
              <Toaster />
              {children}
            </ProgressProvider>
          </CartProvider>
        </AuthProvider>
      </NextIntlClientProvider>
    </QueryProvider>
  );
}

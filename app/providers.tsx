import { Toaster } from "@/components/ui/sonner";
import { LanguageContextProvider } from "@/context/language-context";
import QueryProvider from "@/lib/query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <LanguageContextProvider>
        <Toaster />
        {children}
      </LanguageContextProvider>
    </QueryProvider>
  );
}

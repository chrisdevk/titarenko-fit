"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export const LanguageSelect = ({ locale }: { locale: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex gap-0 rounded-3xl border border-purple-custom">
      {(["ru", "en"] as const).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => {
            const newPath = pathname.replace(`/${locale}`, `/${loc}`);
            router.replace(newPath);
          }}
          className={cn(
            "min-w-16 flex-1 rounded-3xl px-1 py-1 font-medium transition-colors",
            locale === loc
              ? "bg-purple-custom text-white"
              : "text-neutral-700 hover:bg-purple-custom/10",
          )}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

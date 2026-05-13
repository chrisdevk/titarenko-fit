"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface CouponInputProps {
  onApply: (code: string) => Promise<void>;
  onRemove: () => void;
  isApplied: boolean;
  appliedCode: string | null;
  error: string | null;
  loading: boolean;
}

export const CouponInput = ({
  onApply,
  onRemove,
  isApplied,
  appliedCode,
  error,
  loading,
}: CouponInputProps) => {
  const [value, setValue] = useState(appliedCode ?? "");
  const t = useTranslations("CheckoutPage");

  const handleApply = async () => {
    if (!value.trim()) return;
    await onApply(value.trim());
  };

  if (isApplied && appliedCode) {
    return (
      <div className="flex items-center justify-between rounded-xl bg-green-50 px-3 py-2">
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle2 className="size-4 shrink-0" />
          <span className="text-sm font-medium">
            {t("couponApplied")}: <span className="uppercase">{appliedCode}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="ml-2 text-green-600 hover:text-green-800"
          aria-label={t("removeCoupon")}
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          placeholder={t("couponPlaceholder")}
          className="h-9 bg-white text-sm uppercase placeholder:normal-case"
          onKeyDown={(e) => {
            if (e.key === "Enter") void handleApply();
          }}
          disabled={loading}
        />
        <Button
          type="button"
          onClick={() => void handleApply()}
          disabled={loading || !value.trim()}
          variant="outline"
          className="h-9 shrink-0 text-sm"
        >
          {loading ? "..." : t("applyCoupon")}
        </Button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

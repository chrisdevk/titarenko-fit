"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const ExpiredToast = () => {
  const searchParams = useSearchParams();
  const t = useTranslations("ClubPage.access");

  useEffect(() => {
    if (searchParams.get("expired") === "true") {
      toast.error(t("expired"));
      // Clean up the URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams, t]);

  return null;
};

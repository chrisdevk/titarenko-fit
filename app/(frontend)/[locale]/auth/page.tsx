"use client";

import { AuthForm } from "@/components/forms/auth-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AuthPage() {
  const [variant, setVariant] = useState<"signup" | "login">("login");

  const t = useTranslations("AuthPage");

  return (
    <div className="mx-auto flex h-screen w-11/12 max-w-[1296px] flex-col items-center justify-center gap-x-20 md:h-[70vh] lg:h-screen lg:flex-row lg:justify-normal">
      <div className="relative hidden h-full lg:block lg:w-1/2">
        <Image
          src="/images/auth-image.webp"
          alt="Gymnastic auth"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-y-9 lg:w-1/2">
        <h1 className="font-semibold lg:text-5xl">
          {variant === "login" ? t("login.heading") : t("signup.heading")}
        </h1>
        <div className="w-full space-y-8">
          <div className="flex w-full gap-x-6 border-b border-b-neutral-500 pl-3">
            <Button
              type="button"
              variant="link"
              onClick={() => setVariant("login")}
              className={cn(
                "relative rounded-none pb-0 text-lg hover:no-underline",
                variant === "login" ? "text-off-black" : "text-neutral-500",
              )}
            >
              {t("loginTab")}
              {variant === "login" && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-[68px] rounded-3xl bg-indigo-custom px-2"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setVariant("signup")}
              className={cn(
                "relative rounded-none pb-0 text-lg hover:no-underline",
                variant === "signup" ? "text-off-black" : "text-neutral-500",
              )}
            >
              {t("signupTab")}
              {variant === "signup" && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-[68px] rounded-3xl bg-indigo-custom px-2"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Button>
          </div>
          <AuthForm variant={variant} />
        </div>
      </div>
    </div>
  );
}

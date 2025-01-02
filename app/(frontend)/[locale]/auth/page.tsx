"use client";

import { AuthForm } from "@/components/forms/auth-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

export default function AuthPage() {
  const [variant, setVariant] = useState<"signup" | "login">("login");

  return (
    <div className="flex items-center gap-x-20 w-11/12 max-w-[1296px] mx-auto h-screen">
      <div className="relative w-1/2 h-full">
        <Image
          src="/images/auth-image.png"
          alt="Gymnastic auth"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-y-9 w-1/2">
        <h1 className="text-5xl font-semibold">
          {variant === "login" ? "Welcome back" : "Welcome!"}
        </h1>
        <div className="space-y-8 w-full">
          <div className="flex gap-x-6 border-b border-b-neutral-500 w-full pl-3">
            <Button
              type="button"
              variant="link"
              onClick={() => setVariant("login")}
              className={cn(
                "rounded-none pb-0 hover:no-underline text-lg relative",
                variant === "login" ? "text-off-black" : "text-neutral-500"
              )}
            >
              Log in
              {variant === "login" && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 px-2 bg-indigo-custom h-0.5 w-[68px] mx-auto rounded-3xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setVariant("signup")}
              className={cn(
                "rounded-none pb-0 hover:no-underline text-lg relative",
                variant === "signup" ? "text-off-black" : "text-neutral-500"
              )}
            >
              Sign up
              {variant === "signup" && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 px-2 bg-indigo-custom h-0.5 w-[68px] mx-auto rounded-3xl"
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

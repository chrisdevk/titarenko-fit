"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema, loginSchema } from "@/lib/zod-schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

type SignupFormValues = z.infer<typeof signupSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;
type AuthFormValues = SignupFormValues | LoginFormValues;

const isSignupVariant = (variant: string): variant is "signup" =>
  variant === "signup";

interface AuthFormProps {
  variant: "signup" | "login";
  locale: "en" | "ru";
}

export const AuthForm = ({ variant, locale }: AuthFormProps) => {
  const isSignup = isSignupVariant(variant);
  const authSchema = isSignup ? signupSchema : loginSchema;

  const t = useTranslations("AuthPage");

  const { create, login, user } = useAuth();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: isSignup ? "" : "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: AuthFormValues) => {
      if (isSignup) {
        await create(data as SignupFormValues);
        await login(data as LoginFormValues);
      } else {
        await login(data as LoginFormValues);
      }
    },
    onSuccess: async () => {
      toast(isSignup ? "Account created!" : "Logged in!");

      const currentUser = user;

      if (currentUser?.roles?.includes("admin")) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    },
    onError: (error: Error) => {
      console.error("Error:", error.message);
      toast.error(isSignup ? "Failed to create an account :(" : "Login failed");
    },
  });

  const onSubmit = (data: AuthFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex gap-x-4">
          {isSignup && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg">{t("signup.name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g. John Smith"
                      className="h-fit border bg-transparent px-5 py-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">{t("signup.email")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    className="h-fit border bg-transparent px-5 py-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">{t("signup.password")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="h-fit border bg-transparent px-5 py-4"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="h-fit w-full py-3 text-xl">
          {isSignup ? t("signup.button") : t("login.button")}
        </Button>{" "}
        {!isSignup && (
          <div>
            <Link
              href={`/${locale}/forgot-password`}
              className="text-black transition-colors hover:text-purple-custom hover:underline"
            >
              {t("login.forgotPassword")}
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
};

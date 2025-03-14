"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/utils/actions/auth/forgot-password";
import { forgotPasswordSchema } from "@/lib/zod-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
  const t = useTranslations("AuthPage");

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      return forgotPassword(data.email);
    },
    onSuccess: () => {
      toast.success("Password reset email sent!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong. Try again.");
    },
  });

  const onSubmit = (data: { email: string }) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto flex h-screen max-w-xl flex-col justify-center rounded">
      <h1 className="mb-4 text-2xl font-bold">{t("forgotPassword.heading")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">
                  {t("forgotPassword.email")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    className="h-fit border bg-transparent px-5 py-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={mutation.isPending} size="lg">
            {mutation.isPending
              ? t("forgotPassword.sending")
              : t("forgotPassword.button")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordSchema } from "@/lib/zod-schemas";
import { resetPassword } from "@/utils/actions/auth/reset-password";
import { useTranslations } from "next-intl";

export default function ResetPasswordPage() {
  const t = useTranslations("AuthPage.resetPassword");

  const params = useParams<{ locale: "en" | "ru" }>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: { password: string }) => {
      return resetPassword({ token: token!, password: data.password });
    },
    onSuccess: () => {
      toast.success("Password reset successfully!");
      router.push(`/${params.locale}/auth`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong. Try again.");
    },
  });

  const onSubmit = (data: { password: string }) => {
    mutation.mutate(data);
  };

  if (!token) {
    return (
      <div className="mx-auto mt-10 flex h-screen max-w-lg flex-col justify-center rounded-lg">
        <p className="text-red-500">Invalid or missing reset token.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 flex h-screen max-w-lg flex-col justify-center rounded-lg">
      <h1 className="mb-4 text-2xl font-bold">{t("heading")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("newPassword")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="h-fit border bg-transparent px-5 py-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={mutation.isPending} size="lg">
            {mutation.isPending ? t("resetting") : t("button")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

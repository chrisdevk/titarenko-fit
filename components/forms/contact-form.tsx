"use client";

import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/zod-schemas";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { z } from "zod";

interface ContactFormProps {
  user_name: string | null | undefined;
  user_email: string | null | undefined;
}

export const ContactForm = ({ user_name, user_email }: ContactFormProps) => {
  const t = useTranslations("ContactPage.form");

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: user_name || "",
      email: user_email || "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white rounded-3xl p-8 w-1/2 space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg">{t("name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g. John Smith"
                  className="px-5 py-4 h-fit bg-transparent border border-neutral-200"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg">{t("email")}</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@email.com"
                  className="px-5 py-4 h-fit bg-transparent border border-neutral-200"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg">{t("name")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write something..."
                  className="px-5 py-4 h-fit bg-transparent border rounded-3xl border-neutral-200"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full z-10">
          {t("button")}
        </Button>
      </form>
    </Form>
  );
};

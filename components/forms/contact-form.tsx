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
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { sendEmail } from "@/utils/actions/send-email";

interface ContactFormProps {
  user_name: string | null | undefined;
  user_email: string | null | undefined;
}

export const ContactForm = ({ user_name, user_email }: ContactFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslations("ContactPage.form");

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: user_name || "",
      email: user_email || "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setIsLoading(true);
    sendEmail({
      from: data.email,
      name: data.name,
      subject: data.subject,
      text: data.message,
    }).then(() => {
      setIsLoading(false);
      setIsSuccess(true);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-3xl bg-off-white px-4 py-6 md:p-8 lg:w-1/2"
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
                  className="h-fit border border-neutral-200 bg-transparent px-5 py-3"
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
                  className="h-fit border border-neutral-200 bg-transparent px-5 py-3"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg">{t("subject")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("subject_placeholder")}
                  className="h-fit rounded-3xl border border-neutral-200 bg-transparent px-5 py-3"
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
              <FormLabel className="text-lg">{t("message")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("message_placeholder")}
                  className="h-fit rounded-3xl border border-neutral-200 bg-transparent px-5 py-3"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSuccess ? (
          <div className="flex items-center justify-center gap-x-2 rounded-3xl bg-baby-slate py-2">
            <p>{t("success")}</p>
            <CircleCheck className="size-5 text-indigo-custom" />
          </div>
        ) : (
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="z-10 w-full"
          >
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span>Sending...</span>
              </>
            ) : (
              t("button")
            )}
          </Button>
        )}
      </form>
    </Form>
  );
};

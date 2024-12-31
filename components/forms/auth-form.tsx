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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/user-service";
import { login, signup } from "@/services/auth-service";

type SignupFormValues = z.infer<typeof signupSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;
type AuthFormValues = SignupFormValues | LoginFormValues;

const isSignupVariant = (variant: string): variant is "signup" =>
  variant === "signup";

export const AuthForm = ({ variant }: { variant: "signup" | "login" }) => {
  const isSignup = isSignupVariant(variant);
  const authSchema = isSignup ? signupSchema : loginSchema;

  const queryClient = useQueryClient();

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
      return isSignup
        ? signup(data as SignupFormValues)
        : login(data as LoginFormValues);
    },
    onSuccess: async () => {
      toast(isSignup ? "Account created!" : "Logged in!");

      const currentUser = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
      });

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
                  <FormLabel className="text-base">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g. John Smith"
                      className="px-5 py-4 h-fit bg-transparent border"
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
                <FormLabel className="text-base">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    className="px-5 py-4 h-fit bg-transparent border"
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
              <FormLabel className="text-base">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="px-5 py-4 h-fit bg-transparent border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full text-xl py-3 h-fit">
          {isSignup ? "Sign up" : "Log in"}
        </Button>
      </form>
    </Form>
  );
};

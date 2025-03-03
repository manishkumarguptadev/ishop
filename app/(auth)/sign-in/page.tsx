"use client";
import { FormError } from "@/components/shared/auth/form-error";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getAuthErrorMessage } from "@/lib/error";
import { SigninFormSchema } from "@/lib/validator";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function SigninForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;
  const urlError = searchParams.get("error") || "";

  useEffect(() => {
    setError(getAuthErrorMessage(urlError));
  }, []);

  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof SigninFormSchema>) => {
    setError("");
    signIn("credentials", { ...values, callbackUrl });
  };

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="space-y-4">
        <Link href="/" className="flex-center">
          <Image
            priority={true}
            src="/images/logo.svg"
            width={60}
            height={60}
            alt="ishop logo"
          />
        </Link>
        <CardTitle className="text-center text-lg font-semibold">
          Sign In
        </CardTitle>
        <CardDescription className="text-center">
          Welcome back! Please sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john.doe@example.com"
                        type="email"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="******"
                        type="password"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size="sm"
                variant="link"
                asChild
                className="px-0 font-normal"
              >
                <Link href="/auth/reset">Forgot password?</Link>
              </Button>
            </div>
            <FormError message={error} />
            <Button disabled={isSubmitting} type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>

      <p className="p-6 pt-0 text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up">
          <span className="text-sky-700 hover:underline">Sign up</span>
        </Link>
      </p>
    </Card>
  );
}

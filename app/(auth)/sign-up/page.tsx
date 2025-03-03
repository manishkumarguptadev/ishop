"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Poppins } from "next/font/google";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { signUp } from "@/lib/actions/user.actions";
import { SignupFormSchema } from "@/lib/validator";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export default function SignupForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignupFormSchema>) => {
    setError("");
    startTransition(() => {
      signUp(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return success ? (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="space-y-8 text-center">
        <Link href="/" className="flex-center">
          <Image
            priority={true}
            src="/images/logo.svg"
            width={60}
            height={60}
            alt="ishop logo"
          />
        </Link>
        <CardTitle>Your account has been created</CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link href="/sign-in">Login to your account</Link>
        </Button>
      </CardContent>
    </Card>
  ) : (
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
          Create Account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe"
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
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
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
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <Button disabled={isPending} type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>

      <p className="p-6 pt-0 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in">
          <span className="text-sky-700 hover:underline">Sign in</span>
        </Link>
      </p>
    </Card>
  );
}

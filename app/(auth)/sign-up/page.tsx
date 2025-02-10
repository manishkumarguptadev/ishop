"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Poppins } from "next/font/google";
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
import { SignupFormSchema } from "@/lib/validator";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export default function SignupForm() {
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
    console.log(values);
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
                        disabled={false}
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
                        disabled={false}
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
                        disabled={false}
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
                        disabled={false}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={"error"} />
            <Button disabled={false} type="submit" className="w-full">
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

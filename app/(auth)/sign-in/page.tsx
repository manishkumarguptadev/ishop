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
import { SigninFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function SigninForm() {
  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SigninFormSchema>) => {
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
              <Button
                size="sm"
                variant="link"
                asChild
                className="px-0 font-normal"
              >
                <Link href="/auth/reset">Forgot password?</Link>
              </Button>
            </div>
            <FormError message={"error"} />
            <Button disabled={false} type="submit" className="w-full">
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

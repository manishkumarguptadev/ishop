import * as z from "zod";

export const SignupFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SigninFormSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { SignupFormSchema } from "@/lib/validator";
import { getUserByEmail } from "@/lib/data/user";
import prisma from "@/prisma/client";

export const signUp = async (values: z.infer<typeof SignupFormSchema>) => {
  const validatedFields = SignupFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User created successfully" };
};

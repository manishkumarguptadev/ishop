import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import prisma from "./prisma/client";

import { getUserById } from "@/lib/data/user";
import { Role } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  ...authConfig,
});

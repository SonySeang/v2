import Credentials from "next-auth/providers/credentials";
import NextAuth, { NextAuthConfig } from "next-auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
const config = {
  pages: {
    signIn: "/log-in",
  },
  providers: [
    Credentials({
      async authorize(credentials, request) {
        //runs on sign in
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error("No user found");
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedpassword
        );
        if (!passwordsMatch) {
          throw new Error("Invalid");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // run request to check if user is authorized
    authorized: ({ auth, request }) => {
      const isLoggingIn = Boolean(auth?.user);
      const isTryingToAccessApp =
        request.nextUrl.pathname.includes("/dashboard");

      if (!isLoggingIn && isTryingToAccessApp) {
        return false;
      }
      if (isLoggingIn && !isTryingToAccessApp) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      if (!isTryingToAccessApp) {
        return false;
      }
      if (!isLoggingIn && !isTryingToAccessApp) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        // on sign in
        token.userId = <string>user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, handlers, signOut } = NextAuth(config);

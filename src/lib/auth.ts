import Credentials from "next-auth/providers/credentials";
import NextAuth, { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./server-util";
import { authFormSchema } from "./validations";
import Google from "next-auth/providers/google";

const config = {
  pages: {
    signIn: "/log-in",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        //validate credentials
        const validationFormDataObject = authFormSchema.safeParse(credentials);
        if (!validationFormDataObject.success) {
          return null;
        }
        //runs on sign in
        const { email, password } = validationFormDataObject.data;
        const user = await getUserByEmail(email);
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
        return Response.redirect(new URL("/dashboard/", request.nextUrl));
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

export const {
  auth,
  signIn,
  handlers: { GET, POST },
  signOut,
} = NextAuth(config);

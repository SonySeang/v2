import { DefaultSession, DefaultUser } from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    role?: string | null;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role?: string | null;
  }
}

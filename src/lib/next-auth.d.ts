import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    hasAcess: boolean;
  }
  interface Session {
    user: User & {
      id: string;
      hasAcess : boolean;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    hasAcess: boolean;
  }
}

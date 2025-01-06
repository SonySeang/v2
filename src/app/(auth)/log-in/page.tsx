"use client";

import AuthForm from "@/components/auth/auth-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function LogIn() {
  return (
    <main>
      <AuthForm actionType="login" />
      <p>
        No account?
        <Link href="/sign-up" className="text-blue-500">
          {" "}
          Sign up{" "}
        </Link>
        .
      </p>
      <h1>Sign in with Google</h1>
      <button onClick={() => signIn("google")}>GOOGLE</button>
    </main>
  );
}

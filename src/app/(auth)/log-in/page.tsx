"use client";

import AuthForm from "@/components/auth/auth-form";
import Link from "next/link";
import React from "react";
import GoogleLogin from "../_component/GoogleLogin";

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
      <GoogleLogin />
    </main>
  );
}

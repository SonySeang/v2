import AuthForm from "@/components/auth/auth-form";
import Link from "next/link";
import React from "react";

export default function NewUser() {
  return (
    <main>
      <AuthForm actionType="signup" />
      <p>
        Have account?
        <Link href="/log-in" className="text-blue-500">
          {" "}
          Log in{" "}
        </Link>
        .
      </p>
    </main>
  );
}

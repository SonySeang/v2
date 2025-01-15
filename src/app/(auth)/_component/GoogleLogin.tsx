"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

export default function GoogleLogin() {
  return (
    <div
      onClick={() => signIn("google")}
      className="w-full flex items-center justify-center p-2 bg-blue-500 text-white rounded cursor-pointer"
    >
      <FaGoogle className="mr-2" />
      Sign in with Google
    </div>
  );
}

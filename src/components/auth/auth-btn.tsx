"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface AuthButtonProps {
  actionType: "login" | "signup";
}
export default function AuthButton({ actionType }: AuthButtonProps) {
  const router = useRouter();
  const handleLogin = async () => {
    router.push("/dashboard/category");
  };
  if (actionType === "login") {
    return <Button onClick={() => handleLogin}>Log in </Button>;
  }
  if (actionType === "signup") {
    return <Button onClick={() => router.push("/log-in")}>Sign up</Button>;
  }
  return <div>AuthButton</div>;
}

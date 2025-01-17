import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { logIn, signUp } from "@/action/action";
import AuthButton from "./auth-btn";

interface AuthFormProps {
  actionType: "login" | "signup";
}

export default function AuthForm({ actionType }: AuthFormProps) {
  return (
    <div className="text-5xl  border-2 rounded-3xl ">
      <form
        action={actionType === "login" ? logIn : signUp}
        className="mx-10 my-6 "
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            maxLength={100}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            maxLength={100}
          />
        </div>
        {actionType === "login" ? (
          <AuthButton actionType="login" />
        ) : (
          <AuthButton actionType="signup" />
        )}
      </form>
    </div>
  );
}

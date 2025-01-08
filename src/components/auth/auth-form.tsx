"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { logIn, signUp } from "@/action/auth";


interface AuthFormProps {
  actionType: "login" | "signup";
}

export default function AuthForm({ actionType }: AuthFormProps) {
  return (
    <div>
      <form action={ actionType === "login" ? logIn : signUp}>
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
        <Button className="mt-2 my-2 rounded-xl" type="submit">
          {actionType === "login" ? "Sign in" : "Sign up"}
        </Button>
      </form>
    </div>
  );
}

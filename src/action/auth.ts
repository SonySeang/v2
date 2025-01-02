"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function logIn(formData: FormData) {

  await signIn("credentials", formData);
}
export async function logOut() {
  await signOut({ redirectTo: "/log-in" });
}

export async function signUp(formData: FormData) {
  const hashedpassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedpassword,
    },
  });
  await signIn("credentials", formData);
}

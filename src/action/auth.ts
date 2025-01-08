import prisma from "@/lib/db";
import { authFormSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export async function logIn(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  redirect("/dashboard");
}

export async function logOut(): Promise<void> {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formData: FormData): Promise<void> {
  const validationFormDataObject = authFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFormDataObject.success) {
    throw new Error("Invalid form data");
  }

  const { email, password } = validationFormDataObject.data;

  // Hash the password before saving to the database
  const hashedpassword = await bcrypt.hash(password, 10);

  // Save the user to the database (example using Prisma)
  await prisma.user.create({
    data: {
      email,
      hashedpassword,
    },
  });

  // Automatically log in the user after sign-up
  await logIn(formData);
}

"use server"
import { signIn, signOut } from "@/lib/auth";

export async function logIn(formData: FormData) {

  const authdata = Object.fromEntries(formData.entries());
  
  await signIn("credentials", authdata);
}
export async function logOut(){
  await signOut( { redirectTo: "/log-in" });
}
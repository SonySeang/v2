"use client";
import React from "react";
import { Button } from "../ui/button";
import { logOut } from "@/action/action";


export default function SignOutBtn() {
  return <Button onClick={async() => await logOut()}>Sign Out</Button>;
}

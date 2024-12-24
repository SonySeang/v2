import SignOutBtn from "@/components/auth/sign-out-btn";
import ContentBlock from "@/components/content-block";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import React from "react";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/log-in");
  }
  return (
    <ContentBlock>
      <div>Login As .....</div>
      <p>{session?.user?.email}</p>
<SignOutBtn/>
    </ContentBlock>
  );
}

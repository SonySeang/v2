"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { logIn } from "@/action/action";


export function SignInButton() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Button disabled>loading...</Button>;
  }
  if (status === "authenticated") {
    return (
      <div className="flex ">
        <p>{session?.user?.name}</p>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* <SingOutButton /> */}
      </div>
    );
  }

  return <Button onClick={() => logIn}>Sign in</Button>;
}

// export function SingOutButton() {
//   return <Button onClick={() => signOut()}>Sign Out</Button>;
// }

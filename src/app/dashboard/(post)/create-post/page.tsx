import PostForm from "@/components/home/post-form";
import { checkAuth } from "@/lib/server-util";
import React from "react";

async function Page() {
  const session = await checkAuth();

  if (!session.user) {
    return <h1>Unauthorized</h1>;
  }

  return <PostForm actionType="create" />;
}

export default Page;

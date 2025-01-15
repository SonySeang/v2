import CommunityForm from "@/components/community/community-form";
import { checkAuth } from "@/lib/server-util";
import React from "react";

export default async function page() {
  const session = await checkAuth();
  const user = session.user;

  if (!user) {
    return <h1>Unauthorized</h1>;
  }

  return <CommunityForm actionType="create" />;
}

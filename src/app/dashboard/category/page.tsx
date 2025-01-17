import React from "react";
import CreateCategory from "./create-category/page";
import { checkAuth } from "@/lib/server-util";
import ContentBlock from "@/components/content-block";

export default async function Category() {
  const session = await checkAuth();

  if (!session) {
    return <h1>Unauthorized user</h1>;
  }
  if (session.user?.role === "admin") {
    return <h1>Unauthorized this is for admin</h1>;
  }
  return (
    <div>
      <ContentBlock className="w-[720px]">
        <CreateCategory />
      </ContentBlock>
    </div>
  );
}

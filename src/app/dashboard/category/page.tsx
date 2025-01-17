import React from "react";
import CreateCategory from "./create-category/page";
import { checkAuth } from "@/lib/server-util";

export default async function Category() {
  const session = await checkAuth();
  if (!session || session.user.role === "admin") {
    return <div>This page is for Admin</div>;
  }
  return (
    <div>
      Category
      <CreateCategory  />
    </div>
  );
}

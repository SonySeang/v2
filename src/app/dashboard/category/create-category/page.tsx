import CategoryForm from "@/components/category/category-form";
import { checkAuth } from "@/lib/server-util";
import React from "react";

export default async function CreateCategory() {
  const session = await checkAuth();

  if (session.user.role === "admin") {
    return null;
  }
  return <CategoryForm actionType="create" />;
}

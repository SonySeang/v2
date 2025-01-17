import React from "react";
import ContentBlock from "@/components/content-block";
import { checkAuth } from "@/lib/server-util";
import CategoryButton from "@/components/category/category-btn";
import CategoryList from "@/components/category/category-list";
import { Separator } from "@/components/ui/separator";

export default async function Category() {
  const session = await checkAuth();

  if (!session.user) {
    return <h1>Unauthorized</h1>;
  }

  if (session.user.id !== "cm60866ca0001rx2ms5lax3lh") {
    return <h1>Unauthorized admin</h1>;
  }
  return (
    <div>
      <span className="text-2xl font-bold mb-5">Category</span>
      <Separator className="mb-10 mt-5" />
      <ContentBlock className="w-[1150px]">
        <CategoryList />
        <CategoryButton actionType="create" />
      </ContentBlock>
    </div>
  );
}

import CategoryForm from "@/components/category/category-form";
import prisma from "@/lib/db";
import React from "react";

interface CommunityEditProps {
  params: Promise<{ id: string }>;
}
export default async function CategoryEdit({ params }: CommunityEditProps) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    return <div>Category not found</div>;
  }
  return (
    <div>
      <CategoryForm actionType="update" category={category} />
    </div>
  );
}

"use server";
import prisma from "@/lib/db";

import { revalidatePath } from "next/cache";
import { categorySchema, communitySchema } from "@/lib/validations";
import { auth } from "@/lib/auth";

export async function createCategory(input: { name: string }) {
  const { name } = categorySchema.parse(input);

  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return {
      error: "Unauthorized",
      status: 401,
    };
  }

  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    revalidatePath("/dashboard", "layout");
    return newCategory;
  } catch (error) {
    console.log(error);
  }
}

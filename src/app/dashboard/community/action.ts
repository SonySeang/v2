'use server'
import prisma from "@/lib/db";

import { revalidatePath } from "next/cache";
import { communitySchema } from "@/lib/validations";
import { auth } from "@/lib/auth";


export async function createCommunity(input: {
  name: string;
  categoryid: string;
}) {
  const { name, categoryId } = communitySchema.parse(input);

  const session = await auth();
  if (!session?.user) {
    return {
      error: "Unauthorized",
      status: 401,
    };
  }

  try {
    const newCommunity = await prisma.community.create({
      data: {
        name,
        category: {
          connect: {
            id: categoryId,
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    revalidatePath("/dashboard", "layout");
    return newCommunity;
  } catch (error) {
    console.log(error);
  }
}

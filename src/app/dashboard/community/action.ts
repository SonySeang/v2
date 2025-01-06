import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { communitySchema } from "@/lib/validations";

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
        User: {
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

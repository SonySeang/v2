import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create Category data
  const techCategory = await prisma.category.create({
    data: {
      name: "Technology",
    },
  });

  const scienceCategory = await prisma.category.create({
    data: {
      name: "Science",
    },
  });

  // Create Community data
  const community1 = await prisma.community.create({
    data: {
      name: "Tech Community",
      categoryId: techCategory.id,
    },
  });

  const community2 = await prisma.community.create({
    data: {
      name: "Science Community",
      categoryId: scienceCategory.id,
    },
  });

  // Create User data
  const hashedpassword = await bcrypt.hash("example", 10);
  const userData = {
    email: "example@gmail.com",
    hashedpassword : hashedpassword,
    name: "example",
    posts: {
      create: [
        {
          title: "Ai",
          content: "Ai is the future",
        },
        {
          title: "ML",
          content: "ML is the future",
        },
      ],
    },
  };

  await prisma.user.create({
    data: userData,
  });
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
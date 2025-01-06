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

  // Create User data
  const hashedpassword = await bcrypt.hash("example", 10);
  const user = await prisma.user.create({
    data: {
      email: "example@gmail.com",
      hashedpassword: hashedpassword,
      name: "example",
    },
  });

  // Create Community data
  const community1 = await prisma.community.create({
    data: {
      name: "Tech Community",
      categoryId: techCategory.id,
      userId: user.id, // Associate with the created user
    },
  });

  const community2 = await prisma.community.create({
    data: {
      name: "Science Community",
      categoryId: scienceCategory.id,
      userId: user.id, // Associate with the created user
    },
  });

  // Create Posts data
  await prisma.post.createMany({
    data: [
      {
        title: "Ai",
        content: "Ai is the future",
        communityId: community1.id, // Associate with Tech Community
        userId: user.id, // Associate with the created user
      },
      {
        title: "ML",
        content: "ML is the future",
        communityId: community2.id, // Associate with Science Community
        userId: user.id, // Associate with the created user
      },
    ],
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

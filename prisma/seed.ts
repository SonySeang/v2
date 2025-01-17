import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create User data
  const hashedPassword = await bcrypt.hash("example", 10);
  const user = await prisma.user.create({
    data: {
      email: "example@gmail.com",
      hashedpassword: hashedPassword,
    },
  });

  // Create Category data
  const techCategory = await prisma.category.create({
    data: {
      name: "Technology",
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  const scienceCategory = await prisma.category.create({
    data: {
      name: "Science",
      user: {
        connect: {
          id: user.id,
        },
      },
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

  console.log({ user, techCategory, scienceCategory, community1, community2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

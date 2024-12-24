import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("started seeding");

  // Create Community data
  const community1 = await prisma.community.create({
    data: {
      name: "Tech Community",
      Category: {
        create: {
          name: "Technology",
        },
      },
    },
  });

  const community2 = await prisma.community.create({
    data: {
      name: "Science Community",
      Category: {
        create: {
          name: "Science",
        },
      },
    },
  });

  // Create User data
  const hashedpassword = await bcrypt.hash("example", 10);
  const userData: Prisma.UserCreateInput = {
    email: "example@gmail.com",
    hashedpassword: hashedpassword,
    name: "example",
    posts: {
      create: [
        {
          title: "Ai",
          content: "Ai is the future",
          communityId: community1.id,
        },
        {
          title: "ML",
          content: "ML is the future",
          communityId: community1.id,
        },
        {
          title: "DL",
          content: "DL is the future",
          communityId: community2.id,
        },
      ],
    },
  };

  await prisma.user.create({
    data: userData,
  });

  console.log("finished seeding");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

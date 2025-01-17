import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.post.deleteMany({});
  await prisma.community.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // Create User data
  const hashedPassword = await bcrypt.hash("example", 10);
  const hashedPasswordAdmin = await bcrypt.hash("admin", 10);
  const user1 = await prisma.user.create({
    data: {
      email: "example1@gmail.com",
      hashedpassword: hashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      hashedpassword: hashedPasswordAdmin,
      role: "admin",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "example3@gmail.com",
      hashedpassword: hashedPassword,
    },
  });

  // Create Category data
  const techCategory = await prisma.category.create({
    data: {
      name: "Technology",
      userId: user1.id,
    },
  });

  const scienceCategory = await prisma.category.create({
    data: {
      name: "Science",
      userId: user2.id,
    },
  });

  const artCategory = await prisma.category.create({
    data: {
      name: "Art",
      userId: user3.id,
    },
  });

  // Create Community data
  const community1 = await prisma.community.create({
    data: {
      name: "Tech Community",
      categoryId: techCategory.id,
      userId: user1.id,
    },
  });

  const community2 = await prisma.community.create({
    data: {
      name: "Science Community",
      categoryId: scienceCategory.id,
      userId: user2.id,
    },
  });

  const community3 = await prisma.community.create({
    data: {
      name: "Art Community",
      categoryId: artCategory.id,
      userId: user3.id,
    },
  });

  // Create Post data
  const post1 = await prisma.post.create({
    data: {
      title: "The Future of AI",
      content:
        "Artificial Intelligence (AI) is rapidly evolving and transforming various industries...",
      communityId: community1.id,
      userId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Quantum Computing Breakthroughs",
      content:
        "Quantum computing is set to revolutionize the field of computing with its unparalleled processing power...",
      communityId: community2.id,
      userId: user2.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: "The Renaissance of Digital Art",
      content:
        "Digital art is experiencing a renaissance with the advent of new technologies and platforms...",
      communityId: community3.id,
      userId: user3.id,
    },
  });

  const post4 = await prisma.post.create({
    data: {
      title: "Blockchain Technology in Finance",
      content:
        "Blockchain technology is revolutionizing the finance industry by providing secure and transparent transactions...",
      communityId: community1.id,
      userId: user1.id,
    },
  });

  const post5 = await prisma.post.create({
    data: {
      title: "Advancements in Renewable Energy",
      content:
        "Renewable energy sources are becoming more efficient and cost-effective, paving the way for a sustainable future...",
      communityId: community2.id,
      userId: user2.id,
    },
  });

  const post6 = await prisma.post.create({
    data: {
      title: "Exploring Abstract Art",
      content:
        "Abstract art challenges traditional notions of representation and encourages viewers to interpret meaning in new ways...",
      communityId: community3.id,
      userId: user3.id,
    },
  });

  console.log({
    user1,
    user2,
    user3,
    techCategory,
    scienceCategory,
    artCategory,
    community1,
    community2,
    community3,
    post1,
    post2,
    post3,
    post4,
    post5,
    post6,
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

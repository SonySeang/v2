import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.community.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // Create User data
  const hashedPassword = await bcrypt.hash("example", 10);
  const hashedPasswordAdmin = await bcrypt.hash("admin", 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "example1@gmail.com",
        hashedpassword: hashedPassword,
        hasAcess: false,
      },
    }),
    prisma.user.create({
      data: {
        email: "admin@gmail.com",
        hashedpassword: hashedPasswordAdmin,
        role: "admin",
        hasAcess: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "example3@gmail.com",
        hashedpassword: hashedPassword,
        hasAcess: false,
      },
    }),
    prisma.user.create({
      data: {
        email: "researcher1@gmail.com",
        hashedpassword: hashedPassword,
        role: "researcher",
        hasAcess: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "researcher2@gmail.com",
        hashedpassword: hashedPassword,
        role: "researcher",
        hasAcess: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "analyst@gmail.com",
        hashedpassword: hashedPassword,
        hasAcess: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "developer1@gmail.com",
        hashedpassword: hashedPassword,
        hasAcess: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "developer2@gmail.com",
        hashedpassword: hashedPassword,
        hasAcess: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "scientist@gmail.com",
        hashedpassword: hashedPassword,
        hasAcess: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "artist@gmail.com",
        hashedpassword: hashedPassword,
        hasAcess: true,
      },
    }),
  ]);

  // Create Category data
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Technology",
        userId: users[0].id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Science",
        userId: users[1].id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Art",
        userId: users[2].id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Healthcare",
        userId: users[3].id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Education",
        userId: users[4].id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Finance",
        userId: users[5].id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Environment",
        userId: users[6].id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Physics",
        userId: users[7].id,
      },
    }),
    prisma.category.create({
      data: {
        name: "AI and Robotics",
        userId: users[8].id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Design",
        userId: users[9].id,
      },
    }),
  ]);

  // Create Community data
  const communities = await Promise.all([
    prisma.community.create({
      data: {
        name: "Tech Community",
        categoryId: categories[0].id,
        userId: users[0].id,
      },
    }),
    prisma.community.create({
      data: {
        name: "Science Community",
        categoryId: categories[1].id,
        userId: users[1].id,
      },
    }),
    prisma.community.create({
      data: {
        name: "Art Community",
        categoryId: categories[2].id,
        userId: users[2].id,
      },
    }),
    prisma.community.create({
      data: {
        name: "Healthcare Innovations",
        categoryId: categories[3].id,
        userId: users[3].id,
      },
    }),
    prisma.community.create({
      data: {
        name: "Education Reform",
        categoryId: categories[4].id,
        userId: users[4].id,
      },
    }),
    prisma.community.create({
      data: {
        name: "Financial Literacy",
        categoryId: categories[5].id,
        userId: users[5].id,
      },
    }),
    prisma.community.create({
      data: {
        name: "Climate Action",
        categoryId: categories[6].id,
        userId: users[6].id,
      },
    }),
    prisma.community.create({
      data: {
        name: "Quantum Mechanics",
        categoryId: categories[7].id,
        userId: users[7].id,
      },
    }),
    prisma.community.create({
      data: {
        name: "AI Revolution",
        categoryId: categories[8].id,
        userId: users[8].id,
      },
    }),
    prisma.community.create({
      data: {
        name: "Creative Design",
        categoryId: categories[9].id,
        userId: users[9].id,
      },
    }),
  ]);

  // Create Post data
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: "The Future of AI",
        content:
          "Artificial Intelligence (AI) is rapidly evolving and transforming various industries...",
        communityId: communities[0].id,
        userId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Quantum Computing Breakthroughs",
        content:
          "Quantum computing is set to revolutionize the field of computing with its unparalleled processing power...",
        communityId: communities[1].id,
        userId: users[1].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "The Renaissance of Digital Art",
        content:
          "Digital art is experiencing a renaissance with the advent of new technologies and platforms...",
        communityId: communities[2].id,
        userId: users[2].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Advancements in Personalized Medicine",
        content:
          "Personalized medicine is transforming healthcare by tailoring treatments to individual genetic profiles...",
        communityId: communities[3].id,
        userId: users[3].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Innovative Teaching Methods",
        content:
          "Modern teaching methods like gamification and blended learning are revolutionizing education...",
        communityId: communities[4].id,
        userId: users[4].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "The Rise of Fintech",
        content:
          "Fintech is bridging the gap between technology and finance to provide innovative solutions...",
        communityId: communities[5].id,
        userId: users[5].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Climate Change Mitigation Strategies",
        content:
          "Climate change mitigation involves efforts to reduce or prevent the emission of greenhouse gases...",
        communityId: communities[6].id,
        userId: users[6].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Exploring Quantum Mechanics",
        content:
          "Quantum mechanics is a fundamental theory in physics that describes nature at the smallest scales...",
        communityId: communities[7].id,
        userId: users[7].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "AI and Robotics in Modern Industry",
        content:
          "AI and robotics are revolutionizing modern industry by automating tasks and improving efficiency...",
        communityId: communities[8].id,
        userId: users[8].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Innovative Design Trends",
        content:
          "The latest design trends are pushing the boundaries of creativity and functionality...",
        communityId: communities[9].id,
        userId: users[9].id,
      },
    }),
  ]);

  console.log({
    users,
    categories,
    communities,
    posts,
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

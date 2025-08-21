import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      {
        title: "First Task",
        description: "This is the first seeded task",
        completed: false,
      },
      {
        title: "Second Task",
        description: "This is the second seeded task",
        completed: true,
      },
      {
        title: "Third Task",
        description: "This is the third seeded task",
        completed: false,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("✅ Database seeded!");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   // Clear existing data
//   await prisma.task.deleteMany();

//   // Insert new seed data
//   await prisma.task.createMany({
//     data: [
//       {
//         title: "First Task",
//         description: "This is the first seeded task",
//         completed: false
//       },
//       {
//         title: "Second Task",
//         description: "This is the second seeded task",
//         completed: true
//       },
//       {
//         title: "Third Task",
//         description: "This is the third seeded task",
//         completed: false
//       }
//     ]
//   });

//   console.log("✅ Database seeded successfully!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

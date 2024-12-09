import { PrismaClient } from "@prisma/client";
import { likes } from "./like";
import { posts } from "./post";
import { users } from "./user";

export const prisma = new PrismaClient();

const main = async () => {
  console.log(`Start seeding ...`);
  // まとめて投入
  await prisma.$transaction([...users(), ...posts(), ...likes()]);
  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

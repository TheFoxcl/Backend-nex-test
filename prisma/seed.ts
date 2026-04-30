import { PrismaClient } from '@prisma/client';
import booksData from './books.json';

const prisma = new PrismaClient();

const USERS = [
  { name: 'Camilo', email: 'camilo@dev.com' },
  { name: 'Admin', email: 'admin@library.com' },
];

async function main() {
  await prisma.reservation.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Insertando usuarios...');
  for (const u of USERS) {
    await prisma.user.create({ data: u });
  }

  await prisma.book.createMany({
    data: booksData,
    skipDuplicates: true,
  });

  console.log('Seed finalizado 🚀');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

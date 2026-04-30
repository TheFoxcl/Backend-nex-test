"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const books_json_1 = __importDefault(require("./books.json"));
const prisma = new client_1.PrismaClient();
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
        data: books_json_1.default,
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
//# sourceMappingURL=seed.js.map
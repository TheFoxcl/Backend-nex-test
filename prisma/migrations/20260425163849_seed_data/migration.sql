/*
  Warnings:

  - You are about to drop the column `endDate` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `returnedAt` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "endDate",
DROP COLUMN "isActive",
DROP COLUMN "returnedAt",
ADD COLUMN     "returnDate" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Disponible';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;

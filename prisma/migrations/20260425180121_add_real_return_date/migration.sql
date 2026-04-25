/*
  Warnings:

  - Made the column `returnDate` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "realReturnDate" TIMESTAMP(3),
ALTER COLUMN "returnDate" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVA';

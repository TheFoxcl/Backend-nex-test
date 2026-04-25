/*
  Warnings:

  - You are about to drop the column `startDate` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "startDate",
ADD COLUMN     "reservationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

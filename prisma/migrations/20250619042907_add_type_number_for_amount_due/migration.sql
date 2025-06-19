/*
  Warnings:

  - The `amountDue` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `amountDue` column on the `Reminder` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "amountDue",
ADD COLUMN     "amountDue" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "amountDue",
ADD COLUMN     "amountDue" DOUBLE PRECISION;

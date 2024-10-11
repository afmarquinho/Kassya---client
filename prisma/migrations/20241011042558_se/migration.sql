/*
  Warnings:

  - You are about to drop the column `Sale_consecutiveId` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the `SaleConsecutive` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Sale_code]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SaleConsecutive" DROP CONSTRAINT "SaleConsecutive_Consecutive_SaleId_fkey";

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "Sale_consecutiveId",
ADD COLUMN     "Sale_code" TEXT;

-- DropTable
DROP TABLE "SaleConsecutive";

-- CreateIndex
CREATE UNIQUE INDEX "Sale_Sale_code_key" ON "Sale"("Sale_code");

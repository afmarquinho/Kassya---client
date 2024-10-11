/*
  Warnings:

  - You are about to drop the column `Warranty_productId` on the `Warranty` table. All the data in the column will be lost.
  - You are about to drop the column `Warranty_saleId` on the `Warranty` table. All the data in the column will be lost.
  - Added the required column `Warranty_saleDetailId` to the `Warranty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Warranty" DROP CONSTRAINT "Warranty_Warranty_productId_fkey";

-- DropForeignKey
ALTER TABLE "Warranty" DROP CONSTRAINT "Warranty_Warranty_saleId_fkey";

-- AlterTable
ALTER TABLE "Warranty" DROP COLUMN "Warranty_productId",
DROP COLUMN "Warranty_saleId",
ADD COLUMN     "Warranty_saleDetailId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_Warranty_saleDetailId_fkey" FOREIGN KEY ("Warranty_saleDetailId") REFERENCES "SaleDetails"("SaleDetail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

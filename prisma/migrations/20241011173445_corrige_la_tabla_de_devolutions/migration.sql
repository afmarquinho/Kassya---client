/*
  Warnings:

  - You are about to drop the column `Dev_productId` on the `Devolution` table. All the data in the column will be lost.
  - You are about to drop the column `Dev_saleId` on the `Devolution` table. All the data in the column will be lost.
  - You are about to drop the column `Dev_supplierId` on the `Devolution` table. All the data in the column will be lost.
  - Added the required column `Dev_saleDetailsId` to the `Devolution` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Devolution" DROP CONSTRAINT "Devolution_Dev_productId_fkey";

-- DropForeignKey
ALTER TABLE "Devolution" DROP CONSTRAINT "Devolution_Dev_saleId_fkey";

-- DropForeignKey
ALTER TABLE "Devolution" DROP CONSTRAINT "Devolution_Dev_supplierId_fkey";

-- AlterTable
ALTER TABLE "Devolution" DROP COLUMN "Dev_productId",
DROP COLUMN "Dev_saleId",
DROP COLUMN "Dev_supplierId",
ADD COLUMN     "Dev_saleDetailsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Devolution" ADD CONSTRAINT "Devolution_Dev_saleDetailsId_fkey" FOREIGN KEY ("Dev_saleDetailsId") REFERENCES "SaleDetails"("SaleDetail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

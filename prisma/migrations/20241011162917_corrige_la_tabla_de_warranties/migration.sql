/*
  Warnings:

  - You are about to drop the column `Warranty_customerId` on the `Warranty` table. All the data in the column will be lost.
  - You are about to drop the column `Warranty_supplierId` on the `Warranty` table. All the data in the column will be lost.
  - Added the required column `Warranty_productId` to the `Warranty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Warranty" DROP CONSTRAINT "Warranty_Warranty_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Warranty" DROP CONSTRAINT "Warranty_Warranty_supplierId_fkey";

-- AlterTable
ALTER TABLE "Warranty" DROP COLUMN "Warranty_customerId",
DROP COLUMN "Warranty_supplierId",
ADD COLUMN     "Warranty_productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_Warranty_productId_fkey" FOREIGN KEY ("Warranty_productId") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

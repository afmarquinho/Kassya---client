/*
  Warnings:

  - You are about to drop the `PurchaseProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Product_purchaseId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Purchase_description` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PurchaseProduct" DROP CONSTRAINT "PurchaseProduct_Product_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseProduct" DROP CONSTRAINT "PurchaseProduct_Purchase_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Product_purchaseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "Purchase_description" TEXT NOT NULL;

-- DropTable
DROP TABLE "PurchaseProduct";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Product_purchaseId_fkey" FOREIGN KEY ("Product_purchaseId") REFERENCES "Purchase"("Purchase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

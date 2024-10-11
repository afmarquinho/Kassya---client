/*
  Warnings:

  - The primary key for the `ExpenseSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ExpSummary_date` on the `ExpenseSummary` table. All the data in the column will be lost.
  - You are about to drop the column `ExpSummary_id` on the `ExpenseSummary` table. All the data in the column will be lost.
  - You are about to drop the column `ExpSummary_purchaseId` on the `ExpenseSummary` table. All the data in the column will be lost.
  - You are about to drop the column `ExpSummary_totalExpenses` on the `ExpenseSummary` table. All the data in the column will be lost.
  - You are about to drop the column `Product_descripcion` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ExpSumm_purchaseId]` on the table `ExpenseSummary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ExpSumm_date` to the `ExpenseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ExpSumm_purchaseId` to the `ExpenseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ExpSumm_totalExpenses` to the `ExpenseSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Product_description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Purchase_dueDate` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Purchase_paymentMethod` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- CreateEnum
CREATE TYPE "Location" AS ENUM ('UNRECEIVED', 'WAREHOUSE');

-- DropForeignKey
ALTER TABLE "ExpenseSummary" DROP CONSTRAINT "ExpenseSummary_ExpSummary_purchaseId_fkey";

-- DropIndex
DROP INDEX "ExpenseSummary_ExpSummary_purchaseId_key";

-- DropIndex
DROP INDEX "SalesProduct_SalesProd_productId_key";

-- AlterTable
ALTER TABLE "ExpenseSummary" DROP CONSTRAINT "ExpenseSummary_pkey",
DROP COLUMN "ExpSummary_date",
DROP COLUMN "ExpSummary_id",
DROP COLUMN "ExpSummary_purchaseId",
DROP COLUMN "ExpSummary_totalExpenses",
ADD COLUMN     "ExpSumm_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ExpSumm_id" SERIAL NOT NULL,
ADD COLUMN     "ExpSumm_purchaseId" INTEGER NOT NULL,
ADD COLUMN     "ExpSumm_totalExpenses" DECIMAL(65,30) NOT NULL,
ADD CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("ExpSumm_id");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Product_descripcion",
ADD COLUMN     "Product_description" TEXT NOT NULL,
ADD COLUMN     "Product_location" "Location" NOT NULL DEFAULT 'UNRECEIVED';

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "Purchase_dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Purchase_paymentMethod" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "User_role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "PurchaseProduct" (
    "PurchaseProduct_id" SERIAL NOT NULL,
    "Purchase_id" INTEGER NOT NULL,
    "Product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCost" DECIMAL(65,30) NOT NULL,
    "totalCost" DECIMAL(65,30) NOT NULL,
    "productRef" TEXT NOT NULL,

    CONSTRAINT "PurchaseProduct_pkey" PRIMARY KEY ("PurchaseProduct_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseProduct_Purchase_id_key" ON "PurchaseProduct"("Purchase_id");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseSummary_ExpSumm_purchaseId_key" ON "ExpenseSummary"("ExpSumm_purchaseId");

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_Purchase_id_fkey" FOREIGN KEY ("Purchase_id") REFERENCES "Purchase"("Purchase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseProduct" ADD CONSTRAINT "PurchaseProduct_Product_id_fkey" FOREIGN KEY ("Product_id") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseSummary" ADD CONSTRAINT "ExpenseSummary_ExpSumm_purchaseId_fkey" FOREIGN KEY ("ExpSumm_purchaseId") REFERENCES "Purchase"("Purchase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

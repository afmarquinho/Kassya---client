/*
  Warnings:

  - You are about to alter the column `ExpSummary_totalExpenses` on the `ExpenseSummary` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `Purchase_totalAmount` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - The primary key for the `SalesSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Salsummary_date` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the column `Salsummary_id` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the column `Salsummary_saleId` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the column `Salsummary_totalAmount` on the `SalesSummary` table. All the data in the column will be lost.
  - You are about to drop the column `Warranty_SaleId` on the `Warranty` table. All the data in the column will be lost.
  - You are about to drop the `DevolutionProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesProdcut` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TotalDevolution` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ExpSummary_purchaseId]` on the table `ExpenseSummary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Consecutive_SaleId]` on the table `SaleConsecutive` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[SalesSumm_saleId]` on the table `SalesSummary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Product_availability` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Product_cost` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Consecutive_SaleId` to the `SaleConsecutive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SalesSumm_date` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SalesSumm_saleId` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SalesSumm_totalAmount` to the `SalesSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Warranty_saleId` to the `Warranty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Warranty_supplierId` to the `Warranty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpenseSummary" ALTER COLUMN "ExpSummary_totalExpenses" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Product_availability" BOOLEAN NOT NULL,
ADD COLUMN     "Product_cost" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "Purchase_totalAmount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "SaleConsecutive" ADD COLUMN     "Consecutive_SaleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SalesSummary" DROP CONSTRAINT "SalesSummary_pkey",
DROP COLUMN "Salsummary_date",
DROP COLUMN "Salsummary_id",
DROP COLUMN "Salsummary_saleId",
DROP COLUMN "Salsummary_totalAmount",
ADD COLUMN     "SalesSumm_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "SalesSumm_id" SERIAL NOT NULL,
ADD COLUMN     "SalesSumm_saleId" INTEGER NOT NULL,
ADD COLUMN     "SalesSumm_totalAmount" DECIMAL(65,30) NOT NULL,
ADD CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("SalesSumm_id");

-- AlterTable
ALTER TABLE "Warranty" DROP COLUMN "Warranty_SaleId",
ADD COLUMN     "Warranty_saleId" INTEGER NOT NULL,
ADD COLUMN     "Warranty_supplierId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "DevolutionProduct";

-- DropTable
DROP TABLE "SalesProdcut";

-- DropTable
DROP TABLE "TotalDevolution";

-- CreateTable
CREATE TABLE "SalesProduct" (
    "SalesProd_id" SERIAL NOT NULL,
    "SalesProd_saleId" INTEGER NOT NULL,
    "SalesProd_productId" INTEGER NOT NULL,
    "SalesProd_quantity" INTEGER NOT NULL,
    "SalesProd_unitPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SalesProduct_pkey" PRIMARY KEY ("SalesProd_id")
);

-- CreateTable
CREATE TABLE "Devolution" (
    "Dev_id" SERIAL NOT NULL,
    "Dev_productId" INTEGER NOT NULL,
    "Dev_description" TEXT NOT NULL,
    "Dev_saleId" INTEGER NOT NULL,
    "Dev_quantity" INTEGER NOT NULL,
    "Dev_unitPrice" DECIMAL(65,30) NOT NULL,
    "Dev_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Dev_supplierId" INTEGER NOT NULL,

    CONSTRAINT "Devolution_pkey" PRIMARY KEY ("Dev_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SalesProduct_SalesProd_productId_key" ON "SalesProduct"("SalesProd_productId");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseSummary_ExpSummary_purchaseId_key" ON "ExpenseSummary"("ExpSummary_purchaseId");

-- CreateIndex
CREATE UNIQUE INDEX "SaleConsecutive_Consecutive_SaleId_key" ON "SaleConsecutive"("Consecutive_SaleId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesSummary_SalesSumm_saleId_key" ON "SalesSummary"("SalesSumm_saleId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_Product_supplierId_fkey" FOREIGN KEY ("Product_supplierId") REFERENCES "Supplier"("Supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_Sale_customer_id_fkey" FOREIGN KEY ("Sale_customer_id") REFERENCES "Customer"("Customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_Sale_userId_fkey" FOREIGN KEY ("Sale_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleConsecutive" ADD CONSTRAINT "SaleConsecutive_Consecutive_SaleId_fkey" FOREIGN KEY ("Consecutive_SaleId") REFERENCES "Sale"("Sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesProduct" ADD CONSTRAINT "SalesProduct_SalesProd_saleId_fkey" FOREIGN KEY ("SalesProd_saleId") REFERENCES "Sale"("Sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesProduct" ADD CONSTRAINT "SalesProduct_SalesProd_productId_fkey" FOREIGN KEY ("SalesProd_productId") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_Purchase_userId_fkey" FOREIGN KEY ("Purchase_userId") REFERENCES "User"("User_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_Purchase_supplierId_fkey" FOREIGN KEY ("Purchase_supplierId") REFERENCES "Supplier"("Supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_Warranty_saleId_fkey" FOREIGN KEY ("Warranty_saleId") REFERENCES "Sale"("Sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_Warranty_customerId_fkey" FOREIGN KEY ("Warranty_customerId") REFERENCES "Customer"("Customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_Warranty_supplierId_fkey" FOREIGN KEY ("Warranty_supplierId") REFERENCES "Supplier"("Supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesSummary" ADD CONSTRAINT "SalesSummary_SalesSumm_saleId_fkey" FOREIGN KEY ("SalesSumm_saleId") REFERENCES "Sale"("Sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseSummary" ADD CONSTRAINT "ExpenseSummary_ExpSummary_purchaseId_fkey" FOREIGN KEY ("ExpSummary_purchaseId") REFERENCES "Purchase"("Purchase_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devolution" ADD CONSTRAINT "Devolution_Dev_saleId_fkey" FOREIGN KEY ("Dev_saleId") REFERENCES "Sale"("Sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devolution" ADD CONSTRAINT "Devolution_Dev_productId_fkey" FOREIGN KEY ("Dev_productId") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devolution" ADD CONSTRAINT "Devolution_Dev_supplierId_fkey" FOREIGN KEY ("Dev_supplierId") REFERENCES "Supplier"("Supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `SalesProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SalesProduct" DROP CONSTRAINT "SalesProduct_SalesProd_productId_fkey";

-- DropForeignKey
ALTER TABLE "SalesProduct" DROP CONSTRAINT "SalesProduct_SalesProd_saleId_fkey";

-- DropTable
DROP TABLE "SalesProduct";

-- CreateTable
CREATE TABLE "SaleDetails" (
    "SaleDetail_id" SERIAL NOT NULL,
    "SaleDetail_saleId" INTEGER NOT NULL,
    "SaleDetail_productId" INTEGER NOT NULL,
    "SaleDetail_quantity" INTEGER NOT NULL,
    "SaleDetail_unitPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SaleDetails_pkey" PRIMARY KEY ("SaleDetail_id")
);

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_SaleDetail_saleId_fkey" FOREIGN KEY ("SaleDetail_saleId") REFERENCES "Sale"("Sale_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_SaleDetail_productId_fkey" FOREIGN KEY ("SaleDetail_productId") REFERENCES "Product"("Product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `SaleDetail_total` to the `SaleDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleDetails" ADD COLUMN     "SaleDetail_total" DECIMAL(65,30) NOT NULL;

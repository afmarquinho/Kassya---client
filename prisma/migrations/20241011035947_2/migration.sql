/*
  Warnings:

  - You are about to drop the column `Product_supplierId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_Product_supplierId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Product_supplierId";

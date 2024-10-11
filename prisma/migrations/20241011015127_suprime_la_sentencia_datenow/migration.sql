-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "Customer_registrationDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Devolution" ALTER COLUMN "Dev_date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "Purchase_date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "Sale_date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Supplier" ALTER COLUMN "Supplier_registrationDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "User_registrationDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Warranty" ALTER COLUMN "Warranty_date" DROP DEFAULT;

-- CreateTable
CREATE TABLE "User" (
    "User_id" SERIAL NOT NULL,
    "User_dni" INTEGER NOT NULL,
    "User_name" TEXT NOT NULL,
    "User_surname" TEXT NOT NULL,
    "User_email" TEXT NOT NULL,
    "User_password" TEXT NOT NULL,
    "User_phoneNumber" TEXT NOT NULL,
    "User_address" TEXT NOT NULL,
    "User_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("User_id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "Customer_id" SERIAL NOT NULL,
    "Customer_dni" INTEGER NOT NULL,
    "Customer_name" TEXT NOT NULL,
    "Customer_surname" TEXT NOT NULL,
    "Customer_email" TEXT NOT NULL,
    "Customer_phoneNumber" TEXT NOT NULL,
    "Customer_address" TEXT NOT NULL,
    "Customer_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("Customer_id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "Supplier_id" SERIAL NOT NULL,
    "Supplier_nit" INTEGER NOT NULL,
    "Supplier_name" TEXT NOT NULL,
    "Supplier_contactInfo" TEXT NOT NULL,
    "Supplier_email" TEXT NOT NULL,
    "Supplier_phoneNumber" TEXT NOT NULL,
    "Supplier_city" TEXT NOT NULL,
    "Supplier_address" TEXT NOT NULL,
    "Supplier_registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("Supplier_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "Product_id" SERIAL NOT NULL,
    "Product_ref" TEXT NOT NULL,
    "Product_name" TEXT NOT NULL,
    "Product_descripcion" TEXT NOT NULL,
    "Product_price" DECIMAL(65,30) NOT NULL,
    "Product_stockQty" INTEGER NOT NULL,
    "Product_supplierId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("Product_id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "Sale_id" SERIAL NOT NULL,
    "Sale_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Sale_consecutiveId" INTEGER NOT NULL,
    "Sale_customer_id" INTEGER NOT NULL,
    "Sale_totalAmount" DECIMAL(65,30) NOT NULL,
    "Sale_userId" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("Sale_id")
);

-- CreateTable
CREATE TABLE "SaleConsecutive" (
    "Consecutive_id" SERIAL NOT NULL,
    "Consecutive_code" TEXT NOT NULL,

    CONSTRAINT "SaleConsecutive_pkey" PRIMARY KEY ("Consecutive_id")
);

-- CreateTable
CREATE TABLE "SalesProdcut" (
    "Sproduct_id" SERIAL NOT NULL,
    "Sproduct_saleId" INTEGER NOT NULL,
    "Sproduct_productId" INTEGER NOT NULL,
    "Sproduct_quantity" INTEGER NOT NULL,
    "Sproduct_unitPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SalesProdcut_pkey" PRIMARY KEY ("Sproduct_id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "Purchase_id" SERIAL NOT NULL,
    "Purchase_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Purchase_totalAmount" DOUBLE PRECISION NOT NULL,
    "Purchase_userId" INTEGER NOT NULL,
    "Purchase_supplierId" INTEGER NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("Purchase_id")
);

-- CreateTable
CREATE TABLE "Warranty" (
    "Warranty_id" SERIAL NOT NULL,
    "Warranty_description" TEXT NOT NULL,
    "Warranty_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Warranty_SaleId" INTEGER NOT NULL,
    "Warranty_customerId" INTEGER NOT NULL,

    CONSTRAINT "Warranty_pkey" PRIMARY KEY ("Warranty_id")
);

-- CreateTable
CREATE TABLE "SalesSummary" (
    "Salsummary_id" SERIAL NOT NULL,
    "Salsummary_saleId" INTEGER NOT NULL,
    "Salsummary_totalAmount" DECIMAL(65,30) NOT NULL,
    "Salsummary_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("Salsummary_id")
);

-- CreateTable
CREATE TABLE "ExpenseSummary" (
    "ExpSummary_id" SERIAL NOT NULL,
    "ExpSummary_purchaseId" INTEGER NOT NULL,
    "ExpSummary_totalExpenses" DOUBLE PRECISION NOT NULL,
    "ExpSummary_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("ExpSummary_id")
);

-- CreateTable
CREATE TABLE "TotalDevolution" (
    "Dev_id" SERIAL NOT NULL,
    "Dev_totalAmount" DOUBLE PRECISION NOT NULL,
    "Dev_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Dev_saleId" INTEGER NOT NULL,
    "Dev_DevolutionProductId" INTEGER NOT NULL,

    CONSTRAINT "TotalDevolution_pkey" PRIMARY KEY ("Dev_id")
);

-- CreateTable
CREATE TABLE "DevolutionProduct" (
    "DevProduct_id" SERIAL NOT NULL,
    "DevProduct_productId" INTEGER NOT NULL,
    "DevProduct_saleId" INTEGER NOT NULL,
    "DevProduct_quantity" INTEGER NOT NULL,
    "DevProduct_unitPrice" DOUBLE PRECISION NOT NULL,
    "DevProduct_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DevProduct_supplierId" INTEGER NOT NULL,

    CONSTRAINT "DevolutionProduct_pkey" PRIMARY KEY ("DevProduct_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_User_dni_key" ON "User"("User_dni");

-- CreateIndex
CREATE UNIQUE INDEX "User_User_email_key" ON "User"("User_email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Customer_dni_key" ON "Customer"("Customer_dni");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Customer_email_key" ON "Customer"("Customer_email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_Supplier_nit_key" ON "Supplier"("Supplier_nit");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_Supplier_email_key" ON "Supplier"("Supplier_email");

-- CreateIndex
CREATE UNIQUE INDEX "SaleConsecutive_Consecutive_code_key" ON "SaleConsecutive"("Consecutive_code");

import { PrismaClient } from "@prisma/client";

import { customers } from "./data/customers";
import { products } from "./data/products";
import { purchases } from "./data/purchases";
import { saleDetails } from "./data/saleDetails";
import { sales } from "./data/sales";
import { suppliers } from "./data/suppliers";
import { users } from "./data/users";
import { warranties } from "./data/warranties";
import { devolutions } from "./data/devolutions";

//metodo para adicionar la columna de total
const newSaleDetails = saleDetails.map(saleDetail => ({
  ...saleDetail,
  SaleDetail_total: saleDetail.SaleDetail_quantity * saleDetail.SaleDetail_unitPrice,
}));


const prisma = new PrismaClient();

async function main() {
  try {
     await prisma.user.createMany({
         data: users,
       });
      await prisma.customer.createMany({
        data: customers,
      });

     await prisma.supplier.createMany({
        data: suppliers,
      });
      await prisma.purchase.createMany({
        data: purchases,
      });


      await prisma.product.createMany({
       data: products,
     });


     await prisma.sale.createMany({
       data: sales,
      });

      await prisma.saleDetails.createMany({
         data: newSaleDetails,
       });

      await prisma.warranty.createMany({
         data: warranties,
       });
      await prisma.devolution.createMany({
         data: devolutions,
       });

  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });

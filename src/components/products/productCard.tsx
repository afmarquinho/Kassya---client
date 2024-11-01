"use client";

import { ProductType } from "@/src/types";
import { productStore } from "@/src/utils/productStore";
import { purchaseStore } from "@/src/utils/purchaseStore";
import { Pencil, X } from "lucide-react";

type Props = {
  product: ProductType;
};
const totalFormatted = (val1: number, val2: number) => {
  return (val1 * val2).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const ProductCard = ({ product }: Props) => {
  const { purchaseDetails } = purchaseStore();
  const { toggleDeleteProductModal, setProductEdit, toggleProductModal } =
    productStore();
  const handleEdit = (product: ProductType) => {
    setProductEdit(product);
    toggleProductModal();
  };

  const handleDelete = (product: ProductType) => {
    setProductEdit(product);
    toggleDeleteProductModal();
  };

  return (
    <div
      className={`bg-white dark:bg-slate-900 shadow-lg px-5 pt-10 pb-5 w-full hover:bg-blue-200 dark:hover:bg-slate-600 relative`}
    >
      {!purchaseDetails?.Purchase_close && (
        <div className={`flex gap-5 absolute right-2 top-2`}>
          <button
            className={`flex gap-1 text-xs items-center justify-center  text-yellow-700 dark:text-white  font-bold w-20`}
            onClick={() => handleEdit(product)}
          >
            <Pencil className={`w-5`} /> Editar
          </button>
          <button
            className={`flex gap-1 text-xs items-center justify-center  text-red-500 font-bold w-20`}
            onClick={() => handleDelete(product)}
          >
            <X className={`w-5`} /> Eliminar
          </button>
        </div>
      )}

      <table className={`text-left`}>
        <tbody>
          <tr>
            <th className={`pe-24`}>Referencia</th>
            <td>{product.Product_ref}</td>
          </tr>
          <tr>
            <th>Nombre</th>
            <td className={`font-bold`}>{product.Product_name}</td>
          </tr>
          <tr>
            <th>Descripción</th>
            <td>{product.Product_description}</td>
          </tr>
          <tr>
            <th>Costo</th>
            <td>{product.Product_cost}</td>
          </tr>
          <tr>
            <th>Cantidad</th>
            <td>{product.Product_qty}</td>
          </tr>
          <tr>
            <th>TOTAL</th>
            <td className={`font-medium text-base`}>
              {totalFormatted(product.Product_cost, product.Product_qty)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

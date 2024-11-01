"use client";

import { Ban } from "lucide-react";
import { productStore } from "@/src/utils/productStore";
import { ProductForm } from "./ProductForm";


export const AddProductModal = () => {
  const { toggleProductModal, clearProductEdit } = productStore();
  const handleCancel = () => {
    toggleProductModal();
    clearProductEdit();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center`}
      >
        {" "}
        <div className="bg-white dark:bg-slate-800 p-10 w-11/12 max-w-[800px] rounded-lg shadow-lg">
          <ProductForm />
          <button
            className={`flex justify-center items-center p-2 text-white gap-1 my-1 bg-gradient-to-b from-red-600 to-red-700 rounded-md`}
            onClick={handleCancel}
          >
            <Ban className={`w-5`} />
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};


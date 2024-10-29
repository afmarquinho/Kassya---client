"use client";
import { useState } from "react";
import LoadingSpinner from "../loadingSpinner";
import { TriangleAlert, X } from "lucide-react";
import { productStore } from "@/src/utils/productStore";
import axiosClient from "@/src/axiosClient";
import { purchaseStore } from "@/src/utils/purchaseStore";

const DeleteProductModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toggleDeleteProductModal, productEdit, clearProductEdit } =
    productStore();
  const { updatePurchaseProducts } = purchaseStore();

  const handleCancel = () => {
    clearProductEdit();
    toggleDeleteProductModal();
  };

  const handleDelete = async () => {
    if (!productEdit) {
      return;
    }
    setLoading(true);
    try {
      await axiosClient.delete(`products/${productEdit.Product_id}`);
      updatePurchaseProducts(productEdit, "delete");
    } catch (error) {
      console.error("Error al eliminar el ítem: ", error);
    } finally {
      setLoading(false);
      toggleDeleteProductModal();
      clearProductEdit();
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div
          className={`fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center`}
        >
          <div className={`w-full max-w-96 bg-white dark:bg-slate-700`}>
            <div className={`relative`}>
              <TriangleAlert
                className={`absolute top-2 left-2 text-yellow-400`}
                strokeWidth={3}
              />
              <button
                className={`absolute top-2 right-2 bg-red-800 hover:bg-red-950`}
                onClick={handleCancel}
              >
                <X
                  className={`  text-yellow-400 cursor-pointer`}
                  strokeWidth={3}
                />
              </button>
              <h2
                className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 from-red-500 to-red-600`}
              >
                Alerta
              </h2>
            </div>

            <div className={`p-4`}>
              <p className={`text-center`}>
                ¿Realmente deseas eliminar este producto:{" "}
                <span className={`font-medium`}>
                  {productEdit?.Product_name}
                </span>
                ?
              </p>

              <button
                className={`flex gap-1 justify-center items-center  rounded-md px-4 py-2 text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b from-red-600 to-red-700 hover:from-red-700 hover:to-red-800`}
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DeleteProductModal;

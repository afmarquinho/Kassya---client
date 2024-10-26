"use client";
import axiosClient from "@/src/axiosClient";
import { purchaseStore } from "@/src/utils/purchaseStore";
import { TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "../loadingSpinner";
import { useRouter } from "next/navigation";

const DeletePurchaseModal = () => {
  const router = useRouter();
  const { purchaseDetails, toggleDeletePurchaseModal, deletePurchase } =
    purchaseStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!purchaseDetails) return;

    if (purchaseDetails?.Product?.length) {
      alert(
        "No puedes proceder a eliminar la compra si tiene productos asociados. Debes eliminar los productos para proceder a eliminar la compra."
      );
      return;
    }

    setLoading(true);
    try {
      await axiosClient.delete(`/purchases/${purchaseDetails?.Purchase_id}`);
      deletePurchase(purchaseDetails?.Purchase_id);
      router.back();
    } catch (error) {
     console.error("Error al eliminar la compra:", error);
    } finally {
      setLoading(false);
      toggleDeletePurchaseModal();
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
                className={`absolute top-2 right-2 "bg-red-800 hover:bg-yellow-950`}
                onClick={toggleDeletePurchaseModal}
              >
                <X
                  className={`  text-yellow-400 cursor-pointer`}
                  strokeWidth={3}
                />
              </button>
              <h2
                className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 from-slate-900 to-black`}
              >
                Alerta
              </h2>
            </div>
            <div className={`p-4`}>
              <p className={`text-center`}>
                ¿Realmente deseas eliminar la compra? <br /> Recuerda que una
                vez eliminada no la podrás visualizar{" "}
              </p>

              <button
                className={`flex gap-1 justify-center items-center  rounded-md px-4 py-2 text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b from-red-600 to-red-700 hover:from-red-700 hover:to-red-800`}
                onClick={handleDelete}
              >
                Eliminar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DeletePurchaseModal;

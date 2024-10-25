"use client";
import axiosClient from "@/src/axiosClient";
import { purchaseStore } from "@/src/utils/purchaseStore";
import { TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "../loadingSpinner";
import { useRouter } from "next/navigation";


const DeletePurchaseModal = () => {
  const router = useRouter()
  const { purchaseDetails: purchase, setDeletePurchaseModal, deletePurchase } = purchaseStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!purchase) {
      return;
    }
    try {
      setLoading(true);
      await axiosClient.delete(`/purchases/${purchase?.Purchase_id}`);
      deletePurchase(purchase?.Purchase_id);
    } catch (error) {
      console.error(error);
    }
    router.back()
    setLoading(false);
    setDeletePurchaseModal();
  };

  return (
    <>
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
              onClick={setDeletePurchaseModal}
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
              ¿Realmente deseas eliminar la compra? <br /> Recuerda que una vez
              eliminada no la podrás visualizar{" "}
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
      {loading && <LoadingSpinner />}
    </>
  );
};
export default DeletePurchaseModal;

import axiosClient from "@/src/axiosClient";
import { purchaseStore } from "@/src/utils/purchaseStore";
import { TriangleAlert, X } from "lucide-react";

const ClosePurchaseModal = () => {
  const { toggleClosePurchaseModal, purchaseDetails: purchase, closePurchase } =
    purchaseStore();
  const handleClosePurchase = async () => {
    toggleClosePurchaseModal();
    try {
      await axiosClient.put(`/purchases/${purchase?.Purchase_id}`);
      closePurchase();
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
            className={`absolute top-2 right-2 "bg-red-800 hover:bg-red-950`}
            onClick={toggleClosePurchaseModal}
          >
            <X className={`  text-yellow-400 cursor-pointer`} strokeWidth={3} />
          </button>
          <h2
            className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 from-indigo-600 to-indigo-700`}
          >
            Alerta
          </h2>
        </div>
        <div className={`p-4`}>
          <p>
            ¿Realmente deseas cerrar la compra? <br /> Recuerda que una vez cerrada ya
            no la podrás editar o actualizar{" "}
          </p>

          <button
            className={`flex gap-1 justify-center items-center  rounded-md px-4 py-2 text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b from-red-600 to-red-700 hover:from-red-700 hover:to-red-800`}
            onClick={handleClosePurchase}
          >
            Cerrar Compra
          </button>
        </div>
      </div>
    </div>
  );
};
export default ClosePurchaseModal;
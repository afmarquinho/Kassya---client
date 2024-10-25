"use client";

import { purchaseStore } from "@/src/utils/purchaseStore";
import { RefreshCcw, ShoppingCart } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "../loadingSpinner";

const GetPurchasesButton = () => {
  const { fetchPurchases, purchases } = purchaseStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchSuppliers = async () => {
    setLoading(true);
    await fetchPurchases();
    setLoading(false);
  };

  return (
    <>
      <button
        className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors ${
          loading
            ? "bg-gray-400"
            : "bg-indigo-600 hover:bg-blue-500 dark:bg-indigo-700 dark:hover:bg-blue-500"
        }`}
        onClick={handleFetchSuppliers}
        disabled={loading}
      >
        {purchases.length ? (
          <>
            <RefreshCcw className={`w-5`} /> Refrescar
          </>
        ) : (
          <>
            <ShoppingCart className={`w-5`} />
            Mostrar Compras
          </>
        )}
      </button>
      {loading && <LoadingSpinner />}
      
    </>
  );
};
export default GetPurchasesButton;

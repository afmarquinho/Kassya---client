"use client";

import { CreditCard } from "lucide-react";
import { purchaseStore } from "../../utils/purchaseStore";
import { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { supplierStore } from "@/src/utils/supplierStore";

export const NewPurchaseButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toggleEditPurchaseModal } = purchaseStore();
  const { fetchSuppliers } = supplierStore();

  const handleClick = async () => {
    setLoading(true);
    await fetchSuppliers();
    setLoading(false);

    toggleEditPurchaseModal();
  };

  const {} = purchaseStore();
  return (
    <>
      <button
        type="button"
        className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-all bg-blue-500 hover:bg-blue-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 `}
        onClick={handleClick}
      >
        <CreditCard className={`w-5`} />
        Nueva Compra
      </button>
      {loading && <LoadingSpinner />}
    </>
  );
};

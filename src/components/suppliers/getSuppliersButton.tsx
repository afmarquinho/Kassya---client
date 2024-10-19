"use client";
import { supplierStore } from "@/src/utils/supplierStore";
import { Truck } from "lucide-react";
import { useState } from "react";

const GetSuppliersButton = () => {
  const { fetchSuppliers } = supplierStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchSuppliers = async () => {
    setLoading(true);
    await fetchSuppliers();
    setLoading(false);
  };

  return (
    <button
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors ${
        loading
          ? "bg-gray-400"
          : "bg-indigo-600 hover:bg-blue-500 dark:bg-indigo-700 dark:hover:bg-blue-500"
      }`}
      onClick={handleFetchSuppliers}
      disabled={loading}
    >
      <Truck className={`w-5`} />
      Mostrar Proveedores
    </button>
  );
};
export default GetSuppliersButton;

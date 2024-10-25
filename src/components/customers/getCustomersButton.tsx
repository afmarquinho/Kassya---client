"use client";
import { customerStore } from "@/src/utils/customerStore";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "../loadingSpinner";

const GetCustomersButton = () => {
  const { fetchCustomers } = customerStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchSuppliers = async () => {
    setLoading(true);
    await fetchCustomers();
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
        <ShoppingCart className={`w-5`} />
        Mostrar Clientes
      </button>
      {loading && <LoadingSpinner />}
    </>
  );
};
export default GetCustomersButton;

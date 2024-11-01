"use client";
import { TriangleAlert, X, CirclePower } from "lucide-react";
import axiosClient from "@/src/axiosClient";
import { SupplierType } from "@/src/types";
import { supplierStore } from "@/src/utils/supplierStore";

export const ActivesupplierModal = () => {
  const { supplier, setActiveModal, setSupplier, updateSuppliers } =
    supplierStore();

  const handleActiveSupplier = async () => {
    setActiveModal();
    const supp: SupplierType | null = supplier
      ? {
          ...supplier,
          Supplier_active: !supplier?.Supplier_active,
        }
      : null;
    try {
      await axiosClient.put("/suppliers", supp);
      if (supp) {
        setSupplier(supp);
        updateSuppliers(supp, "update");
      }
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
            className={`absolute top-2 right-2 ${
              supplier?.Supplier_active
                ? "bg-red-800 hover:bg-red-950"
                : "bg-green-800 hover:bg-green-950"
            }`}
            onClick={setActiveModal}
          >
            <X className={`  text-yellow-400 cursor-pointer`} strokeWidth={3} />
          </button>
          <h2
            className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 ${
              supplier?.Supplier_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
          >
            Alerta
          </h2>
        </div>
        <div className={`p-4`}>
          <p>
            ¿Realmente deseas{" "}
            {supplier?.Supplier_active ? "Desactivar" : "Activar"} al proveedor{" "}
            <span className={`font-bold`}>{supplier?.Supplier_name}</span>
          </p>

          <button
            className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b ${
              supplier?.Supplier_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
            onClick={handleActiveSupplier}
          >
            <CirclePower className={`w-5`} />
            {supplier?.Supplier_active ? "Desactivar" : "Activar"}
          </button>
        </div>
      </div>
    </div>
  );
};


"use client";
import { purchaseStore } from "@/src/utils/purchaseStore";
import { FilePenLine, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditPurchaseModal from "./editPurchaseModal";
import { desformatearFecha } from "@/src/utils/helpers";
import { PurchasesType } from "@/src/types";
import { supplierStore } from "@/src/utils/supplierStore";
import LoadingSpinner from "../loadingSpinner";

const PurchasesTable = () => {
  const router = useRouter();
  const {
    purchases,
    fetchPurchaseDetails,
    clearPurchaseEdit,
    isEditPurchaseModalOpen,
    toggleEditPurchaseModal,
    setPurchaseEdit,
  } = purchaseStore();
  const { fetchSuppliers } = supplierStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async (purchase: PurchasesType) => {
    setLoading(true);
    await fetchSuppliers();
    setLoading(false);
    setPurchaseEdit(purchase);
    toggleEditPurchaseModal();
  };

  const handleView = async (purchaseId: number) => {
    setLoading(true);
    await fetchPurchaseDetails(purchaseId);
    setLoading(false);
    router.push("/home/purchase/management/view");
  };

  useEffect(() => {
    clearPurchaseEdit();
  }, [clearPurchaseEdit])

  const total = (number: string) => {
    return (parseFloat(number)).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })}
  

  return (
    <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900">
      <table className="w-full rounded-lg text-left shadow-md border-collapse">
        <thead className="bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600">
          <tr>
            <th className="py-3 px-1">Item</th>
            <th className="py-3 px-1 w-96">Descripción</th>
            <th className="py-3 px-1">Proveedor</th>
            <th className="py-3 px-1">Fecha de Compra</th>
            <th className="py-3 px-1">Fecha de Vencimiento</th>
            <th className="py-3 px-1">Forma de pago</th>
            <th className="py-3 px-1">Monto</th>
            <th className="py-3 px-1">Ver</th>
            <th className="py-3 px-1">Editar</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, i) => (
            <tr
              key={purchase.Purchase_id}
              className={`hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                i % 2 === 0 ? "bg-slate-100 dark:bg-slate-800" : ""
              }`}
            >
              <td className="py-2 px-2">{i + 1}</td>
              <td className="py-2 ps-1 pe-5">
                {purchase.Purchase_description}
              </td>
              <td className="py-2 px-1">{purchase.Supplier.Supplier_name}</td>
              <td className="py-2 px-1">
                {desformatearFecha(purchase.Purchase_date)}
              </td>
              <td className="py-2 px-1">
                {desformatearFecha(purchase.Purchase_dueDate)}
              </td>
              <td className="py-2 px-1">{purchase.Purchase_paymentMethod}</td>
              <td className="py-2 px-1">
                
                {total(purchase.Purchase_totalAmount)}
              </td>

              <td className="py-2 px-1">
                <button
                  className="bg-gradient-to-b from-green-600 to-green-700 w-8 h-full flex justify-center items-center shadow-lg"
                  onClick={() => handleView(purchase.Purchase_id)}
                >
                  <Search className="text-white w-5" />
                </button>
              </td>
              <td className="py-2 px-1">
                {!purchase.Purchase_close && (
                  <button
                    className="bg-gradient-to-b from-indigo-600 to-indigo-700 w-8 h-full flex justify-center items-center shadow-md rounded-sm"
                    onClick={() => handleEdit(purchase)}
                  >
                    <FilePenLine className="text-white w-5" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditPurchaseModalOpen && <EditPurchaseModal />}
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default PurchasesTable;

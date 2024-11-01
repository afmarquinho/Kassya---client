"use client";

import axiosClient from "@/src/axiosClient";
import { formattedDate } from "@/src/utils/helpers";
import { purchaseStore } from "@/src/utils/purchaseStore";
import { supplierStore } from "@/src/utils/supplierStore";
import { userStore } from "@/src/utils/userStore";
import purchaseSchema from "@/src/validations/purchasesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type FormValuesTypes = z.infer<typeof purchaseSchema>;

export const PurchaseForm = () => {
  const {
    purchaseEdit,
    updatePurchases,
    toggleEditPurchaseModal,
    clearPurchaseEdit,
  } = purchaseStore();
  const { suppliers } = supplierStore();
  const { authUser } = userStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValuesTypes>({
    resolver: zodResolver(purchaseSchema),
    //defaultValues: purchaseEdit || {},
  });

  const onSubmit: SubmitHandler<FormValuesTypes> = async (data) => {
    try {
      if (purchaseEdit) {
        const response = await axiosClient.put(
          `/purchases/${purchaseEdit.Purchase_id}`,
          {
            ...data,
            Purchase_dueDate: formattedDate(data.Purchase_dueDate),
          }
        );
        updatePurchases(response.data.data, "update");
      } else {
        const response = await axiosClient.post("/purchases", {
          ...data,
          Purchase_dueDate: formattedDate(data.Purchase_dueDate),
        });
        updatePurchases(response.data.data, "add");
      }
      toggleEditPurchaseModal();
      clearPurchaseEdit();
      reset();
    } catch (error) {
      console.error("Error en la operación de compra:", error);
    }
  };

  useEffect(() => {
    if (!authUser) {
      return;
    }

    setValue("Purchase_userId", authUser.User_id);

    if (purchaseEdit) {
      console.log(typeof purchaseEdit.Purchase_dueDate);
      setValue("Purchase_description", purchaseEdit.Purchase_description);
      setValue("Purchase_supplierId", purchaseEdit.Purchase_supplierId);
      setValue("Purchase_paymentMethod", purchaseEdit.Purchase_paymentMethod);
    }
  }, [authUser, setValue, purchaseEdit]);

  function desformatearFecha() {
    const newDate = purchaseEdit?.Purchase_dueDate?.split("T")

    return newDate? newDate[0]: "";
  }

  return (
    <>
      <h2 className="text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2">
        {purchaseEdit ? "Editar Compra" : "Crear Nueva Orden de Compra"}
      </h2>

      <form
        className="w-full max-w-[600px] mx-auto py-2 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          Descripción
          {errors.Purchase_description && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Purchase_description.message}
            </div>
          )}
          <textarea
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md resize-none h-32"
            {...register("Purchase_description")}
          />
        </label>

        <label className="flex flex-col">
          Proveedor
          {errors.Purchase_supplierId && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Purchase_supplierId.message}
            </div>
          )}
          <select
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
            {...register("Purchase_supplierId", { valueAsNumber: true })}
          >
            <option value="">-- Seleccione --</option>
            {suppliers.map((supplier, i) => (
              <option key={i} value={supplier.Supplier_id}>
                {supplier.Supplier_name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          Método de Pago
          {errors.Purchase_paymentMethod && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Purchase_paymentMethod.message}
            </div>
          )}
          <input
            type="text"
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
            {...register("Purchase_paymentMethod")}
          />
        </label>

        <label className="flex flex-col">
          Término de Pago
          {errors.Purchase_dueDate && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Purchase_dueDate.message}
            </div>
          )}
          <input
            type="date"
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
            {...register("Purchase_dueDate")}
            defaultValue={purchaseEdit ? desformatearFecha() : ""}
          />
        </label>

        <div className="w-full flex justify-center">
          <input
            type="submit"
            className="bg-indigo-700 hover:bg-blue-600 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors"
            value={purchaseEdit ? "Editar" : "Crear"}
          />
        </div>
      </form>
    </>
  );
};


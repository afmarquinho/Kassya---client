"use client";
import axiosClient from "@/src/axiosClient";
import { productStore } from "@/src/utils/productStore";
import { purchaseStore } from "@/src/utils/purchaseStore";
import productSchema from "@/src/validations/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type FormValuesTypes = z.infer<typeof productSchema>;

const ProductForm = () => {
  const { purchaseDetails, updatePurchaseProducts } = purchaseStore();
  const { toggleProductModal, productEdit, clearProductEdit } = productStore();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValuesTypes>({
    resolver: zodResolver(productSchema),
    defaultValues: productEdit || {},
  });

  const total = watch("Product_qty") * watch("Product_cost");

  const onSubmit: SubmitHandler<FormValuesTypes> = async (data) => {
    console.log(errors);

    setLoading(true);

    if (productEdit) {
      const upData = { ...productEdit, ...data, Product_total: total };
      const response = await axiosClient.put("/products", upData);
      const updatedData = response.data.data;
      updatedData.Product_cost = parseFloat(updatedData.Product_cost);
      updatePurchaseProducts(updatedData, "update");

      try {
      } catch (error) {
        console.error("Error al actualizar el producto: ", error);
      }
    } else {
      try {
        const response = await axiosClient.post("/products", {
          ...data,
          Product_ref: data.Product_ref.toUpperCase(),
          Product_total: total,
          Product_purchaseId: purchaseDetails?.Purchase_id,
        });
        const newData = response.data.data;
        newData.Product_cost = parseFloat(newData.Product_cost); //* CONVERTIR A NUMERO YA QUE VIENE DE LA API EN STR
        updatePurchaseProducts(newData, "add");
      } catch (error) {
        console.error("Error al agreagr el producto a la orden: ", error);
      }
    }
    reset();
    setLoading(false);
    clearProductEdit();
    toggleProductModal();
  };

  useEffect(() => {
    console.log(productEdit);
  }, [productEdit]);

  return (
    <>
      <h2 className="text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2">
        {productEdit ? "Editar Ítem" : "Agregar Producto a la Órden"}
      </h2>
      <form
        className="w-full max-w-[600px] mx-auto py-2 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          Referencia
          {errors.Product_ref && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Product_ref.message}
            </div>
          )}
          <input
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md uppercase"
            {...register("Product_ref")}
          />
        </label>
        <label className="flex flex-col">
          Nombre
          {errors.Product_name && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Product_name.message}
            </div>
          )}
          <input
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
            {...register("Product_name")}
          />
        </label>
        <label className="flex flex-col">
          Descripción
          {errors.Product_description && (
            <div className="text-xs text-red-600 my-0 font-medium">
              {errors.Product_description.message}
            </div>
          )}
          <textarea
            className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md resize-none h-16"
            {...register("Product_description")}
          />
        </label>
        <div className={`flex flex-col md:flex-row gap-5`}>
          <label className="flex flex-col w-full">
            Cantidad
            {errors.Product_qty && (
              <div className="text-xs text-red-600 my-0 font-medium">
                {errors.Product_qty.message}
              </div>
            )}
            <input
              type="number"
              className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
              {...register("Product_qty", { valueAsNumber: true })}
            />
          </label>
          <label className="flex flex-col w-full">
            Costo Unitario
            {errors.Product_cost && (
              <div className="text-xs text-red-600 my-0 font-medium">
                {errors.Product_cost.message}
              </div>
            )}
            <input
              type="number"
              className="bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md"
              {...register("Product_cost", { valueAsNumber: true })}
            />
          </label>
        </div>
        <div className={`text-base font-medium`}>
          Total:{" "}
          <span>
            {isNaN(total)
              ? 0
              : total.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
          </span>
        </div>
        <div className="w-full flex justify-center">
          <input
            type="submit"
            className={` text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors ${
              loading ? "bg-gray-400" : "bg-indigo-700 hover:bg-blue-600"
            }`}
            value={productEdit ? "Editar" : "Crear"}
            disabled={loading}
          />
        </div>
      </form>
    </>
  );
};
export default ProductForm;

"use client";
import axiosClient from "@/src/axiosClient";
import { supplierStore } from "@/src/utils/supplierStore";
import { userStore } from "@/src/utils/userStore";
import supplierSchema from "@/src/validations/supplierSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type FormValuesType = z.infer<typeof supplierSchema>;

const SupplierForm = () => {
  const { supplier, updateSuppliers, setEditSupplierModal } = supplierStore();
  const { authUser } = userStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(supplierSchema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    if (supplier) {
      //     //* EDITAR USUARIO
      const supp = { ...supplier, ...data };
      try {
        await axiosClient.put("/suppliers", supp);
        setEditSupplierModal();
        updateSuppliers(supp, "update");
      } catch (error) {
        console.error(error);
      }
      console.log(supplier);
    } else {
      //* HACER SOLICITUD API
      try {
        const response = await axiosClient.post("/suppliers", data);
        updateSuppliers(response.data.data, "add");
      } catch (error) {
        console.error(error);
      }
      router.back();
    }
    //cleanUser();
    reset();
  };
  useEffect(() => {
    if (authUser) {
      setValue("Supplier_userId", authUser.User_id);
    }
  }, [authUser, setValue]);

  return (
    <>
      <h2
        className={`text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2`}
      >
        {supplier ? "Editar Proveedor" : "Crear Nuevo Proveedor"}
      </h2>

      <form
        className={`w-full max-w-[600px] mx-auto py-2 space-y-4`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* //*NIT AND COMPANY NAME */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Nit</label>
            {errors.Supplier_nit && (
              <div
                className={`text-xs text-red-600 my-0 font-medium ${
                  supplier === null ? "" : "text-gray-500"
                }`}
              >
                {errors.Supplier_nit.message}
              </div>
            )}

            <input
              type="number"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                supplier === null ? "" : "text-gray-500"
              }`}
              {...register("Supplier_nit", { valueAsNumber: true })}
              defaultValue={supplier ? supplier.Supplier_nit : ""}
              readOnly={supplier !== null}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Razón Social</label>
            {errors.Supplier_name && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_name.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_name")}
              defaultValue={supplier ? supplier.Supplier_name : ""}
            />
          </div>
        </div>

        {/* //* CONTACT INFO AND EMAIL */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Nombre de contacto</label>
            {errors.Supplier_contactInfo && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_contactInfo.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_contactInfo")}
              defaultValue={supplier ? supplier.Supplier_contactInfo : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Correo Electrónico</label>
            {errors.Supplier_email && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_email.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_email")}
              defaultValue={supplier ? supplier.Supplier_email : ""}
            />
          </div>
        </div>

        {/* //* PHONENUMBER AND CITY */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Teléfono</label>
            {errors.Supplier_phoneNumber && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_phoneNumber.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_phoneNumber")}
              defaultValue={supplier ? supplier.Supplier_phoneNumber : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Ciudad</label>
            {errors.Supplier_city && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_city.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_city")}
              defaultValue={supplier ? supplier.Supplier_city : ""}
            />
          </div>
        </div>

        {/* //* ADDRESS */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Dirección</label>
            {errors.Supplier_address && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Supplier_address.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Supplier_address")}
              defaultValue={supplier ? supplier.Supplier_address : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}></div>
        </div>

        <div className={`w-ull flex justify-center`}>
          <input
            type="submit"
            className={`bg-indigo-700 hover:bg-indigo-600 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors`}
            value={supplier ? "Editar" : "Crear"}
          />
        </div>
      </form>
    </>
  );
};
export default SupplierForm;

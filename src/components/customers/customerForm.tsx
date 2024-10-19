"use client";
import axiosClient from "@/src/axiosClient";
import { customerStore } from "@/src/utils/customerStore";
import { userStore } from "@/src/utils/userStore";
import customerSchema from "@/src/validations/customerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type FormValuesType = z.infer<typeof customerSchema>;

const CustomerForm = () => {
  const { customer, updateCustomers, setEditCustomerModal, cleanCustomer } =
    customerStore();

  const { authUser } = userStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    if (customer) {
      //* EDITAR CLIENTE
      const cust = { ...customer, ...data };
      try {
        await axiosClient.put("/customers", cust);
        setEditCustomerModal();
        updateCustomers(cust, "update");
      } catch (error) {
        console.error(error);
      }
    } else {
      //* HACER SOLICITUD API
      try {
        const response = await axiosClient.post("/customers", data);
        updateCustomers(response.data.data, "add");
      } catch (error) {
        console.error(error);
      }
      router.back();
    }
    cleanCustomer();
    reset();
  };
  useEffect(() => {
    if (authUser) {
      setValue("Customer_userId", authUser.User_id);
    }
  }, [authUser, setValue]);

  
  return (
    <>
      <h2
        className={`text-base font-semibold text-center bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800 py-2`}
      >
        {customer ? "Editar Cliente" : "Crear Cliente"}
      </h2>

      <form
        className={`w-full max-w-[600px] mx-auto py-2 space-y-4`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* //*DNI AND NAME*/}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Cédula</label>
            {errors.Customer_dni && (
              <div
                className={`text-xs text-red-600 my-0 font-medium ${
                  customer === null ? "" : "text-gray-500"
                }`}
              >
                {errors.Customer_dni.message}
              </div>
            )}

            <input
              type="number"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md ${
                customer === null ? "" : "text-gray-500"
              }`}
              {...register("Customer_dni", { valueAsNumber: true })}
              defaultValue={customer ? customer.Customer_dni : ""}
              readOnly={customer !== null}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Nombre</label>
            {errors.Customer_name && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Customer_name.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Customer_name")}
              defaultValue={customer ? customer.Customer_name : ""}
            />
          </div>
        </div>

        {/* //* SURNAME AND EMAIL */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Apellido</label>
            {errors.Customer_surname && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Customer_surname.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Customer_surname")}
              defaultValue={customer ? customer.Customer_surname : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Correo Electrónico</label>
            {errors.Customer_email && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Customer_email.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Customer_email")}
              defaultValue={customer ? customer.Customer_email : ""}
            />
          </div>
        </div>

        {/* //* PHONENUMBER AND ADDRESS */}
        <div className={`flex flex-col md:flex-row w-full gap-4`}>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Teléfono</label>
            {errors.Customer_phoneNumber && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Customer_phoneNumber.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Customer_phoneNumber")}
              defaultValue={customer ? customer.Customer_phoneNumber : ""}
            />
          </div>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <label>Dirección</label>
            {errors.Customer_address && (
              <div className={`text-xs text-red-600 my-0 font-medium`}>
                {errors.Customer_address.message}
              </div>
            )}
            <input
              type="text"
              className={`bg-slate-300 dark:bg-slate-700 p-2 focus:outline-none text-base rounded-md`}
              {...register("Customer_address")}
              defaultValue={customer ? customer.Customer_address : ""}
            />
          </div>
        </div>

        {/* //* HABEAS DATA*/}
        <div className={`flex flex-col w-full gap-4`}>
          {errors.Customer_habeasData && (
            <div className={`text-xs text-red-600 my-0 font-medium`}>
              {errors.Customer_habeasData.message}
            </div>
          )}

          <label className={`w-full flex justify-start items-start gap-5`}>
            <input
              type="checkbox"
              {...register("Customer_habeasData")}
              defaultChecked={customer?.Customer_habeasData}
            />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            laborum laudantium repellat dignissimos ex ipsum cum perspiciatis
            voluptates, beatae quibusdam recusandae, omnis totam sunt quas?
            Explicabo omnis, voluptatem repellat amet iste dicta eum mollitia?
            Earum repellendus officiis accusantium, laudantium eos corporis vero
            alias, rerum ab cupiditate maxime. Nisi, deserunt numquam?
          </label>
        </div>

        <div className={`flex justify-center`}>
          <input
            type="submit"
            className={`bg-indigo-700 hover:bg-indigo-600 text-slate-200 font-semibold text-base p-2 focus:outline-none rounded-md cursor-pointer w-full mt-4 max-w-96 transition-colors`}
            value={customer ? "Editar" : "Crear"}
          />
        </div>
      </form>
    </>
  );
};
export default CustomerForm;

import { HandCoins, Truck } from "lucide-react";
import Link from "next/link";

const MastersPage = () => {
  return (
    <div className={`flex gap-5`}>
      <Link
        href={"masters/suppliers"}
        className={`flex flex-col gap-1 justify-center items-center  rounded-md p-5 text-white transition-colors shadow-lg bg-gradient-to-b from-blue-500  to-indigo-600 
          hover:from-blue-600 hover:to-indigo-800          
          dark:hover:from-blue-300 dark:hover:to-indigo-500  w-40 h-40 text-base font-medium`}
      >
        <Truck className={`w-full h-full dark:text-slate-700`} />
        Proveedores
      </Link>
      <Link
        href={"masters/customers"}
        className={`flex flex-col gap-1 justify-center items-center  rounded-md p-5 text-white transition-colors shadow-lg bg-gradient-to-b from-blue-500  to-indigo-600 
          hover:from-blue-600 hover:to-indigo-800          
          dark:hover:from-blue-300 dark:hover:to-indigo-500  w-40 h-40 text-base font-medium`}
      >
        <HandCoins className={`w-full h-full dark:text-slate-700`} />
        Clientes
      </Link>
    </div>
  );
};
export default MastersPage;

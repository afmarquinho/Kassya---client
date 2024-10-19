import BackButton from "@/src/components/backButton";
import CustomersTable from "@/src/components/customers/customersTable";
import GetCustomersButton from "@/src/components/customers/geCustomersButton";

import { Archive } from "lucide-react";
import Link from "next/link";

const CustomersPage = () => {
  return (
    <>
      <div className={`flex justify-between gap-5`}>
        <div className={`flex gap-5`}>
          <GetCustomersButton />
          <Link
            href={"customers/new"}
            className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-all bg-blue-500 hover:bg-blue-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 `}
          >
            <Archive className={`w-5`} />
            Nuevo Cliente
          </Link>
        </div>
        <BackButton />
      </div>
      <CustomersTable />
    </>
  );
};
export default CustomersPage;

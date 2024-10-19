import BackButton from "@/src/components/backButton";
import GetSuppliersButton from "@/src/components/suppliers/getSuppliersButton";
import SupplierTable from "@/src/components/suppliers/supplierTable";
import { Archive} from "lucide-react";
import Link from "next/link";

const SuppliersPage = () => {
  return (
    <>
      <div className={`flex justify-between gap-5`}>
        <div className={`flex gap-5`}>
          <GetSuppliersButton />
          <Link
          href={"suppliers/new"}
          className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-all bg-blue-500 hover:bg-blue-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 `}
        >
          <Archive className={`w-5`} />
          Nuevo Proveedor
        </Link>
        </div>
        <BackButton />
      </div>
      <SupplierTable />
    </>
  );
};
export default SuppliersPage;

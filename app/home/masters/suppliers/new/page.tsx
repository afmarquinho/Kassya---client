import BackButton from "@/src/components/backButton";
import SupplierForm from "@/src/components/suppliers/supplierForm";

const NewSupplierPage = () => {
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <div className="overflow-auto my-5 bg-white p-6 dark:bg-slate-900">
        <SupplierForm />
      </div>
    </>
  );
};
export default NewSupplierPage;

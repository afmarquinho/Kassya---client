import BackButton from "@/src/components/backButton";
import CustomerForm from "@/src/components/customers/customerForm";

const NewCustomerPage = () => {
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <div className="overflow-auto my-5 bg-white p-6 dark:bg-slate-900">
        <CustomerForm />
      </div>
    </>
  );
};
export default NewCustomerPage;

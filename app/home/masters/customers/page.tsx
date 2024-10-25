import BackButton from "@/src/components/backButton";
import CustomersTable from "@/src/components/customers/customersTable";
import GetCustomersButton from "@/src/components/customers/getCustomersButton";
import NewButton from "@/src/components/newButton";
import { Archive } from "lucide-react";

const CustomersPage = () => {
  return (
    <>
      <div className={`flex justify-between gap-5`}>
        <div className={`flex gap-5`}>
          <GetCustomersButton />
          <NewButton name="Nuevo Cliente" href="customers/new" icon={Archive} />
        </div>
        <BackButton />
      </div>
      <CustomersTable />
    </>
  );
};
export default CustomersPage;

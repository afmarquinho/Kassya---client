import {
  BackButton,
  CustomersTable,
  GetCustomersButton,
  NewButton,
} from "@/src/components";
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

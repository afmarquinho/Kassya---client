import {
  BackButton,
  GetPurchasesButton,
  NewPurchaseButton,
  PurchasesTable,
} from "@/src/components";

const ManagementPage = () => {
  return (
    <>
      <div className={`flex justify-between gap-5`}>
        <div className={`flex gap-5`}>
          <GetPurchasesButton />
          <NewPurchaseButton />
        </div>

        <BackButton />
      </div>
      <PurchasesTable />
    </>
  );
};
export default ManagementPage;

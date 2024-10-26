import BackButton from "@/src/components/backButton";
//import NewButton from "@/src/components/newButton";
import GetPurchasesButton from "@/src/components/purchases/getPurchasesButton";
import NewPurchaseButton from "@/src/components/purchases/newPurchaseButton";
import PurchasesTable from "@/src/components/purchases/purchasesTable";


const ManagementPage = () => {
  return (
    <>
      <div className={`flex justify-between gap-5`}>
        <div className={`flex gap-5`}>
          <GetPurchasesButton />
          {/* <NewButton
            name="Nueva Compra"
            href="/home/purchase/management/new"
            icon={CreditCard}
          /> */}
          <NewPurchaseButton/>
        </div>

        <BackButton />
      </div>
      <PurchasesTable />
    </>
  );
};
export default ManagementPage;

import BackButton from "@/src/components/backButton";
import PurchaseView from "@/src/components/purchases/purchaseView";

const PurchasePage = () => {
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <PurchaseView />
    </>
  );
};
export default PurchasePage;

import { BackButton, PurchaseView } from "@/src/components";

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

import BackButton from "@/src/components/backButton";
import PurchaseForm from "@/src/components/purchases/purchaseForm";

const NewPurchasePage = () => {
     //TODO: VACIAR EL STADO DE PRPOVEEDORES, AL CARGAR EL FORMULARIO SE LLENA, Y NO ES NECESARIO MANTENER ESE ESTADO
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <div className="overflow-auto my-5 bg-white p-6 dark:bg-slate-900">
        <PurchaseForm />
      </div>
    </>
  );
};
export default NewPurchasePage;

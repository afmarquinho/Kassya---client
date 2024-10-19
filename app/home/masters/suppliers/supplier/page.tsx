import BackButton from "@/src/components/backButton";
import SupplierView from "@/src/components/suppliers/supplierView";

const SupplierDetails = () => {

  //TODO: INCLUIR QUE CUANDO TRAIGA LOS DATOS DE LA BBDD, INMEDIAMENTE RELACIONE EL USUARIO QUE CREÓ EL PROVEEDOR
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <SupplierView />
    </>
  );
};
export default SupplierDetails;

import BackButton from "@/src/components/backButton";
import NewButton from "@/src/components/newButton";
import GetSuppliersButton from "@/src/components/suppliers/getSuppliersButton";
import SupplierTable from "@/src/components/suppliers/suppliersTable";
import { Archive } from "lucide-react";


const SuppliersPage = () => {
  //TODO: ORDENER LA TABLA POR APELLI CUANDO SE EDITE PARA QUE NO AGREGE EL PROVEEDOR AL FINAL.
  //TODO: AGREGAR LAS COMPAS QUE SE HAN HECHO AL PROVEEDOR EN LA VISTA
  return (
    <>
      <div className={`flex justify-between gap-5`}>
        <div className={`flex gap-5`}>
          <GetSuppliersButton />
          <NewButton
            name="Nuevo Proveedor"
            href="suppliers/new"
            icon={Archive}
          />
        </div>
        <BackButton />
      </div>
      <SupplierTable />
    </>
  );
};
export default SuppliersPage;

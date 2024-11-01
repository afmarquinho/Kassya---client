import {
  BackButton,
  GetSuppliersButton,
  NewButton,
  SuppliersTable,
} from "@/src/components";
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
      <SuppliersTable />
    </>
  );
};
export default SuppliersPage;

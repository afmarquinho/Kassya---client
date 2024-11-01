import NewButton from "@/src/components/NewButton";
import GetUsersButton from "@/src/components/users/getUsersButton";
import UserTable from "@/src/components/users/usersTable";
import { UserPlus } from "lucide-react";


const UsersPage = async () => {
  //TODO: AGREGAR BOTON PARA ORDENENAR ALABETICAMENTE POR APELLIDO Y NOMBRE
  //TODO: AGREGAR FILTRO PARA ACTIVADOS Y NO ACTIDAVOS
  //TODO: AGREGAR INPUT SEARCH
  //TODO: VALIDAD CON DETALLE LA CREGACION DE USUARIOS

  return (
    <>
      <div className={`flex gap-5`}>
        <GetUsersButton />
        <NewButton name="Nuevo Usuario" href="users/new" icon={UserPlus} />
      </div>
      <UserTable />
    </>
  );
};
export default UsersPage;

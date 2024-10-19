import GetUsersButton from "@/src/components/users/getUsersButton";
import UserTable from "@/src/components/users/usersTable";

import { UserPlus } from "lucide-react";
import Link from "next/link";

const UsersPage = async () => {
  //TODO: AGREGAR BOTON PARA ORDENENAR ALABETICAMENTE POR APELLIDO Y NOMBRE
  //TODO: AGREGAR FILTRO PARA ACTIVADOS Y NO ACTIDAVOS
  //TODO: AGREGAR INPUT SEARCH
  //TODO: VALIDAD CON DETALLE LA CREGACION DE USUARIOS


  return (
    <>
      <div className={`flex gap-5`}>
        <GetUsersButton />
        <Link
          href={"users/new"}
          className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-all bg-blue-500 hover:bg-blue-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 `}
        >
          <UserPlus className={`w-5`} />
          Nuevo Usuario
        </Link>
      </div>
      <UserTable />
    </>
  );
};
export default UsersPage;

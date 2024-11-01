"use client";
import { FilePenLine, Search } from "lucide-react";
import { userStore } from "../../utils/userStore";
import { EditUserModal } from "./EditUserModal";
import { UserType } from "@/src/types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UsersTable = () => {
  const router = useRouter();
  const { users, editUserModalOpen, setEditUserModal, setUser, cleanUser } =
    userStore();

  const handleEdit = (userItem: UserType) => {
    setUser(userItem);
    setEditUserModal();
  };

  const handleViewUser = (userItem: UserType) => {
    setUser(userItem);
    router.push("/home/users/user");
  };

  useEffect(() => {
    cleanUser();
  }, [cleanUser]);

  return (
    <div className="overflow-auto my-5 bg-white p-5 dark:bg-slate-900">
      <table
        className={`w-full rounded-lg border-collapse text-left overflow-hidden shadow-md`}
      >
        <thead
          className={`bg-indigo-900 dark:bg-indigo-900 text-slate-200 border-b-8 border-b-blue-600 dark:border-b-blue-800`}
        >
          <tr>
            <th className={`py-3 px-2`}>Item</th>
            <th className={`py-3 px-1`}>Apellido</th>
            <th className={`py-3 px-1`}>Nombre</th>
            <th className={`py-3 px-1`}>Rol</th>
            <th className={`py-3 px-1`}>Estado</th>
            <th className={`py-3 px-1`}>Ver</th>
            <th className={`py-3 px-1`}>Editar</th>
          </tr>
        </thead>
        <tbody className={`px-10`}>
          {users.map((user, i) => (
            <tr
              key={user.User_id}
              className={` dark:border-slate-600 hover:bg-gray-300 dark:hover:bg-yellow-900 py-5 ${
                i % 2 === 0 && "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <td className={`py-2 px-2`}>{i + 1}</td>
              <td className={`py-2 px-1`}>{user.User_surname}</td>
              <td className={`py-2 px-1`}>{user.User_name}</td>
              <td className={`py-2 px-1`}>
                {user.User_role === "ADMIN"
                  ? "Administrador"
                  : user.User_role === "MANAGER"
                  ? "Gerente"
                  : "Usuario"}
              </td>
              <td className={`py-2 px-1`}>
                {" "}
                <div className={`flex gap-1 items-center`}>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      user.User_active ? "bg-green-500" : "bg-red-600"
                    }`}
                  ></div>{" "}
                  {user.User_active ? "Activo" : "No Activo"}
                </div>
              </td>
              <td className={`py-2 px-1`}>
                {/* //*Watch button */}
                <button
                  className={`bg-gradient-to-b from-green-600 to-green-700 w-8 h-full flex justify-center items-center shadow-lg`}
                  onClick={() => handleViewUser(user)}
                >
                  <Search className={`text-white w-5`} />
                </button>
              </td>
              <td className={`py-2 px-1`}>
                {/* //*Edit button */}
                <button
                  className={`bg-gradient-to-b from-indigo-600 to-indigo-700 w-8 h-full flex justify-center items-center shadow-md rounded-sm`}
                  onClick={() => handleEdit(user)}
                >
                  <FilePenLine className={`text-white w-5`} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUserModalOpen && <EditUserModal />}
    </div>
  );
};
export default UsersTable;

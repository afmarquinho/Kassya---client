"use client";
import { TriangleAlert, UserRoundX, X } from "lucide-react";
import { userStore } from "../../utils/userStore";
import axiosClient from "@/src/axiosClient";
import { UserType } from "@/src/types";

const ActiveUserModal = () => {
  const { user, setActiveModal: setDeleteModal, setUser, updateUsers } = userStore();

  const handleActiveUser = async () => {
    const usr: UserType | null = user
      ? {
          ...user,
          User_active: !user?.User_active,
        }
      : null;
    await axiosClient.put("/users", usr);

    if (usr) {
      setUser(usr);
      updateUsers(usr, "update")
    }
    setDeleteModal();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 z-20 flex justify-center items-center`}
    >
      <div className={`w-full max-w-96 bg-white dark:bg-slate-700`}>
        <div className={`relative`}>
          <TriangleAlert
            className={`absolute top-2 left-2 text-yellow-400`}
            strokeWidth={3}
          />
          <button
            className={`absolute top-2 right-2 bg-red-800 hover:bg-red-950`}
            onClick={setDeleteModal}
          >
            <X className={`  text-yellow-400 cursor-pointer`} strokeWidth={3} />
          </button>
          <h2
            className={`bg-gradient-to-b  text-center text-white uppercase font-bold py-3 ${
              user?.User_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
          >
            Alerta
          </h2>
        </div>
        <div className={`p-4`}>
          <p>
            ¿Realmente deseas {user?.User_active ? "Desactivar" : "Activar"} a{" "}
            <span className={`font-bold`}>
              {user?.User_name} {user?.User_surname}?
            </span>
          </p>

          <button
            className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-all mx-auto mt-5 uppercase font-semibold shadow-md bg-gradient-to-b ${
              user?.User_active
                ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                : "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            }`}
            onClick={handleActiveUser}
          >
            <UserRoundX className={`w-5`} />
            {user?.User_active ? "Desactivar" : "Activar"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ActiveUserModal;

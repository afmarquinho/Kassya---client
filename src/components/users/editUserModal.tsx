import { Ban } from "lucide-react";

import { userStore } from "@/src/utils/userStore";
import { UserForm } from "./UserForm";

export const EditUserModal = () => {
  const { setEditUserModal, cleanUser } = userStore();
  const handleEdit = () => {
    setEditUserModal();
    cleanUser();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-center`}
    >
      <div className={`bg-white dark:bg-slate-800 p-10 w-11/12 max-w-[800px]`}>
        <UserForm />
        <button
          className={`flex justify-center items-center p-2 text-white gap-1 my-1 bg-gradient-to-b from-red-600 to-red-700 rounded-md`}
          onClick={handleEdit}
        >
          <Ban className={`w-5`} />
          Cancelar
        </button>
      </div>
    </div>
  );
};

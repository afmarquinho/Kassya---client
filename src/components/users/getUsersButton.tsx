"use client";
import { UsersRound } from "lucide-react";
import { userStore } from "../../utils/userStore";
import { useState } from "react";

const GetUsersButton = () => {
  const { fetchUsers } = userStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchUsers = async () => {
    setLoading(true);
    await fetchUsers();
    setLoading(false);
  };
  return (
    <button
      className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors ${
        loading
          ? "bg-gray-400"
          : "bg-red-500 hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700"
      }`}
      onClick={handleFetchUsers}
      disabled={loading}
    >
      <UsersRound className={`w-5`} />
      Mostrar Usuarios
    </button>
  );
};
export default GetUsersButton;

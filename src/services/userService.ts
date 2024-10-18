import { isAxiosError } from "axios";
import axiosClient from "../axiosClient";
//import { userStore } from "../utils/userStore";

export const getUsersApi = async () => {
  try {
    const response = await axiosClient.get("/users");
    //const { setUsers } = userStore();
    //setUsers(response.data.data)
    console.log(response.data.data)
    return
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data.errors[0].msg || "Error obtener los usuarios";
      console.error("Error del backend: ", errorMessage);
      throw new Error(errorMessage);
    } else {
      throw new Error(
        "Ha ocurrido un error inesperado al al obtener usuarios"
      );
    }
  }
};

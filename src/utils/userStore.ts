import { create } from "zustand";
import { authUserType, UserType } from "../types";
import axiosClient from "../axiosClient";

type State = {
  users: UserType[];
  user: UserType | null;
  activeModalOpen: boolean;
  editUserModalOpen: boolean;
  authUser: authUserType | null;
};

type Action = {
  fetchUsers: () => Promise<void>;
  setUser: (user: UserType) => void;
  cleanUser: () => void;
  setActiveModal: () => void;
  setEditUserModal: () => void;
  updateUsers: (user: UserType, action: string) => void;
};

export const userStore = create<State & Action>((set) => ({
  users: [],
  user: null,
  activeModalOpen: false,
  editUserModalOpen: false,
  authUser: {
    User_id: 10,
    User_name: "Juan",
    User_surname: "Pérez",
  },

  fetchUsers: async () => {
    try {
      const response = await axiosClient.get("/users");

      set({
        users: response.data.data,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  updateUsers: (user, action) => {
    //* UTILIZAR LA MISMA FUNCION PARA AGRGAR UN NUEVO USER AL ESTADO SI SE CREA, EN ESTE CASO EL ACTION ES ADD, SINO ES UPDATE Y SOLO ACTUALIZA EL ARRAY DE USER CON EL USER EDITADO.
    if (!user) {
      console.error("Usuario no válido");
      return;
    }

    if (action === "add") {
      set((state) => ({
        users: [...state.users, user],
      }));
    } else if (action === "update") {
      if (typeof user.User_id !== "number") {
        console.error("Id del usuario inválido");
        return;
      }
      set((state) => ({
        users: state.users.map((item) =>
          item.User_id === user.User_id ? user : item
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },
  setUser: (user) => {
    set({ user });
  },
  cleanUser: () => {
    set({ user: null });
  },
  setActiveModal: () => {
    set((state) => {
      const newState = !state.activeModalOpen;

      if (newState) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return { activeModalOpen: newState };
    });
  },
  setEditUserModal: () => {
    set((state) => {
      const newState = !state.editUserModalOpen;

      if (newState) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return { editUserModalOpen: newState };
    });
  },
}));

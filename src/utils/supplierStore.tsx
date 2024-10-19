import { create } from "zustand";
import { SupplierType } from "../types";
import axiosClient from "../axiosClient";

type State = {
  suppliers: SupplierType[];
  supplier: SupplierType | null;
  editSupplierModalOpen: boolean;
  activeModalOpen: boolean;
};

type Action = {
  fetchSuppliers: () => Promise<void>;
  updateSuppliers: (supplier: SupplierType, action: string) => void;
  cleanSupplier: () => void;
  setSupplier: (user: SupplierType) => void;
  setEditSupplierModal: () => void;
  setActiveModal: () => void;
};

export const supplierStore = create<State & Action>((set) => ({
  suppliers: [],
  supplier: null,
  editSupplierModalOpen: false,
  activeModalOpen: false,

  fetchSuppliers: async () => {
    try {
      const response = await axiosClient.get("/suppliers");
      set({ suppliers: response.data.data });
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  },
  updateSuppliers: (supplier, action) => {
    //* UTILIZAR LA MISMA FUNCION PARA AGRGAR UN NUEVO PROVEEDOR AL ESTADO SI SE CREA, EN ESTE CASO EL ACTION ES ADD, SINO ES UPDATE Y SOLO ACTUALIZA EL ARRAY DE SUPPLIERS CON EL SUPPLIER EDITADO.
    if (!supplier) {
      console.error("Proveedor no válido");
      return;
    }
    if (action === "add") {
      set((state) => ({
        suppliers: [...state.suppliers, supplier],
      }));
    } else if (action === "update") {
      if (typeof supplier.Supplier_id !== "number") {
        console.error("Id del proveedor inválido");
        return;
      }
      set((state) => ({
        suppliers: state.suppliers.map((item) =>
          item.Supplier_id === supplier.Supplier_id ? supplier : item
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },
  cleanSupplier: () => {
    set({ supplier: null });
  },
  setSupplier: (supplier) => {
    set({ supplier });
  },
  setEditSupplierModal: () => {
    set((state)=>{
      const newState = !state.editSupplierModalOpen;

      if (newState) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return { editSupplierModalOpen: newState };
    })
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
}));

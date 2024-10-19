import { create } from "zustand";
import { CustomerType } from "../types";
import axiosClient from "../axiosClient";

type State = {
  customers: CustomerType[];
  customer: CustomerType | null;
  editCustomerModalOpen: boolean;
};

type Action = {
  fetchCustomers: () => Promise<void>;
  updateCustomers: (customer: CustomerType, action: string) => void;
  cleanCustomer: () => void;
  setCustomer: (customer: CustomerType) => void;
  setEditCustomerModal: () => void;
};

export const customerStore = create<State & Action>((set) => ({
  customers: [],
  customer: null,
  editCustomerModalOpen: false,

  fetchCustomers: async () => {
    try {
      const response = await axiosClient.get("/customers");
      set({ customers: response.data.data });
    } catch (error) {
      console.error("Error al hacer fetch a clientes", error);
    }
  },
  updateCustomers: (customer, action) => {
    if (!customer) {
      console.error("Cliente no válido");
      return;
    }
    if (action === "add") {
      set((state) => ({
        customers: [...state.customers, customer],
      }));
    } else if (action === "update") {
      if (typeof customer.Customer_id !== "number") {
        console.error("Id del cliente es inválido");
        return;
      }
      set((state) => ({
        customers: state.customers.map((item) =>
          item.Customer_id === customer.Customer_id ? customer : item
        ),
      }));
    } else {
      console.error("Acción no reconocida");
    }
  },
  cleanCustomer: () => {
    set({ customer: null });
  },
  setCustomer: (customer) => {
    set({ customer });
  },
  setEditCustomerModal: () => {
    set((state) => {
      if (!state.editCustomerModalOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return { editCustomerModalOpen: !state.editCustomerModalOpen };
    });
  },
}));

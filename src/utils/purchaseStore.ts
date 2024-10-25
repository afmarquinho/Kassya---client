import { create } from "zustand";
import axiosClient from "../axiosClient";
import { PurchasesType, PurchaseType } from "../types";

type State = {
  purchases: PurchasesType[];
  purchaseDetails: PurchaseType | null;
  purchaseEdit: PurchasesType | null;
  isClosePurchaseModalOpen: boolean;
  isEditPurchaseModalOpen: boolean;
  isDeletePurchaseModalOpen: boolean;
};

type Action = {
  fetchPurchases: () => Promise<void>;
  fetchPurchaseDetails: (purchaseId: number) => Promise<void>;
  updatePurchases: (purchase: PurchasesType, action: "add" | "update") => void;
  clearPurchaseEdit: () => void;
  toggleClosePurchaseModal: () => void;
  closePurchase: () => void;
  toggleEditPurchaseModal: () => void;
  setPurchaseEdit: (purchaseEdit: PurchasesType | null) => void;
  toggleDeletePurchaseModal: () => void;
  deletePurchase: (purchaseId: number) => void;
};

export const purchaseStore = create<State & Action>((set) => ({
  purchases: [],
  purchaseDetails: null,
  purchaseEdit: null,
  isClosePurchaseModalOpen: false,
  isEditPurchaseModalOpen: false,
  isDeletePurchaseModalOpen: false,

  fetchPurchases: async () => {
    try {
      const response = await axiosClient.get("/purchases");
      set({ purchases: response.data.data });
    } catch (error) {
      console.error("Error al obtener las compras:", error);
    }
  },

  fetchPurchaseDetails: async (purchaseId: number) => {
    try {
      const response = await axiosClient.get(`/purchases/${purchaseId}`);
      set({ purchaseDetails: response.data.data });
    } catch (error) {
      console.error("Error al obtener detalles de la compra:", error);
    }
  },

  updatePurchases: (purchase, action) => {
    if (!purchase) {
      console.error("Compra no válida");
      return;
    }
    set((state) => {
      const updatedPurchases =
        action === "add"
          ? [purchase, ...state.purchases]
          : state.purchases.map((item) =>
              item.Purchase_id === purchase.Purchase_id ? purchase : item
            );

      return { purchases: updatedPurchases };
    });
  },

  clearPurchaseEdit: () => {
    set({ purchaseEdit: null });
  },

  toggleClosePurchaseModal: () => {
    set((state) => {
      document.body.style.overflow = state.isClosePurchaseModalOpen ? "" : "hidden";
      return { isClosePurchaseModalOpen: !state.isClosePurchaseModalOpen };
    });
  },

  closePurchase: () => {
    set((state) => {
      if (!state.purchaseDetails) {
        console.error("No se puede cerrar la compra: no hay una compra activa.");
        return state;
      }
      const updatedPurchaseDetails = { ...state.purchaseDetails, Purchase_close: true };
      const updatedPurchases = state.purchases.map((purchase) =>
        purchase.Purchase_id === updatedPurchaseDetails.Purchase_id
          ? { ...purchase, Purchase_close: true }
          : purchase
      );

      return {
        purchaseDetails: updatedPurchaseDetails,
        purchases: updatedPurchases,
      };
    });
  },

  toggleEditPurchaseModal: () => {
    set((state) => {
      document.body.style.overflow = state.isEditPurchaseModalOpen ? "" : "hidden";
      return { isEditPurchaseModalOpen: !state.isEditPurchaseModalOpen };
    });
  },

  setPurchaseEdit: (purchaseEdit) => {
    set({ purchaseEdit });
  },

  toggleDeletePurchaseModal: () => {
    set((state) => {
      document.body.style.overflow = state.isDeletePurchaseModalOpen ? "" : "hidden";
      return { isDeletePurchaseModalOpen: !state.isDeletePurchaseModalOpen };
    });
  },

  deletePurchase: (purchaseId) => {
    set((state) => ({
      purchases: state.purchases.filter((purchase) => purchase.Purchase_id !== purchaseId),
    }));
  },
}));
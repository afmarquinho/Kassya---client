import { create } from "zustand";
import axiosClient from "../axiosClient";
import { ProductType, PurchasesType, PurchaseType } from "../types";

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
  updatePurchaseProducts: (
    product: ProductType,
    action: "add" | "update" | "delete"
  ) => void;
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

      // Mapeo para transformar cada compra al tipo `PurchasesType`
      const formattedPurchases = response.data.data.map((purchase: PurchasesType) => ({
        Purchase_id: purchase.Purchase_id,
        Purchase_description: purchase.Purchase_description,
        Purchase_date: ( purchase.Purchase_date),
        Purchase_totalAmount: parseFloat(purchase.Purchase_totalAmount),
        Purchase_userId: purchase.Purchase_userId,
        Purchase_supplierId: purchase.Purchase_supplierId,
        Purchase_paymentMethod: purchase.Purchase_paymentMethod,
        Purchase_dueDate: (purchase.Purchase_dueDate),
        Purchase_close: purchase.Purchase_close,
        Supplier: {
          Supplier_name: purchase.Supplier.Supplier_name,
        },
      }));

      set({ purchases: formattedPurchases });
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
      document.body.style.overflow = state.isClosePurchaseModalOpen
        ? ""
        : "hidden";
      return { isClosePurchaseModalOpen: !state.isClosePurchaseModalOpen };
    });
  },

  closePurchase: () => {
    set((state) => {
      if (!state.purchaseDetails) {
        console.error(
          "No se puede cerrar la compra: no hay una compra activa."
        );
        return state;
      }
      const updatedPurchaseDetails = {
        ...state.purchaseDetails,
        Purchase_close: true,
      };
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
      document.body.style.overflow = state.isEditPurchaseModalOpen
        ? ""
        : "hidden";
      return { isEditPurchaseModalOpen: !state.isEditPurchaseModalOpen };
    });
  },

  setPurchaseEdit: (purchaseEdit) => {
    set({ purchaseEdit });
  },

  toggleDeletePurchaseModal: () => {
    set((state) => {
      document.body.style.overflow = state.isDeletePurchaseModalOpen
        ? ""
        : "hidden";
      return { isDeletePurchaseModalOpen: !state.isDeletePurchaseModalOpen };
    });
  },

  deletePurchase: (purchaseId) => {
    set((state) => ({
      purchases: state.purchases.filter(
        (purchase) => purchase.Purchase_id !== purchaseId
      ),
    }));
  },

  updatePurchaseProducts: (product, action) =>
    set((state) => {
      if (!state.purchaseDetails) return state;

      const currentProducts = state.purchaseDetails.Product;
      let updatedProducts;

      switch (action) {
        case 'add':
          updatedProducts = [...currentProducts, product];
          break;

        case 'update':
          updatedProducts = currentProducts.map((p) =>
            p.Product_id === product.Product_id ? { ...p, ...product } : p
          );
          break;

        case 'delete':
          updatedProducts = currentProducts.filter(
            (p) => p.Product_id !== product.Product_id
          );
          break;

        default:
          return state;
      }

      return {
        purchaseDetails: {
          ...state.purchaseDetails,
          Product: updatedProducts,
        },
      };
    }),
}));

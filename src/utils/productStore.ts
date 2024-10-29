import { create } from "zustand";
import { ProductType } from "../types";
//import axiosClient from "../axiosClient";

type ProductState = {
  //products: ProductType[];
  //productDetails: ProductType | null;
  isProductModalOpen: boolean;
  isDeleteProductModalOpen: boolean;
  productEdit: ProductType | null;
};

type ProductActions = {
  //fetchProducts: () => Promise<void>;
  //fetchProductDetails: (productId: number) => Promise<void>;
  toggleProductModal: () => void;
  toggleDeleteProductModal: () => void;
  setProductEdit: (product: ProductType) => void;
  clearProductEdit: () => void;
  //addProduct: (product: ProductType) => void;
  //updateProduct: (product: ProductType) => void;
  //removeProduct: (productId: number) => void;
};

export const productStore = create<ProductState & ProductActions>((set) => ({
  isProductModalOpen: false,
  isDeleteProductModalOpen: false,
  productEdit: null,

  toggleProductModal: () => {
    set((state) => {
      document.body.style.overflow = state.isProductModalOpen ? "" : "hidden";
      return { isProductModalOpen: !state.isProductModalOpen };
    });
  },

  toggleDeleteProductModal: () => {
    set((state) => {
      document.body.style.overflow = state.isDeleteProductModalOpen
        ? ""
        : "hidden";
      return { isDeleteProductModalOpen: !state.isDeleteProductModalOpen };
    });
  },
  setProductEdit: (product) => {
    set({ productEdit: product });
  },
  clearProductEdit: () => {
    set({ productEdit: null });
  },
}));

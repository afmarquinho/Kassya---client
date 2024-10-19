import { create } from "zustand";

type State = {
  isDark: boolean;
  isSidebarCollapsed: boolean;
};

type Action = {
  setDarkMode: () => void;
  setSidebarCollapsed: () => void;
};

// Crear el store
export const useStore = create<State & Action>((set) => ({
  isDark: false,
  isSidebarCollapsed: false,

  setDarkMode: () => {
    set((state) => {
      document.documentElement.classList.toggle("dark", !state.isDark);
      return { isDark: !state.isDark };
    });
  },

  setSidebarCollapsed: () => {
    set((state) => ({
      isSidebarCollapsed: !state.isSidebarCollapsed,
    }));
  },
}));

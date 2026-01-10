import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import STORAGE_KEYS from "../constants/storageKeys";

interface AuthStore {
  token: string;
  setToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: "",
      isAuthenticated: false,
      setToken: (token: string) => set({ token }),
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      logout: () => set({ token: "", isAuthenticated: false }),
    }),
    {
      name: STORAGE_KEYS.AUTH,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;

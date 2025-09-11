// store/authStore.js
import { create } from "zustand";
import { loginService, logoutService, moduleRole } from "@/lib/services/auth";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await loginService(credentials);
      if (res) {
        set({
          user: res.data.username ?? null,
          token: res.data.token.access ?? null,
          loading: false,
        });
        document.cookie = `token=${res.data?.token?.access}; path=/; Secure; SameSite=Lax`;
        localStorage.setItem("user", JSON.stringify(res.data?.username));
        localStorage.setItem("token", JSON.stringify(res.data?.token?.access));
      }
      console.log(res.data)
      return res;
    } catch (err) {
      set({ error: err.response?.data?.message || "Login gagal", loading: false });
      throw err;
    }
  },

  logout: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const data = await logoutService(credentials);
      set({ user: null, token: null, loading: false, });
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // hapus cookie

      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Logout gagal", loading: false });
      throw err;
    }
  },
  moduleRole: async () => {
    set({ loading: true, error: null });
    try {
      const data = await moduleRole();
      set({ user: null, token: null, loading: false, });
      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || "gagal mengambil sidebar", loading: false });
      throw err;
    }
  },

  clearAuth: async () => {
    try {
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; 
      await localStorage.clear()
    } catch (err) {
      throw err;
    }
  }
}));

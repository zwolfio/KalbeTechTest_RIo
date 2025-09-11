import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
    "app-id": process.env.NEXT_PUBLIC_APP_ID,
    "app-key": process.env.NEXT_PUBLIC_APP_KEY,
  },
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const refreshRes = await api.get("authenticatioan/auth/token/refresh", {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          }
        })
        const newAccessToken = refreshRes.data.accessToken;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        localStorage.setItem("accessToken", newAccessToken);



        return api(originalRequest);
      } catch (refreshErr) {
        const { clearAuth } = useAuthStore.getState();
        await clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);


export default api;

// store/authStore.js
import { create } from "zustand";
import { getRequest, addRequest, updateRequest, deleteRequest, getRequestbyid } from "@/lib/services/request";

export const useRequestStore = create((set) => ({
    loading: false,
    error: null,
    dataRequest: null,
    dataRequestbyid: null,

    read: async (params) => {
        set({ loading: true, error: null });
        try {
            const res = await getRequest(params);
            set({ dataRequest: res.data, loading : false })
            return res;
        } catch (err) {
            set({ error: err.response?.data?.message || "Read Request gagal", loading: false });
            throw err;
        }
    },

    readbyid: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await getRequestbyid(id);
            set({ loading: false })
            return res;
        } catch (err) {
            set({ error: err.response?.data?.message || "Read Request gagal", loading: false });
            throw err;
        }
    },

    create: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = addRequest(payload);
            set({ loading: false })
            return data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Create Request gagal", loading: false });
            throw err;
        }
    },
    update: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = await updateRequest(payload);
            set({ loading: false, });
            return data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Update Request gagal", loading: false });
            throw err;
        }
    },

    deleteData: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = await deleteRequest(payload);
            set({ loading: false, });
            return data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Delete Request gagal", loading: false });
            throw err;
        }}
}));

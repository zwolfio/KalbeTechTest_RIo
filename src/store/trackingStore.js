// store/authStore.js
import { create } from "zustand";
import { getTracking, addTracking, updateTracking, deleteTracking, getTrackingbyid } from "@/lib/services/tracking";

export const useTrackingStore = create((set) => ({
    loading: false,
    error: null,
    dataTracking: null,
    dataTrackingbyID: null,

    read: async (params) => {
        set({ loading: true, error: null });
        try {
            const res = await getTracking(params);
            set({ dataTracking: res.data, loading: false })
            return res;
        } catch (err) {
            set({ error: err.response?.data?.message || "Read Tracking gagal", loading: false });
            throw err;
        }
    },

    readbyid: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await getTrackingbyid(id);
            set({ loading: false })
            return res;
        } catch (err) {
            set({ error: err.response?.data?.message || "Read Tracking gagal", loading: false });
            throw err;
        }
    },

    create: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = addTracking(payload);
            set({ loading: false })
            return data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Create Tracking gagal", loading: false });
            throw err;
        }
    },
    update: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = await updateTracking(payload);
            set({ loading: false, });
            return data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Update Tracking gagal", loading: false });
            throw err;
        }
    },

    deleteData: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = await deleteTracking(payload);
            set({ loading: false, });
            return data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Delete Tracking gagal", loading: false });
            throw err;
        }}
}));

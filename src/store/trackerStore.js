// store/authStore.js
import { create } from "zustand";
import { getTracker, addTracker, updateTracker, deleteTracker, getTrackerbyid } from "@/lib/services/tracker";

export const useTrackerStore = create((set) => ({
    loading: false,
    error: null,
    dataTracker: null,
    dataTrackerbyid: null,

    read: async (params) => {
        set({ loading: true, error: null });
        try {
            const res = await getTracker(params);
            set({ dataTracker: res.data })
            return res;
        } catch (err) {
            set({ error: err.response?.data?.message || "Read Tracker gagal", loading: false });
            throw err;
        }
    },

    readbyid: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await getTrackerbyid(id);
            set({ loading: false })
            return res;
        } catch (err) {
            set({ error: err.response?.data?.message || "Read Tracker gagal", loading: false });
            throw err;
        }
    },

    create: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = addTracker(payload);
            set({ loading: false })
            return data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Create Tracker gagal", loading: false });
            throw err;
        }
    },
    update: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = await updateTracker(payload);
            set({ loading: false, });
            return data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Update Tracker gagal", loading: false });
            throw err;
        }
    },

    deleteData: async (payload) => {
        set({ loading: true, error: null });
        try {
            const data = await deleteTracker(payload);
            set({ loading: false, });
            return data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Delete Tracker gagal", loading: false });
            throw err;
        }}
}));

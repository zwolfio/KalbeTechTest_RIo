"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTrackerStore } from "@/store/trackerStore";
import { v4 as uuidv4 } from "uuid"; // ✅ untuk generate UUID

export default function TrackerCreate() {
    const router = useRouter();
    const { create } = useTrackerStore();

    const [form, setForm] = useState({
        id: uuidv4(), 
        code: "",
        parentCode: "",
        description: "",
        order: "",
        icon: "",
        actionType: "",
        moduleFlow: "",
        mandays: "",
        isParallel: false,
        isPublic: false,
        isUsingNotification: false,
        updatedBy: "string",
        isActive: true,
    });

      const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await create(form);
            setLoading(false)
            if (!loading) {
                router.push("/master/tracker");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to create tracker");
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Create New Tracker
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: "Code", key: "code", type: "text" },
                        { label: "Parent Code", key: "parentCode", type: "text" },
                        { label: "Order", key: "order", type: "number" },
                        { label: "Mandays", key: "mandays", type: "number" },
                        { label: "Icon", key: "icon", type: "text" },
                        { label: "Action Type", key: "actionType", type: "text" },
                        { label: "Module Flow", key: "moduleFlow", type: "text" },
                    ].map((field) => (
                        <div key={field.key} className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                value={form[field.key] ?? ""}
                                onChange={(e) =>
                                    handleChange(
                                        field.key,
                                        field.type === "number"
                                            ? Number(e.target.value)
                                            : e.target.value
                                    )
                                }
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    ))}

                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 font-medium text-gray-700">Description</label>
                        <textarea
                            value={form.description ?? ""}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="border border-gray-300 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={form.isParallel}
                            onChange={(e) => handleChange("isParallel", e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 focus:ring-green-400"
                        />{" "}
                        Parallel
                    </label>
                    <label className="flex items-center gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={form.isPublic}
                            onChange={(e) => handleChange("isPublic", e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 focus:ring-green-400"
                        />{" "}
                        Public
                    </label>
                    <label className="flex items-center gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={form.isUsingNotification}
                            onChange={(e) =>
                                handleChange("isUsingNotification", e.target.checked)
                            }
                            className="w-5 h-5 rounded border-gray-300 focus:ring-green-400"
                        />{" "}
                        Notification
                    </label>
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Create Tracker"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/master/tracker")}
                        className="bg-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

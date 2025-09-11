"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useRequestStore } from "@/store/requestStore";

export default function RequestCreate() {
    const router = useRouter();
    const { create, loading } = useRequestStore();

    const [form, setForm] = useState({
        partnerId: uuidv4(),
        projectCode: "",
        totalFee: "",
        lastStatus: "",
        receivingStatus: "",
        leadTime: "",
        receivedDate: "",
        analysisWipDate: "",
        analysisCompletedDate: "",
        id: uuidv4(),
        createdBy: "string",
        isActive: true,
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value ?? "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await create(form);
            if (!loading) {
                router.push("/request/ca");
            }
        } catch (err) {
            console.error("CREATE ERROR:", err);
            alert("Failed to create request");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Create New Request
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: "Project Code", key: "projectCode", type: "text" },
                        { label: "Total Fee", key: "totalFee", type: "number" },
                        { label: "Last Status", key: "lastStatus", type: "text" },
                        { label: "Receiving Status", key: "receivingStatus", type: "text" },
                        { label: "Lead Time", key: "leadTime", type: "number" },
                        { label: "Received Date", key: "receivedDate", type: "date" },
                        { label: "Analysis WIP Date", key: "analysisWipDate", type: "date" },
                        { label: "Analysis Completed Date", key: "analysisCompletedDate", type: "date" },
                    ].map((field) => (
                        <div key={field.key} className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700">{field.label}</label>
                            <input
                                type={field.type}
                                value={form[field.key] || ""}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(e) => handleChange("isActive", e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 focus:ring-green-400"
                    />
                    <label className="text-gray-700">Active</label>
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        type="submit"
                        className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Create Request"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/request/ca")}
                        className="bg-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useTrackingStore } from "@/store/trackingStore";

export default function RequestCreate() {
    const router = useRouter();
    const { create, loading } = useTrackingStore();

    const [form, setForm] = useState({
        trackerCode : "",
        value : "",
        trackerId : uuidv4(),
        requestId : "",
        partnerId : uuidv4(),
        id : uuidv4(),
        createdBy : ""
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value ?? "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await create(form);
            if (!loading) {
                router.push("/tracker");
            }
        } catch (err) {
            console.error("CREATE ERROR:", err);
            alert("Failed to create tracking");
        }
    };

    return (
        <div className="lg:max-w-4xl lg:mx-auto p-6 bg-white shadow-xl rounded-xl mt-8 max-w-full mx-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Create New Tracking
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: "Tracker Code", key: "trackerCode", type: "text" },
                        { label: "Request ID", key: "requestId", type: "text" },
                        { label: "Value", key: "value", type: "text" },
                        { label: "Created By", key: "createdBy", type: "text" },
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

                <div className="flex gap-3 mt-4">
                    <button
                        type="submit"
                        className={`bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Create Request"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/tracker")}
                        className="bg-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

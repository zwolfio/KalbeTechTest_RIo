'use client';

import { use } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRequestStore } from "@/store/requestStore";

export default function RequestEdit({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { readbyid, update, deleteData, loading } = useRequestStore();

  const [form, setForm] = useState({
    partnerId: id,
    projectCode: "",
    totalFee: "",
    lastStatus: "",
    receivingStatus: "",
    leadTime: "",
    receivedDate: "",
    analysisWipDate: "",
    analysisCompletedDate: "",
    id: "",
    updatedBy: "string",
    isActive: true,
  });

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const res = await readbyid(id);
        setForm((prev) => ({
          ...prev,
          ...res.data,
        }));
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    }

    fetchData();
  }, [id, readbyid]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value ?? "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await update(form);
      console.log("UPDATE RESULT:", res);
      if (!loading) {
        router.push("/request/ca");
      }
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Failed to update request");
    }
  };

  const handleDelete = async () => {
    const payload = {
      id: id,
      deletedBy: "string",
      doHardDelete: true,
    };
    try {
      const res = await deleteData(payload);
      console.log("DELETE RESULT:", res);
      if (!loading) {
        router.push("/request/ca");
      }
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Failed to delete request");
    }
  };

  return (
    <div className="lg:max-w-4xl lg:mx-auto p-6 bg-white shadow-xl rounded-xl mt-8 max-w-full mx-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Request <span className="text-green-600">#{id}</span>
      </h1>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Partner ID", key: "partnerId", type: "text" },
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

          {/* Checkbox Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 focus:ring-green-400"
            />
            <label className="text-gray-700">Active</label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className={`bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Save Changes
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className={`bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Delete
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
      )}
    </div>
  );
}

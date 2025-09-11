'use client';

import { use } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // App Router
import { useTrackerStore } from "@/store/trackerStore";

export default function TrackerEdit({ params }) {
  const { id } = use(params)
  const router = useRouter();
  const { readbyid, update, loading } = useTrackerStore();
  const { deleteData } = useTrackerStore();

  const [form, setForm] = useState({
    id: id,
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
    isActive: true
  });


  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const res = await readbyid(id);

        setForm(prev => ({
          ...prev,
          ...res.data
        }));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [id]);


  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value ?? "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await update(form);
      console.log("UPDATE RESULT:", res);
      console.log(form)
      if (!loading) {
        router.push("/master/tracker");
      }
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Failed to update tracker");
    }
  };

  const handleDelete = async () => {
    const payload = {
      id: id,
      "deletedBy": "string",
      "doHardDelete": true
    }
    try {
      const res = await deleteData(payload)
      console.log(res)
      if (!loading) {
        router.push("/master/tracker");
      }
    } catch (error) {
      console.error("Delete ERROR:", error);
      alert("Failed to Delete tracker");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Tracker <span className="text-green-600">#{id}</span></h1>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
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
            ].map(field => (
              <div key={field.key} className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">{field.label}</label>
                {field.type === "text" || field.type === "number" ? (
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                ) : null}
              </div>
            ))}

            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium text-gray-700">Description</label>
              <textarea
                value={form.description}
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
              /> Parallel
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={form.isPublic}
                onChange={(e) => handleChange("isPublic", e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 focus:ring-green-400"
              /> Public
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={form.isUsingNotification}
                onChange={(e) => handleChange("isUsingNotification", e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 focus:ring-green-400"
              /> Notification
            </label>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className={`bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              Save Changes
            </button>
            <button
              onClick={() => handleDelete()}
              type="button"
              className={`bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              Delete
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
      )}
    </div>
  );
}

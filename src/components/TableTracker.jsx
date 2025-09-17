"use client";

import { useState, useEffect } from "react";
import { useTrackerStore } from "@/store/trackerStore";
import SortableHeader from "./SortHeader";
import Link from "next/link";
import Swal from "sweetalert2";

export default function TableTracker({ data }) {
  const { read } = useTrackerStore();
  const [trackers, setTrackers] = useState({});
  const [params, setParams] = useState({
    limit: 10,
    offset: 0,
    sortBy: "code",
    sortOrder: "ASC",
    search: "",
  });

  useEffect(() => {
    async function fetchData() {
      Swal.showLoading();
      try {
        const data = await read(params);
        if (data?.data) {
          setTrackers(data.data);
          Swal.close();
        }
      } catch (error) {
        console.error("Error fetching trackers:", error);
        Swal.close();
      }
    }
    fetchData();
  }, [params]);

  const handleChange = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
      offset: key === "search" || key === "limit" ? 0 : prev.offset,
    }));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= trackers.totalPages) {
      setParams((prev) => ({
        ...prev,
        offset: (page - 1) * prev.limit,
      }));
    }
    console.log(params)
  };

  const handleSort = (column) => {
    setParams((prev) => {
      if (prev.sortBy === column) {
        return {
          ...prev,
          sortOrder: prev.sortOrder === "ASC" ? "DESC" : "ASC",
        };
      } else {
        return {
          ...prev,
          sortBy: column,
          sortOrder: "ASC",
        };
      }
    });
  };


  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col max-h-full">
      <div className="flex justify-between mb-4">
        <div>
          <label className="text-sm mr-2">Show</label>
          <select
            className="border rounded p-1 text-sm"
            value={params.limit}
            onChange={(e) => handleChange("limit", Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search item"
            className="border rounded p-1 text-sm"
            onChange={(e) => handleChange("search", String(e.target.value))}
          />
          <Link
            href={"/master/tracker/create"}
            className="ml-2 bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Add
          </Link>
        </div>
      </div>

      <div className="flex overflow-y-auto overflow-x-auto max-w-full">
        <table className="w-full border text-sm border-gray-300">
          <thead className="sticky top-0 bg-green-600 text-white">
            <tr>
              <th className="p-2 text-left">Action</th>

              <SortableHeader column="code" label="Code" params={params} handleSort={handleSort} />
              <SortableHeader column="parentCode" label="Parent Code" params={params} handleSort={handleSort} />
              <SortableHeader column="description" label="Description" params={params} handleSort={handleSort} />
              <SortableHeader column="order" label="Order" params={params} handleSort={handleSort} />
              <SortableHeader column="icon" label="Icon" params={params} handleSort={handleSort} />
              <SortableHeader column="actionType" label="Action Type" params={params} handleSort={handleSort} />
              <SortableHeader column="moduleFlow" label="Module Flow" params={params} handleSort={handleSort} />
              <SortableHeader column="mandays" label="Mandays" params={params} handleSort={handleSort} />
              <SortableHeader column="isParallel" label="Parallel" params={params} handleSort={handleSort} />
              <SortableHeader column="isPublic" label="Public" params={params} handleSort={handleSort} />
              <SortableHeader column="isUsingNotification" label="Notification" params={params} handleSort={handleSort} />
            </tr>
          </thead>

          <tbody>
            {trackers.items?.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="p-2">
                  <Link
                    href={`/master/tracker/${row.id}`}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                </td>
                <td className="p-2">{row.code}</td>
                <td className="p-2">{row.parentCode}</td>
                <td className="p-2">{row.description}</td>
                <td className="p-2">{row.order}</td>
                <td className="p-2">{row.icon}</td>
                <td className="p-2">{row.actionType}</td>
                <td className="p-2">{row.moduleFlow}</td>
                <td className="p-2">{row.mandays}</td>
                <td className="p-2">{row.isParallel ? "✔️" : "❌"}</td>
                <td className="p-2">{row.isPublic ? "✔️" : "❌"}</td>
                <td className="p-2">
                  {row.isUsingNotification ? "✔️" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between text-sm mt-4 items-center">
        <span>
          Showing {params.offset + 1} to{" "}
          {Math.min(params.offset + params.limit, trackers.totalItems)} of{" "}
          {trackers.totalItems} entries
        </span>
        <div className="flex gap-2 items-center">
          <button
            className="border rounded px-2 py-1 disabled:opacity-50"
            disabled={params.offset <= 0}
            onClick={() => handlePageChange(params.offset / params.limit)}
          >
            Prev
          </button>
          <span>
            Page {params.offset / params.limit + 1} of {trackers.totalPages || 1}
          </span>
          <button
            className="border rounded px-2 py-1 disabled:opacity-50"
            disabled={params.offset / params.limit + 1 >= trackers.totalPages}
            onClick={() => handlePageChange(params.offset / params.limit + 2)}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}

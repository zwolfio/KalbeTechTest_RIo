
"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTrackingStore } from "@/store/trackingStore";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";


export default function TableTracking({ data }) {


  const { read } = useTrackingStore()
  const [Trackings, setTrackings] = useState([]);
  const [params, setParams] = useState({
    limit: 10,
    offset: 0,
    sortBy: "code",
    sortOrder: "ASC",
    search: "%",
  });

  useEffect(() => {
    async function fetchData() {
      Swal.showLoading();

      try {
        const data = await read(params);
        if (data?.data) {
          setTrackings(data.data);
          Swal.close()
        }
      } catch (error) {
        console.error("Error fetching Trackings:", error);
        Swal.close()

      }
    }

    fetchData();
  }, [params]);

  const handleChange = (key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col max-h-full">
      <div className="flex justify-between mb-4">
        <div>
          <label className="text-sm mr-2">Show</label>
          <select className="border rounded p-1 text-sm" onChange={(e) => handleChange("limit", Number(e.target.value))}>
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
          <Link href={"/tracker/create"} className="ml-2 bg-green-600 text-white px-3 py-1 rounded text-sm">Add</Link>
        </div>
      </div>
      <div className="flex overflow-y-auto overflow-x-auto max-w-full">
        <table className="w-full border text-sm border-gray-300 ">
          <thead className="sticky top-0 bg-green-600 text-white">
            <tr>
              <th className="p-2 text-left">Action</th>
              <th className="p-2 text-left">Tracker Code</th>
              <th className="p-2 text-left">Tracker ID</th>
              <th className="p-2 text-left">Request ID</th>
              <th className="p-2 text-left">Patner ID</th>
              <th className="text-left">value</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, idx) => (
              <tr key={idx} className="border-b  border-gray-300 hover:bg-gray-50">
                <td className="p-2">
                  <Link href={`/tracker/${row.id}`} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </Link></td>
                <td className="p-2">{row.trackerCode}</td>
                <td className="p-2">{row.trackerId}</td>
                <td className="p-2">{row.requestId}</td>
                <td className="p-2">{row.partnerId}</td>
                <td className="">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="flex justify-between text-sm mt-4">
        <span>Showing 1 to 10 of 18 entries</span>
        <div className="flex gap-2">
          <button className="border rounded px-2 p-2">Prev</button>
          <button className="border rounded px-2 p-2">Next</button>
        </div>
      </div>
    </div>
  );
}

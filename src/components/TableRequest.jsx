
"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTrackerStore } from "@/store/trackerStore";
import Link from "next/link";
import { useRouter } from "next/router";


export default function TableRequest({ data }) {
  

  const { read } = useTrackerStore()
  const [trackers, setTrackers] = useState([]);
  const [params, setParams] = useState({
    limit: 10,
    offset: 0,
    sortBy: "name",
    sortOrder: "asc",
    search: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await read(params);
        if (data?.data) {            // hanya set jika data valid
        setTrackers(data.data);
      }
      } catch (error) {
        console.error("Error fetching trackers:", error);
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
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between mb-4">
        <div>
          <label className="text-sm mr-2">Show</label>
          <select className="border rounded p-1 text-sm" onChange={(e) => handleChange("limit", Number(e.target.value))}>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <button className="border rounded px-2 bg-green-600 text-white p-1 mx-2 hover:bg-green-700">Filter By</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search item"
            className="border rounded p-1 text-sm"
          />
          <Link href={"/request/ca/create"} className="ml-2 bg-green-600 text-white px-3 py-1 rounded text-sm">Add</Link>
        </div>
      </div>
      <div className="overflow-y-auto max-h-screen">
        <table className="w-full border text-sm border-gray-300 ">
          <thead className="sticky top-0 bg-green-600 text-white">
            <tr>
              <th className="p-2 text-left">Action</th>
              <th className="p-2 text-left">Request ID</th>
              <th className="p-2 text-left">Company Name</th>
              <th className="p-2 text-left">Project Code</th>
              <th className="p-2 text-left">Request Date</th>
              <th className="p-2 text-left">Last Status</th>
              <th className="p-2 text-left">Receiving Status</th>
              <th className="p-2 text-left">Total Fee</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, idx) => (
              <tr key={idx} className="border-b  border-gray-300 hover:bg-gray-50">
                <td className="p-2">
                  <Link href={`/request/ca/${row.id}`} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </Link></td>
                <td className="p-2">{row.id}</td>
                <td className="p-2">PT KALBE FARMA TBK</td>
                <td className="p-2">{row.projectCode}</td>
                <td className="p-2">{row.requestDate}</td>
                <td className="p-2">{row.lastStatus}</td>
                <td className="p-2">{row.receivingStatus}</td>
                <td className="p-2">{row.totalFee}</td>
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

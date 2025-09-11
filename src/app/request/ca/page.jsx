"use client"

import TableRequest from "@/components/TableRequest";
// import Table from "@/components/Table";
import TableTracker from "@/components/TableTracker";
import { useRequestStore } from "@/store/requestStore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function TrackerPage() {
    const { read, loading, error } = useRequestStore();
    const [requests, setRequests] = useState()


    useEffect(() => {
        Swal.showLoading()
        async function fetch() {
            const data = await read()
            setRequests(data.data)
            Swal.close()
        }
        fetch()
    }, [])
    
    console.log(requests)


    return (
        <div className="p-4">
            <div className="text-black pb-3 px-3">
                <p className="text-2xl font-bold text-black">Lab Analysis Request</p>
                <p className="text-md font-thin">Manage all data</p>
            </div>
            <div className="text-black ">
                <TableRequest data={requests} />
            </div>
        </div>
    );
}

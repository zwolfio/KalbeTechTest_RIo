"use client"

import TableRequest from "@/components/TableRequest";
// import Table from "@/components/Table";
import TableTracker from "@/components/TableTracker";
import TableTracking from "@/components/TableTracking";
import { useTrackingStore } from "@/store/trackingStore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function TrackingPage() {
    const { read, loading, error } = useTrackingStore();
    const [tracking, setTracking] = useState()


    useEffect(() => {
        Swal.showLoading();
        async function fetch() {
            const data = await read()
            setTracking(data.data)
            Swal.close()
        }
        fetch()
    }, [])

    console.log(tracking)


    return (
        <div className="p-4">
            <div className="text-black pb-3 px-3">
                <p className="text-2xl font-bold text-black">Tracking Progress</p>
                <p className="text-md font-thin">Manage all data</p>
            </div>
            <div className="text-black ">
                <TableTracking data={tracking} />
            </div>
        </div>
    );
}

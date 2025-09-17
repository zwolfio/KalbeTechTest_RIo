"use client"

// import Table from "@/components/Table";
import TableTracker from "@/components/TableTracker";
import { useTrackerStore } from "@/store/trackerStore";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

export default function TrackerPage() {

    return (
        <div className="p-4 flex flex-col w-full h-full">
            <div className="text-black pb-3 px-3 flex flex-col">
                <p className="text-2xl font-bold text-black">Master Tracker</p>
                <p className="text-md font-thin">Manage data</p>
            </div>
            <div className="text-black h-full">
                <TableTracker />
            </div>
        </div>
    );
}

"use client"

// import Table from "@/components/Table";
import TableTracker from "@/components/TableTracker";
import { useTrackerStore } from "@/store/trackerStore";
import { useEffect, useState } from "react";

export default function TrackerPage() {
    const { read, loading, error } = useTrackerStore();
    const [trackers, setTrackers] = useState()


    useEffect(() => {
        async function fetch() {
            const data = await read()
            setTrackers(data.data)
        }
        fetch()
    }, [])
    
    console.log(trackers)


    return (
        <div className="p-4 flex flex-col w-full h-full">
            <div className="text-black pb-3 px-3 flex flex-col h-full">
                <p className="text-2xl font-bold text-black">Master Tracker</p>
                <p className="text-md font-thin">Manage data</p>
            </div>
            <div className="text-black h-full">
                <TableTracker data={trackers} />
            </div>
        </div>
    );
}

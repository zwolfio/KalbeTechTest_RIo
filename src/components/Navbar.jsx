"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const router = useRouter()
  const { loading, logout } = useAuthStore();
  const [user, setUser] = useState(null);


  const [form, setForm] = useState({
    appCode: "ASSESSMENT",
    moduleCode: "ALL",
    domain: "",
    user: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
    setForm(prev => ({ ...prev, user: JSON.parse(storedUser) }));
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logout(form);
      if (res) {
        console.log("logout berhasil:", res);
        router.push("/login");
      }
    } catch (err) {
      console.error("Error logout:", err);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6 py-10 shadow-md">
      <h2 className="font-bold text-gray-800 text-xl">Master Tracker</h2>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        {/* Username & Role */}
        <div className="flex flex-col text-right mr-2">
          <span className="text-sm font-semibold text-gray-800">{user}</span>
          <span className="text-xs text-gray-500">Admin</span>
        </div>

        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold cursor-pointer select-none transition-transform duration-200 hover:scale-105 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          P
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute right-0 top-full mt-2 w-72 bg-white border border-green-400 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-green-100 border-b">
                <p className="text-md font-semibold text-gray-900">Panggalih Sako Denta</p>
                <p className="text-sm text-gray-500">Admin</p>
              </div>

              {/* Quick Actions */}
              <div className="px-3 py-3 border-b grid grid-cols-2 gap-3 text-gray-500 border-gray-300">
                <button className="w-full py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition">Dashboard</button>
                <button className="w-full py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition">Reports</button>
                <button className="w-full py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition">Analytics</button>
                <button className="w-full py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition">Tasks</button>
              </div>

              {/* Links */}
              <div className="px-3 py-3 border-b text-gray-500 border-gray-300">
                <h4 className="text-xs text-gray-400 uppercase mb-2">Account</h4>
                <ul className="flex flex-col gap-1">
                  <li className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer transition">Profile</li>
                  <li className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer transition">Settings</li>
                  <li className="py-2 px-3 hover:bg-red-50 text-red-600 rounded-md cursor-pointer transition" aria-disabled={loading} onClick={handleLogout}>{loading ? "Loading..." : "Logout"}</li>
                </ul>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 text-xs text-gray-400 text-center bg-gray-50">
                Last login: 10 Sep 2025, 01:00 AM
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

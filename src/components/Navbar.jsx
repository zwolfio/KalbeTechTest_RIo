"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { Bell, Menu, X, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const router = useRouter();
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
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setForm((prev) => ({ ...prev, user: storedUser ? JSON.parse(storedUser) : "" }));
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logout(form);
      if (res) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Error logout:", err);
    }
  };

  // Dropdown avatar
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

  // Sidebar drawer toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-4 md:px-6 shadow-md">
        <div className="flex items-center gap-3">
          {/* Hamburger button for mobile */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h2 className="font-bold text-gray-800 text-xl">Master Tracker</h2>
        </div>

        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {/* Notification */}
          <div className="relative cursor-pointer">
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>

          {/* Username */}
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

          {/* Avatar Dropdown */}
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

                {/* Account Links */}
                <div className="px-3 py-3 border-b text-gray-500 border-gray-300">
                  <h4 className="text-xs text-gray-400 uppercase mb-2">Account</h4>
                  <ul className="flex flex-col gap-1">
                    <li className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer transition">Profile</li>
                    <li className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer transition">Settings</li>
                    <li className="py-2 px-3 hover:bg-red-50 text-red-600 rounded-md cursor-pointer transition" aria-disabled={loading} onClick={handleLogout}>
                      {loading ? "Loading..." : "Logout"}
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Sidebar Drawer for Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-300 md:hidden overflow-y-auto"
            >
              <div className="flex justify-end p-2">
                <button onClick={() => setSidebarOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

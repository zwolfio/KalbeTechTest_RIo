"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login"; 

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {!isAuthPage && <Navbar />}
        <div className="flex flex-1">
          {!isAuthPage && <Sidebar />}
          <main className="flex-1 bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}

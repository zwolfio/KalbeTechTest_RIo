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
      <body className="min-h-screen grid grid-cols-12">
        {!isAuthPage ? (
          <>
            <div className="col-span-12">
              <Navbar />
            </div>

            <div className="col-span-12 grid grid-cols-12">
              <div className="md:col-span-2 hidden md:flex">
                <Sidebar />
              </div>
              <main className="col-span-12 md:col-span-10 bg-gray-100">{children}</main>
            </div>
          </>
        ) : (
          <main className="col-span-12">{children}</main>
        )}
      </body>
    </html>
  );
}

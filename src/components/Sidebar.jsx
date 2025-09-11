"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});
  const { moduleRole } = useAuthStore();
  const [modules, setModules] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // default hidden

  useEffect(() => {
    async function fetch() {
      const res = await moduleRole();
      setModules(res.data.modules);
    }
    fetch();
  }, []);

  const renderMenu = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = pathname === item.moduleUrl;
    const isSectionHeader = item.moduleCode === item.parentModuleCode;
    const isOpen = openMenus[item.moduleCode];

    if (isSectionHeader) {
      return (
        <div key={item.moduleCode}>
          <div className="px-4 pt-4 pb-2 text-md font-bold text-green-600 uppercase">
            {item.moduleName}
          </div>
          {hasChildren &&
            item.children
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((child) => renderMenu(child, level + 1))}
        </div>
      );
    }

    if (hasChildren) {
  return (
    <div key={item.moduleCode}>
      <div
        className={`flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-800`}
        style={{ paddingLeft: `${level}rem` }}
        onClick={() =>
          setOpenMenus((prev) => ({
            ...prev,
            [item.moduleCode]: !prev[item.moduleCode],
          }))
        }
      >
        <span>{item.moduleName}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-green-600" />
        ) : (
          <ChevronDown size={16} className="text-green-600" />
        )}
      </div>

      {isOpen &&
        item.children.map((child) => (
          <Link key={child.moduleCode} href={child.moduleUrl}>
            <div
              className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-100"
              style={{ paddingLeft: `${(level + 1)}rem` }}
            >
              {/* Circle bullet */}
              <span
                className={`w-3 h-3 border-2 border-gray-400 rounded-full flex-shrink-0
                  ${pathname === child.moduleUrl ? "bg-green-600 border-green-600" : ""}`}
              ></span>

              {/* Label */}
              <span>{child.moduleName}</span>
            </div>
          </Link>
        ))}
    </div>
  );
}


    return (
      <Link key={item.moduleCode} href={item.moduleUrl}>
        <div
          className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
            isActive
              ? "text-green-600 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          style={{ paddingLeft: `${level}rem` }}
        >
          <span>{item.moduleName}</span>
        </div>
      </Link>
    );
  };

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      <aside
        className={`bg-white border-r border-gray-300 min-h-screen transition-transform duration-300
          flex max-w-full flex-col "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-full`}
      >
        {modules?.length > 0 &&
          modules
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((item) => renderMenu(item))}
      </aside>
    </>
  );
}

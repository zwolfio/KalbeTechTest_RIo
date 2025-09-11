"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});
  const { moduleRole } = useAuthStore()
  const [modules, setModules] = useState({})

  useEffect( () => {
    async function fetch() {
      const res =  await moduleRole()
      console.log(res)
      setModules(res.data.modules)
      
    }

    fetch()
  }, [])

  // const modules = data.data.modules;

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
              .sort((a, b) => a.displayOrder - b.displayOrder) // 🔥 sort children juga
              .map((child) => renderMenu(child, level + 1))}
        </div>
      );
    }

    if (hasChildren) {
      return (
        <div key={item.moduleCode}>
          <div
            className="flex text-gray-800 font-medium items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
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
            item.children.map((child) => renderMenu(child, level + 1))}
        </div>
      );
    }

    return (
      <Link key={item.moduleCode} href={item.moduleUrl}>
        <div
          className={`flex items-center text-gray-800 font-medium gap-2 px-4 py-2 cursor-pointer ${isActive
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
    <aside className="w-64 h-full bg-white border-r overflow-y-auto px-3 border-gray-300">
      {modules?.length > 0 &&
        modules
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((item) => renderMenu(item))}
    </aside>
  );
}

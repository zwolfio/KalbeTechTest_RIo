"use client";

export default function SortableHeader({ column, label, params, handleSort }) {
  const isActive = params.sortBy === column;
  const isAsc = isActive && params.sortOrder === "ASC";
  const isDesc = isActive && params.sortOrder === "DESC";

  return (
    <th
      className="p-2 text-left cursor-pointer select-none"
      onClick={() => handleSort(column)}
    >
      <span className="flex items-center gap-1">
        {label}
        <span className="flex flex-col leading-none text-[0.5rem]">
          <span className={isAsc ? "text-white" : "text-gray-400"}>▲</span>
          <span className={isDesc ? "text-white" : "text-gray-400"}>▼</span>
        </span>
      </span>
    </th>
  );
}

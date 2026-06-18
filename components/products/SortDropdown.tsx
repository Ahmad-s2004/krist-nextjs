"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface SortDropdownProps {
  currentSortBy: string;
}

export default function SortDropdown({ currentSortBy }: SortDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", e.target.value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative inline-block text-left font-sans text-xs">
      <select
        value={currentSortBy}
        onChange={handleSortChange}
        className="bg-white border border-neutral-200 px-4 py-2.5 font-bold uppercase tracking-widest text-black outline-none focus:border-black cursor-pointer rounded-none appearance-none pr-8"
      >
        <option value="default">Default Sorting</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}
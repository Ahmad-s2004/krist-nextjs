"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SIZES = ["XS", "S", "M", "L", "XL", "4-5", "5-6"];

interface FilterPanelProps {
  currentSize: string;
  currentPriceRange: number;
}

export default function FilterPanel({ currentSize, currentPriceRange }: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrlParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-8 lg:sticky lg:top-6 bg-neutral-50/50 p-6 border border-neutral-100 font-sans">
      
      <div className="space-y-3">
        <h3 className="text-xs font-black tracking-widest uppercase text-black">Price Range</h3>
        <div className="w-6 h-0.5 bg-black"></div>
        <div className="pt-2 space-y-2">
          <input 
            type="range" 
            min="500" 
            max="5000" 
            step="100"
            value={currentPriceRange}
            onChange={(e) => updateUrlParams("price", e.target.value)}
            className="w-full accent-black cursor-pointer"
          />
          <div className="flex justify-between text-xs font-bold text-neutral-700 tracking-wide">
            <span>Min: Rs. 500</span>
            <span className="text-black bg-neutral-100 px-2 py-0.5">Max: Rs. {currentPriceRange}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-black tracking-widest uppercase text-black">Filter By Size</h3>
        <div className="w-6 h-0.5 bg-black"></div>
        <div className="grid grid-cols-4 gap-2 pt-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => updateUrlParams("size", currentSize === size ? "" : size)}
              className={`py-2 text-center text-xs font-bold uppercase transition-all border rounded-none ${
                currentSize === size 
                  ? "bg-black text-white border-black" 
                  : "bg-white text-gray-400 border-gray-200 hover:border-neutral-400 hover:text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
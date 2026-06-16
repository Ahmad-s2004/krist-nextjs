"use client";

import { useState } from "react";

export default function ProductTabs({ description }) {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { id: "details", label: "Product Details" },
    { id: "shipping", label: "Shipping & Return" },
    { id: "reviews", label: "Customer Reviews (0)" },
  ];

  return (
    <div className="border-t border-gray-100 pt-10 mt-10 space-y-6">
      <div className="flex border-b border-gray-100 gap-6 text-xs font-bold uppercase tracking-widest">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 relative transition-colors duration-200 ${
              activeTab === tab.id ? "text-black font-black" : "text-gray-400 hover:text-black"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
        ))}
      </div>

      <div className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed tracking-wide min-h-[100px]">
        {activeTab === "details" && <p>{description}</p>}
        {activeTab === "shipping" && (
          <p>Standard delivery pipeline takes 3-5 operational business days. Exchange window remains authorized under strict untampered packaging status profiles within 20 verification calendar intervals.</p>
        )}
        {activeTab === "reviews" && (
          <p className="text-gray-400 italic">No community feedback compiled for this target operational allocation batch item yet.</p>
        )}
      </div>
    </div>
  );
}
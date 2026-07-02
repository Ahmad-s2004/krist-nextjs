"use client";

import React from "react";

interface AppItem {
  name: string;
  meta: string;
  icon: React.ReactNode;
}

interface MobileAppsProps {
  title: string;
  apps: AppItem[];
}

export default function MobileApps({ title, apps }: MobileAppsProps) {
  return (
    <div className="col-span-2 sm:col-span-1 space-y-4 font-sans">
      {/* Title */}
      <h5 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm">
        {title}
      </h5>
      
      {/* Buttons Stack: Always vertical list to prevent overlapping */}
      <div className="flex flex-col gap-2 max-w-[160px]">
        {apps.map((app, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-3 py-2 rounded cursor-pointer hover:border-neutral-700 hover:bg-neutral-800/50 transition-all duration-200"
          >
            {/* Icon */}
            <div className="text-white w-4 h-4 flex items-center justify-center flex-shrink-0">
              {app.icon}
            </div>
            
            {/* Text */}
            <div className="text-left select-none leading-tight min-w-0">
              <p className="text-[8px] text-neutral-400 font-medium uppercase tracking-wider">
                {app.meta}
              </p>
              <p className="text-[10px] text-white font-black uppercase tracking-wide whitespace-nowrap">
                {app.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
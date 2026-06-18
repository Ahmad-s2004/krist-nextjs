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
    <div className="col-span-2 sm:col-span-1 space-y-5 font-sans">
      <h5 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm">
        {title}
      </h5>
      <div className="flex flex-col sm:flex-row gap-3">
        {apps.map((app, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2 cursor-pointer hover:border-neutral-700 transition-colors duration-200"
          >
            <div className="text-white w-5 h-5 flex items-center justify-center">
              {app.icon}
            </div>
            <div className="text-left select-none">
              <p className="text-[9px] text-neutral-400 font-medium uppercase tracking-wider">{app.meta}</p>
              <p className="text-xs text-white font-black uppercase tracking-wide">{app.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
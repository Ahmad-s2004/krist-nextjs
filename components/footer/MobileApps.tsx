"use client";

import React from "react";
import Image from "next/image";

interface AppItem {
  logo: string;
  storeName: string;
  subtitle: string;
  href: string;
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
          <a
            key={index}
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2 hover:border-neutral-700 transition-colors duration-200"
          >
            <div className="relative w-5 h-5">
              <Image src={app.logo} alt={app.storeName} fill className="object-contain" />
            </div>
            <div className="text-left select-none">
              <p className="text-[9px] text-neutral-400 font-medium uppercase tracking-wider">{app.subtitle}</p>
              <p className="text-xs text-white font-black uppercase tracking-wide">{app.storeName}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
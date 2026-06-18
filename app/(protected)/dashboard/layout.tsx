"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const sidebarLinks = [
    { label: "Order History", path: "/dashboard/orders" },
    { label: "Account Settings", path: "/dashboard/settings" },
  ];

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    
    window.location.href = "/signin";
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10 md:py-16 selection:bg-black selection:text-white flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <aside className="lg:col-span-3 w-full border border-neutral-100 p-6 bg-neutral-50/50 space-y-6 rounded-none">
          <div className="space-y-1">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">User Workspace</h2>
            <p className="text-sm font-bold text-black uppercase tracking-tight truncate">krist.buyer@domain.com</p>
          </div>
          <nav className="flex flex-col text-xs font-bold uppercase tracking-widest border-t border-neutral-100 pt-4 gap-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-3 transition-all duration-200 rounded-none ${
                    isActive
                      ? "bg-black text-white"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-neutral-500 hover:bg-neutral-100 hover:text-black transition-all duration-200 rounded-none font-bold uppercase tracking-widest"
            >
              Log Out
            </button>
          </nav>
        </aside>

        <main className="lg:col-span-9 w-full">
          {children}
        </main>

      </div>
    </div>
  );
}
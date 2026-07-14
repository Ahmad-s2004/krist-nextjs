"use client";

import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const ShoppingBagIcon = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const ClockIcon = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const HeartIcon = ({ className, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function DashboardOverview() {
  const stats = [
    { id: 1, name: "Total Orders", value: "12", icon: ShoppingBagIcon, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, name: "Pending Orders", value: "01", icon: ClockIcon, color: "text-amber-600", bg: "bg-amber-50" },
    { id: 3, name: "Wishlist Items", value: "08", icon: HeartIcon, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  const recentOrders = [
    { id: "#ORD-9823", date: "Oct 12, 2025", status: "Delivered", total: "$129.00" },
    { id: "#ORD-9711", date: "Oct 05, 2025", status: "Processing", total: "$79.50" },
    { id: "#ORD-9602", date: "Sep 28, 2025", status: "Shipped", total: "$210.00" },
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 bg-neutral-50 min-h-screen font-sans w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-wider text-black">
          Welcome to Dashboard
        </h1>
        <p className="text-xs text-neutral-500 mt-2 max-w-2xl">
          Bhai, ab bina middleware ke, aapka page direct client guard se secure ho gaya hai!
        </p>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.id} 
              className="bg-white p-5 sm:p-6 rounded-xl border border-neutral-200/60 shadow-xs flex items-center justify-between hover:shadow-sm transition-shadow"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{stat.name}</p>
                <h3 className="text-xl sm:text-2xl font-black text-black mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders Table Area */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200/60 shadow-xs p-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black">Recent Orders</h2>
            <button className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto -mx-5 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-5 sm:px-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 font-bold text-black whitespace-nowrap">{order.id}</td>
                      <td className="py-4 text-neutral-500 whitespace-nowrap">{order.date}</td>
                      <td className="py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          order.status === "Delivered" ? "bg-emerald-50 text-emerald-700" :
                          order.status === "Processing" ? "bg-amber-50 text-amber-700" :
                          "bg-blue-50 text-blue-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right font-bold text-black whitespace-nowrap">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Account Details Area */}
        <div className="bg-white rounded-xl border border-neutral-200/60 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black mb-4">Account Details</h2>
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-black text-sm">
                K
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black truncate">Krist Buyer</h3>
                <p className="text-[10px] text-neutral-400 lowercase truncate">krist.buyer@domain.com</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400">Default Shipping Address</span>
                <span className="block text-xs text-neutral-600 mt-1 leading-relaxed font-medium">
                  123 Street Name, Area, <br />
                  Karachi, Pakistan
                </span>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-2.5 px-4 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors">
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
}
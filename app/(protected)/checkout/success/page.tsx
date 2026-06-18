"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const generatedToken = "KRST-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedToken);
  }, []);

  const trackingSteps = [
    { label: "Order Placed", desc: "Receipt validated", active: true },
    { label: "Processing", desc: "Allocation warehouse", active: true },
    { label: "On The Way", desc: "Dispatch queue", active: false },
    { label: "Delivered", desc: "Identity verified", active: false },
  ];

  return (
    <div className="min-h-[85vh] bg-white px-4 sm:px-6 lg:px-8 py-12 md:py-20 selection:bg-black selection:text-white flex items-center justify-center">
      <div className="max-w-2xl w-full text-center space-y-10 md:space-y-12">
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-black flex items-center justify-center rounded-none shadow-sm animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase leading-tight">
              Payment Authorized
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide max-w-md mx-auto">
              Thank you for choosing Krist. Your acquisition deployment pipeline has been successfully queued.
            </p>
          </div>
        </div>

        <div className="bg-neutral-50 border border-neutral-100 p-6 rounded-none text-left space-y-4 max-w-md mx-auto">
          <div className="flex justify-between items-center border-b border-neutral-200/60 pb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>Reference Specifications</span>
            <span className="text-black font-black">{orderId || "COMPILING..."}</span>
          </div>
          <div className="space-y-2 text-xs font-medium text-gray-500 tracking-wide">
            <p className="flex justify-between"><span>Estimated Delivery:</span> <span className="text-black font-bold">3 - 5 Working Days</span></p>
            <p className="flex justify-between"><span>Notification Channel:</span> <span className="text-black font-bold">SMS & Registered Email</span></p>
          </div>
        </div>

        <div className="space-y-6 max-w-lg mx-auto pt-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-left sm:text-center px-1">
            Real-time Pipeline Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4 relative text-left">
            {trackingSteps.map((step, idx) => (
              <div key={idx} className="flex sm:flex-col items-start sm:items-center gap-4 sm:gap-2 group relative">
                
                <div className={`w-3 h-3 flex-shrink-0 rounded-none border transition-all duration-300 sm:mt-1 ${
                  step.active 
                    ? "bg-black border-black ring-4 ring-neutral-100" 
                    : "bg-white border-neutral-300"
                }`} />

                <div className="space-y-0.5 sm:text-center">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${step.active ? "text-black" : "text-gray-400"}`}>
                    {step.label}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium tracking-normal whitespace-nowrap">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-6">
          <Link 
            href="/dashboard/orders" 
            className="flex-1 text-center bg-transparent text-black border border-black py-3.5 font-bold text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300 rounded-none"
          >
            Track Order
          </Link>
          <Link 
            href="/" 
            className="flex-1 text-center bg-black text-white border border-black py-3.5 font-bold text-xs tracking-widest uppercase hover:bg-transparent hover:text-black transition-all duration-300 rounded-none shadow-sm"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}
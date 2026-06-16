"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const INVOICE_DATABASE = {
  "KRST-842910": {
    date: "June 12, 2026",
    status: "Processing",
    shippingAddress: { name: "Zain Ahmed", street: "Block 4, Clifton", city: "Karachi", country: "Pakistan", phone: "+92 300 1234567" },
    paymentMethod: "Cash On Delivery",
    items: [
      { id: 1, title: "TRENDY WARM INSIDE FLEECE BEANIE", size: "M", price: 580, qty: 1, image: "https://images.unsplash.com/photo-1576871337622-98d48d435350?q=80&w=300" },
      { id: 3, title: "WOMEN EXCLUSIVE LINEN SOLID DRESS", size: "S", price: 2450, qty: 1, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300" }
    ],
    subtotal: 3030,
    shippingFee: 0,
    grandTotal: 3030
  },
  "KRST-519284": {
    date: "May 28, 2026",
    status: "Delivered",
    shippingAddress: { name: "Zain Ahmed", street: "Phase 6, DHA", city: "Karachi", country: "Pakistan", phone: "+92 300 1234567" },
    paymentMethod: "Credit Card (Visa)",
    items: [
      { id: 2, title: "JUPITER KIDS DAZZLING UNISEX POLO", size: "4-5", price: 580, qty: 1, image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=300" }
    ],
    subtotal: 580,
    shippingFee: 150,
    grandTotal: 730
  }
};

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    const record = INVOICE_DATABASE[id as string];
    if (record) {
      setInvoice(record);
    }
  }, [id]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!invoice) {
    return (
      <div className="py-12 text-center border border-dashed border-neutral-200">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Searching Invoice Ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 print:p-0 print:border-none">
      
      <div className="flex justify-between items-center border-b border-neutral-100 pb-4 print:hidden">
        <div className="space-y-1">
          <button 
            onClick={() => router.push("/dashboard/orders")}
            className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-black flex items-center gap-1 transition-colors"
          >
            ← Back To Listing
          </button>
          <h1 className="text-xl font-black tracking-tight text-black uppercase">Order {id}</h1>
        </div>
        
        <button 
          onClick={handlePrint}
          className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-none"
        >
          Print Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-neutral-100 p-6 bg-neutral-50/40 rounded-none text-xs tracking-wide">
        <div className="space-y-2">
          <h3 className="font-black text-gray-400 uppercase text-[10px] tracking-widest">Order Timeline Data</h3>
          <p className="font-medium text-neutral-600">Authorized: <span className="text-black font-bold">{invoice.date}</span></p>
          <p className="font-medium text-neutral-600">Status: <span className="font-black text-neutral-900 uppercase">{invoice.status}</span></p>
        </div>
        <div className="space-y-2">
          <h3 className="font-black text-gray-400 uppercase text-[10px] tracking-widest">Shipping Designation</h3>
          <p className="font-bold text-black">{invoice.shippingAddress.name}</p>
          <p className="text-neutral-500 font-medium leading-relaxed">
            {invoice.shippingAddress.street}, {invoice.shippingAddress.city}, {invoice.shippingAddress.country}
          </p>
          <p className="text-neutral-400 font-medium">{invoice.shippingAddress.phone}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-black text-gray-400 uppercase text-[10px] tracking-widest">Billing Settlement</h3>
          <p className="font-bold text-black uppercase">{invoice.paymentMethod}</p>
          <p className="text-neutral-400 font-medium">Transaction cleared successfully.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Acquisition Manifest</h3>
        <div className="border border-neutral-100 divide-y divide-neutral-100 rounded-none">
          {invoice.items.map((item: any) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4 text-xs font-medium tracking-wide">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-16 bg-neutral-50 border border-neutral-100/60 overflow-hidden flex-shrink-0 rounded-none">
                  <Image src={item.image} alt={item.title} fill className="object-cover object-center" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-black uppercase line-clamp-1">{item.title}</h4>
                  <p className="text-neutral-400 text-[10px] font-bold uppercase">Size: {item.size} &nbsp;|&nbsp; Qty: {item.qty}</p>
                </div>
              </div>
              <span className="font-bold text-black flex-shrink-0">Rs. {item.price * item.qty}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <div className="w-full md:w-64 border border-neutral-100 p-5 space-y-3 text-xs tracking-wide rounded-none bg-neutral-50/30">
          <div className="flex justify-between text-neutral-500 font-medium">
            <span>Subtotal</span>
            <span>Rs. {invoice.subtotal}</span>
          </div>
          <div className="flex justify-between text-neutral-500 font-medium">
            <span>Shipping Cost</span>
            <span>{invoice.shippingFee === 0 ? "FREE" : `Rs. ${invoice.shippingFee}`}</span>
          </div>
          <div className="flex justify-between text-black font-black border-t border-neutral-200/60 pt-3 text-sm">
            <span>Grand Total</span>
            <span>Rs. {invoice.grandTotal}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
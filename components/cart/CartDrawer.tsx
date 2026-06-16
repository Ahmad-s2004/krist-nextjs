"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_CART_ITEMS = [
  { id: 1, title: "TRENDY WARM INSIDE FLEECE BEANIE", size: "M", price: 580, qty: 1, image: "https://images.unsplash.com/photo-1576871337622-98d48d435350?q=80&w=300" },
  { id: 3, title: "WOMEN EXCLUSIVE LINEN SOLID DRESS", size: "S", price: 2450, qty: 2, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300" }
];

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const subtotal = MOCK_CART_ITEMS.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className={`fixed inset-0 z-50 transition-visibility duration-300 ${isOpen ? "visible" : "invisible"}`}>
      <div 
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} 
        onClick={onClose} 
      />

      <div className={`absolute right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <h2 className="text-sm font-black uppercase tracking-widest text-black">Your Cart</h2>
            <span className="text-[10px] font-bold text-neutral-400">({MOCK_CART_ITEMS.length} Items)</span>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-neutral-100">
          {MOCK_CART_ITEMS.map((item, idx) => (
            <div key={item.id} className={`flex gap-4 text-xs font-medium tracking-wide ${idx !== 0 ? "pt-6" : ""}`}>
              <div className="relative w-20 h-24 bg-neutral-50 border border-neutral-100 overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.title} fill className="object-cover object-center" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div className="space-y-1">
                  <div className="flex justify-between gap-2">
                    <h4 className="font-bold text-black uppercase line-clamp-2">{item.title}</h4>
                    <span className="font-black text-black whitespace-nowrap">Rs. {item.price}</span>
                  </div>
                  <p className="text-neutral-400 text-[10px] font-bold uppercase">Size: {item.size}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-neutral-200">
                    <button className="px-2.5 py-1 text-neutral-400 hover:text-black transition-colors">-</button>
                    <span className="px-2 text-black font-bold text-[11px]">{item.qty}</span>
                    <button className="px-2.5 py-1 text-neutral-400 hover:text-black transition-colors">+</button>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 space-y-4">
          <div className="flex justify-between items-baseline text-xs tracking-wide">
            <span className="text-neutral-500 font-bold uppercase">Subtotal</span>
            <span className="text-sm font-black text-black">Rs. {subtotal}</span>
          </div>
          <div className="space-y-2 pt-2">
            <Link 
              href="/cart" 
              onClick={onClose}
              className="block w-full text-center bg-black text-white py-3.5 font-bold text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors rounded-none"
            >
              Open Full Shopping Cart
            </Link>
            <Link 
              href="/checkout" 
              onClick={onClose}
              className="block w-full text-center bg-transparent text-neutral-500 border border-neutral-200 py-3.5 font-bold text-xs tracking-widest uppercase hover:text-black hover:border-black transition-colors rounded-none"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
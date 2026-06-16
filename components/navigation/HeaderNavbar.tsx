"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Men", path: "/products/men" },
  { label: "Women", path: "/products/women" },
  { label: "Kids", path: "/products/kids" },
  { label: "Contact", path: "/contact" },
];

export default function HeaderNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname(); // Real-time route pipeline observer

  return (
    <div className="relative w-full font-sans">
      <nav className="relative w-full border-b border-gray-100 bg-white px-4 md:px-8 h-[73px] flex items-center">
        <div className="w-full flex items-center justify-between relative">
          
          {!isSearchOpen ? (
            <>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsOpen(true)}
                  className="p-1 transition-colors rounded-none lg:hidden hover:bg-gray-100 text-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
                <span className="text-2xl font-black tracking-widest text-black cursor-pointer select-none uppercase">Krist</span>
              </div>

              <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400 absolute left-1/2 transform -translate-x-1/2">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`relative pb-1.5 transition-colors duration-300 select-none ${
                        isActive ? "text-black" : "hover:text-black"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1 transition-colors hover:text-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
                
                <Link href="/cart" className="p-1 transition-colors hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.116 60.116 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </Link>

                <Link href="/signin" className="hidden px-5 py-2.5 text-xs font-bold text-white uppercase tracking-widest transition-colors bg-black rounded-none hover:bg-neutral-800 md:block">
                  Login
                </Link>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center gap-4 transition-all duration-300">
              <div className="relative flex-grow max-w-3xl mx-auto flex items-center bg-gray-50 border border-gray-200 rounded-none px-4 py-2 focus-within:border-neutral-400 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search for products, brands and more..." 
                  autoFocus
                  className="w-full bg-transparent text-xs font-bold uppercase tracking-wide text-black outline-none placeholder-gray-400"
                />
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-none transition-all duration-200 flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

        </div>
      </nav>
      
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      <div className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out rounded-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-xl font-black tracking-widest text-black uppercase">Krist</span>
          <button onClick={() => setIsOpen(false)} className="p-1 transition-colors rounded-none hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col py-2 text-xs font-bold uppercase tracking-widest text-gray-500">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`px-5 py-3.5 border-b border-gray-50 transition-colors ${
                  isActive ? "bg-gray-50 text-black" : "hover:bg-gray-50 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
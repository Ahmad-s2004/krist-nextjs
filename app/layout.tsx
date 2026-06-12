"use client";
import Link from "next/link";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-800">

        <div className="relative w-full font-sans">
          <nav className="relative w-full border-b border-gray-100 bg-white px-4 py-4 md:px-8">
            <div className="flex items-center justify-between md:grid md:grid-cols-3">
              <div className="flex items-center gap-3 justify-self-start">
                <button
                  onClick={() => setIsOpen(true)}
                  className="p-1 transition-colors rounded-md lg:hidden hover:bg-gray-100 text-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
                <span className="text-2xl font-bold tracking-wide text-black cursor-pointer">Krist</span>
              </div>
              <div className="hidden gap-6 text-md font-medium text-gray-600 md:flex justify-self-center">
                <Link href="/" className="text-black border-b-2 border-black pb-0.5">Home</Link>
                <Link href="/products/men" className="transition-colors hover:text-black">Men</Link>
                <Link href="/products/women" className="transition-colors hover:text-black">Women</Link>
                <Link href="/products/kids" className="transition-colors hover:text-black">Kids</Link>
                <Link href="/contact" className="transition-colors hover:text-black">Contact</Link>
              </div>
              <div className="flex items-center gap-4 text-gray-700 justify-self-end">
                <button className="p-1 transition-colors hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
                <button className="hidden p-1 transition-colors hover:text-black md:block">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>

                <button className="p-1 transition-colors hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.116 60.116 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </button>
                <button className="hidden px-5 py-2 text-sm font-medium text-white transition-colors bg-slate-900 rounded-md hover:bg-slate-800 md:block">
                  Login
                </button>
              </div>

            </div>
          </nav>
          <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsOpen(false)}
          />
          <div className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="text-xl font-bold tracking-wide text-black">Krist</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 transition-colors rounded-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col py-2 text-base font-medium text-gray-700">
              <Link href="/" onClick={() => setIsOpen(false)} className="px-5 py-3 border-b border-gray-50 bg-gray-50/50 text-black">Home</Link>
              <Link href="/products/men" onClick={() => setIsOpen(false)} className="px-5 py-3 border-b border-gray-50 transition-colors hover:bg-gray-50 hover:text-black">Men</Link>
              <Link href="/products/women" onClick={() => setIsOpen(false)} className="px-5 py-3 border-b border-gray-50 transition-colors hover:bg-gray-50 hover:text-black">Women</Link>
              <Link href="/products/kids" onClick={() => setIsOpen(false)} className="px-5 py-3 border-b border-gray-50 transition-colors hover:bg-gray-50 hover:text-black">Kids</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="px-5 py-3 transition-colors hover:bg-gray-50 hover:text-black">Contact</Link>
            </div>
          </div>
        </div>
        <main className="flex-1">
          {children}
        </main>

      </body>
    </html>
  );
}
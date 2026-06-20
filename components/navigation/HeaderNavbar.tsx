"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CartDrawer from "@/components/cart/CartDrawer";
import { useDispatch, useSelector, Provider } from "react-redux";
import { store, RootState } from "@/redux/store";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Men", path: "/products/men" },
  { label: "Women", path: "/products/women" },
  { label: "Kids", path: "/products/kids" },
  { label: "Contact", path: "/contact" },
];

function HeaderNavbarInner() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const totalWishlistCount = wishlistItems.length;

  useEffect(() => {
    setIsMounted(true);
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const authFlag = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(authFlag);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

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
                      className={`relative pb-1.5 transition-colors duration-300 select-none ${isActive ? "text-black" : "hover:text-black"
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
                <Link
                  href="/wishlist"
                  className="p-1 transition-colors hover:text-black relative flex items-center justify-center"
                  title="My Wishlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>

                  {isMounted && totalWishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center tracking-tighter border border-white">
                      {totalWishlistCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="p-1 transition-colors hover:text-black relative"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.116 60.116 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  {isMounted && totalItemsCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center tracking-tighter border border-white">
                      {totalItemsCount}
                    </span>
                  )}
                </button>

                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    className="hidden px-5 py-2.5 text-xs font-bold text-white uppercase tracking-widest transition-colors bg-black rounded-none hover:bg-neutral-800 md:block border border-black"
                  >
                    Account
                  </Link>
                ) : (
                  <Link
                    href="/signin"
                    className="hidden px-5 py-2.5 text-xs font-bold text-white uppercase tracking-widest transition-colors bg-black rounded-none hover:bg-neutral-800 md:block border border-black"
                  >
                    Login
                  </Link>
                )}
              </div>
            </>
          ) : (
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center gap-4 transition-all duration-300">
              <div className="relative flex-grow max-w-3xl mx-auto flex items-center bg-gray-50 border border-gray-200 rounded-none px-4 py-2 focus-within:border-neutral-400 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  autoFocus
                  className="w-full bg-transparent text-xs font-bold uppercase tracking-wide text-black outline-none placeholder-gray-400"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-none transition-all duration-200 flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
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
                className={`px-5 py-3.5 border-b border-gray-50 transition-colors ${isActive ? "bg-gray-50 text-black" : "hover:bg-gray-50 hover:text-black"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href={isLoggedIn ? "/dashboard" : "/signin"}
            onClick={() => setIsOpen(false)}
            className="px-5 py-3.5 border-b border-gray-50 bg-neutral-50 text-black md:hidden transition-colors font-black tracking-widest uppercase"
          >
            {isLoggedIn ? "My Account" : "Login / Register"}
          </Link>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default function HeaderNavbar() {
  return (
    <Provider store={store}>
      <HeaderNavbarInner />
    </Provider>
  );
}
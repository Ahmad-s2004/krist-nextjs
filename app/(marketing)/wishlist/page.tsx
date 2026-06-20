"use client";

import { useSelector, Provider } from "react-redux";
import { store, RootState } from "@/redux/store"; 
import ProductGrid from "@/components/products/ProductGrid";
import Link from "next/link";

function WishlistContent() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  
  const formattedProducts = wishlistItems.map((item) => ({
    _id: item.id,
    title: item.name,
    price: item.price,
    category: item.category || "Uncategorized",
    gallery: [{ img1: item.image }],
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-10">
      <div className="border-b border-neutral-200 pb-5 mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900">
            My Wishlist
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            You have {wishlistItems.length} items saved in your wishlist.
          </p>
        </div>
        
        <Link 
          href="/products" 
          className="text-xs font-bold uppercase tracking-wider text-neutral-900 underline hover:text-neutral-600 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-neutral-200 rounded-lg bg-neutral-50/50">
          <svg
            className="mx-auto h-12 w-12 text-neutral-300 stroke-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
          <h3 className="mt-4 text-sm font-bold text-neutral-900 uppercase tracking-wide">
            Your Wishlist is Empty
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            Tap the heart icon on any product to save it here.
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[11px] uppercase tracking-widest px-6 py-3 transition-colors duration-200"
            >
              Explore Products
            </Link>
          </div>
        </div>
      ) : (
        <ProductGrid products={formattedProducts} loading={false} />
      )}
    </div>
  );
}

export default function WishlistPageContent() {
  return (
    <Provider store={store}>
      <WishlistContent />
    </Provider>
  );
}
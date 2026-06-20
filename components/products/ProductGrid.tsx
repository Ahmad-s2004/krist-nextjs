"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector, Provider } from "react-redux";
import { store } from "@/redux/store"; 
import { addToWishlist, removeFromWishlist, WishlistItem } from "@/redux/wishlistSlice";
import { toggleWishlistAction } from "@/backend/services/wishlistService"; 
import { RootState } from "@/redux/store";

interface ProductType {
  _id: string;
  title: string;
  category: string;
  price: number;
  gallery?: { img1: string }[];
}

interface ProductGridProps {
  products: ProductType[];
  loading: boolean;
}

function ProductGridContent({ products, loading }: ProductGridProps) {
  const baseUri: string = process.env.NEXT_PUBLIC_IMG_URI || "https://krist-server.vercel.app";
  const dispatch = useDispatch();
  
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 animate-pulse">
        {[...Array(4)].map((_, index: number) => (
          <div key={index} className="flex flex-col h-full space-y-4">
            <div className="w-full aspect-[3/4] bg-neutral-100" />
            <div className="h-3 bg-neutral-100 w-2/3" />
            <div className="h-3 bg-neutral-100 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-gray-200">
        <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">
          No products match your custom parameters.
        </p>
      </div>
    );
  }

  const handleWishlistToggle = async (
    e: React.MouseEvent<HTMLButtonElement>, 
    product: ProductType, 
    finalSrc: string | null
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    const loggedIn: boolean = localStorage.getItem("isLoggedIn") === "true";
    const userId: string = localStorage.getItem("userId") || "";
    
    const isInWishlist: boolean = wishlistItems.some((item: WishlistItem) => item.id === product._id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      if (loggedIn && userId) {
        try {
          await toggleWishlistAction(userId, product._id);
        } catch (err) {
          console.error("Backend wishlist entry removal failed:", err);
        }
      }
    } else {
      const newItem: WishlistItem = {
        id: product._id,
        name: product.title,
        price: product.price,
        image: finalSrc || "",
        category: product.category,
      };

      dispatch(addToWishlist(newItem));
      if (loggedIn && userId) {
        try {
          await toggleWishlistAction(userId, product._id);
        } catch (err) {
          console.error("Backend wishlist entry addition failed:", err);
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
      {products.map((product: ProductType) => {
        const imageUrl: string | undefined = product?.gallery?.[0]?.img1;
        
        const cleanImageUrl: string | null = imageUrl 
          ? (imageUrl.startsWith("http") ? imageUrl : (imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`))
          : null;

        const finalSrc: string | null = cleanImageUrl
          ? (cleanImageUrl.startsWith("http") ? cleanImageUrl : `${baseUri}${cleanImageUrl}`)
          : null;

        const isFav: boolean = wishlistItems.some((item: WishlistItem) => item.id === product._id);
        
        return (
          <Link 
            key={product._id} 
            href={`/products/${product.category.toLowerCase()}/${product._id}`}
            className="group flex flex-col h-full relative"
          >
            <div className="relative w-full aspect-[3/4] bg-neutral-50 border border-neutral-100 overflow-hidden mb-4">
              {finalSrc ? (
                <Image 
                  src={finalSrc} 
                  alt={product.title} 
                  fill 
                  sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
              ) : (
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">No Image</span>
                </div>
              )}

              <button
                type="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleWishlistToggle(e, product, finalSrc)}
                className="absolute top-3 right-3 z-10 bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white p-2 rounded-full shadow-sm border border-neutral-100 transition-all duration-300 group/btn"
                aria-label="Toggle Wishlist"
              >
                <svg 
                  className={`w-3.5 h-3.5 transition-colors duration-200 ${isFav ? "fill-red-500 text-red-500 group-hover/btn:fill-red-400 group-hover/btn:text-red-400" : "fill-transparent text-current"}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </button>
            </div>

            <div className="space-y-1 flex-grow flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400 block">{product.category}</span>
                <h3 className="text-[11px] font-bold uppercase tracking-tight text-neutral-900 line-clamp-2">{product.title}</h3>
              </div>
              <p className="text-xs font-black pt-1">Rs. {product.price.toLocaleString()}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function ProductGrid(props: ProductGridProps) {
  return (
    <Provider store={store}>
      <ProductGridContent {...props} />
    </Provider>
  );
}
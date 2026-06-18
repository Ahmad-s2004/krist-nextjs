"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function ProductGrid({ products, loading }: ProductGridProps) {
  const baseUri = process.env.NEXT_PUBLIC_IMG_URI || "https://krist-server.vercel.app";

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 animate-pulse">
        {[...Array(4)].map((_, index) => (
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
      {products.map((product) => {
        const imageUrl = product?.gallery?.[0]?.img1;
        
        const cleanImageUrl = imageUrl 
          ? (imageUrl.startsWith("http") ? imageUrl : (imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`))
          : null;

        const finalSrc = cleanImageUrl
          ? (cleanImageUrl.startsWith("http") ? cleanImageUrl : `${baseUri}${cleanImageUrl}`)
          : null;
        
        return (
          <Link 
            key={product._id} 
            href={`/products/${product.category.toLowerCase()}/${product._id}`}
            className="group flex flex-col h-full"
          >
            <div className="relative w-full aspect-[3/4] bg-neutral-50 border border-neutral-100 overflow-hidden mb-4">
              {finalSrc ? (
                <Image 
                  src={finalSrc} 
                  alt={product.title} 
                  fill 
                  sizes="(max-w-768px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
              ) : (
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">No Image</span>
                </div>
              )}
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
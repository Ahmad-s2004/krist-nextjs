"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductGrid({ products, loading }) {
  if (!loading && products.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-gray-200">
        <p className="text-sm text-gray-400 font-medium tracking-wide">
          No products match your custom parameters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {loading
        ? Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="space-y-4 animate-pulse">
              <div className="w-full h-[380px] bg-gray-100 rounded-none" />
              <div className="h-4 bg-gray-100 w-3/4 rounded-none" />
              <div className="h-4 bg-gray-100 w-1/4 rounded-none" />
            </div>
          ))
        : products.map((product) => (
            <div key={product.id} className="flex flex-col group space-y-3">
              
              <Link 
                href={`/products/${product.category.toLowerCase()}/${product.id}`}
                className="relative h-[380px] bg-gray-50 border border-gray-100/60 overflow-hidden rounded-none cursor-pointer block"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-103 transition duration-500"
                />
              </Link>

              <div className="flex flex-col space-y-1 px-1">
                <Link 
                  href={`/products/${product.category.toLowerCase()}/${product.id}`}
                  className="hover:underline decoration-neutral-400 underline-offset-4"
                >
                  <h3 className="text-xs font-bold tracking-tight text-neutral-800 uppercase line-clamp-2 leading-tight cursor-pointer">
                    {product.title}
                  </h3>
                </Link>
                
                <div className="flex gap-2 items-baseline text-xs pt-0.5">
                  <span className="font-black text-black">Rs. {product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-gray-400 line-through font-medium">Rs. {product.originalPrice}</span>
                  )}
                </div>
              </div>

            </div>
          ))}
    </div>
  );
}
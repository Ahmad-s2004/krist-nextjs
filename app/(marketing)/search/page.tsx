import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductService } from "@/backend/services/productService";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

interface ProductType {
  _id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  gallery?: {
    img1: string;
    [key: string]: any;
  }[];
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (await searchParams).q || "";
  
  const filteredProducts: ProductType[] = await ProductService.searchProducts(query);

  return (
    <main className="min-h-screen bg-white py-12 px-4 lg:px-20 max-w-7xl mx-auto font-sans text-black">
      <div className="mb-10">
        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">Search Results</h1>
        <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">
          Showing {filteredProducts.length} items for: <span className="text-black font-black">"{query}"</span>
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-3">
          <h2 className="text-sm font-black uppercase tracking-wider text-neutral-400">No Products Found</h2>
          <p className="text-xs text-neutral-400 text-center">Try checking your spelling or use more general terms</p>
          <Link href="/" className="bg-black text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-widest border border-black hover:bg-transparent hover:text-black transition duration-300">
            Back To Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {filteredProducts.map((product) => (
            <Link 
              key={product._id} 
              href={`/products/${product.category.toLowerCase()}/${product._id}`}
              className="group flex flex-col h-full"
            >
              <div className="relative w-full aspect-[3/4] bg-neutral-50 border border-neutral-100 overflow-hidden mb-4">
                {product.gallery && (
                  <Image 
                  src={`https://krist-server.vercel.app/${product.gallery[0].img1}`}
                    alt={product.title} 
                    fill 
                    sizes="(max-w-768px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
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
          ))}
        </div>
      )}
    </main>
  );
}
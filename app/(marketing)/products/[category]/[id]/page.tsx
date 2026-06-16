"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ImageGallery from "@/components/product-detail/ImageGallery";
import ProductTabs from "@/components/product-detail/ProductTabs";
import QuantitySelector from "@/components/cart/QuantitySelector"; 

const MOCK_REPOSITORY = [
  { 
    id: "1", 
    title: "TRENDY WARM INSIDE FLEECE BEANIE", 
    price: 580, 
    originalPrice: 599, 
    sizes: ["S", "M", "L"],
    colors: ["Black", "Gray", "Navy"],
    description: "Engineered using high-density tailored premium micro-fleece fibers. This thermal winter unit maintains superior body insulation heat retention profiles while displaying raw minimal structure geometry accents.",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d435350?q=80&w=600",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600"
    ]
  },
  { 
    id: "3", 
    title: "WOMEN EXCLUSIVE LINEN SOLID DRESS", 
    price: 2450, 
    originalPrice: 2450, 
    sizes: ["XS", "S", "M", "L"],
    colors: ["Beige", "White"],
    description: "A premium structured summer essential built entirely using highly breathable raw pure local canvas linen variants. Handcrafted clean block lines align directly with high-end editorial catalog codes.",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600"
    ]
  }
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const match = MOCK_REPOSITORY.find((item) => item.id === id);
    if (match) {
      setProduct(match);
      setSelectedSize(match.sizes[0]);
      setSelectedColor(match.colors[0]);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Compiling Asset Matrix...</p>
        <div className="w-12 h-0.5 bg-neutral-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10 md:py-16 selection:bg-black selection:text-white flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
        
        <div className="lg:col-span-7 w-full">
          <ImageGallery images={product.images} title={product.title} />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 border-b border-gray-100 pb-5">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-black uppercase leading-tight">{product.title}</h1>
            <div className="flex gap-3 items-baseline pt-1">
              <span className="text-lg font-black text-black">Rs. {product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through font-medium">Rs. {product.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Color</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border rounded-none ${
                    selectedColor === color 
                      ? "bg-black text-white border-black" 
                      : "bg-white text-neutral-500 border-gray-200 hover:border-black hover:text-black"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Size</h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 flex items-center justify-center text-xs font-bold uppercase transition-all border rounded-none ${
                    selectedSize === size 
                      ? "bg-black text-white border-black" 
                      : "bg-white text-neutral-400 border-gray-200 hover:border-neutral-400 hover:text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Quantity</h3>
            <div className="inline-block">
              <QuantitySelector 
                quantity={quantity} 
                onIncrement={() => setQuantity(q => q + 1)} 
                onDecrement={() => setQuantity(q => Math.max(1, q - 1))} 
              />
            </div>
          </div>
          <div className="pt-4">
            <button className="w-full bg-black text-white border border-black py-4 font-bold text-xs tracking-widest uppercase hover:bg-transparent hover:text-black transition-all duration-300 rounded-none shadow-sm">
              Add To Bag
            </button>
          </div>

          <ProductTabs description={product.description} />

        </div>
      </div>
    </div>
  );
}
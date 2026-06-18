"use client";

import React, { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { addToCart } from "@/redux/cartSlice";
import QuantitySelector from "@/components/cart/QuantitySelector";

interface ClientWrapperProps {
  product: {
    id: string;
    title: string;
    price: number;
    originalPrice: number;
    sizes: string[];
    colors: string[];
    description: string;
    images: string[];
  };
  children: React.ReactNode;
}

function ProductDetailsInner({ product, children }: ClientWrapperProps) {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "S");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [quantity, setQuantity] = useState(1);

  const handleAddToBag = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0] || "",
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      })
    );
    setSelectedSize("S")
    setQuantity(1)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-6 w-full">
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
            onIncrement={() => setQuantity((q) => q + 1)}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
          />
        </div>
      </div>

      <div className="pt-4">
        <button 
          onClick={handleAddToBag}
          className="w-full bg-black text-white border border-black py-4 font-bold text-xs tracking-widest uppercase hover:bg-transparent hover:text-black transition-all duration-300 rounded-none shadow-sm"
        >
          Add To Bag
        </button>
      </div>

      {children}
    </div>
  );
}

export default function ProductDetailsClientWrapper(props: ClientWrapperProps) {
  return (
    <Provider store={store}>
      <ProductDetailsInner {...props} />
    </Provider>
  );
}
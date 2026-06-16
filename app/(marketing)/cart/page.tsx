"use client";

import { useState } from "react";
import Link from "next/link";
import CartItemRow from "@/components/cart/CartItemRow";
import OrderSummaryCard from "@/components/cart/OrderSummaryCard";
import Footer from '@/components/footer'

const INITIAL_CART_MOCK = [
  { id: 1, name: "TRENDY WARM INSIDE FUR BEANIE", color: "red", size: "small", originalPrice: 599, price: 581, quantity: 1, image: "/images/beanie.jpg" },
  { id: 2, name: "JUPITER KIDS DAZZLING UNISEX POLO", color: "black/red", size: "4-5", originalPrice: 799, price: 719, quantity: 1, image: "/images/polo.jpg" },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART_MOCK);

  const handleQuantityMutation = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateSubtotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
    <div className="min-h-[calc(100vh-73px)] w-full bg-white px-4 sm:px-6 lg:px-8 py-10 md:py-16 selection:bg-black selection:text-white flex justify-center">
      <div className="max-w-7xl w-full space-y-10 md:space-y-12">
        <div className="space-y-2 border-b border-gray-100 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide">You have {cartItems.length} curated {cartItems.length === 1 ? 'item' : 'items'} in your bag.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-gray-200 space-y-5">
            <p className="text-sm text-gray-400 font-medium tracking-wide">Your cart feels light. Let&apos;s add some products!</p>
            <Link href="/" className="inline-block bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="hidden md:grid grid-cols-12 pb-4 border-b border-gray-200 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              <div className="space-y-4 md:space-y-0 md:divide-y md:divide-gray-100">
                {cartItems.map((item) => (
                  <CartItemRow 
                    key={item.id} 
                    item={item} 
                    onQuantityChange={(amount) => handleQuantityMutation(item.id, amount)} 
                    onRemove={() => handleQuantityMutation(item.id, -item.quantity)} 
                  />
                ))}
              </div>
            </div>
            <OrderSummaryCard subtotal={calculateSubtotal()} />
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
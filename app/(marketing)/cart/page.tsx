"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { store, RootState } from "@/redux/store";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import Image from "next/image";
import Link from "next/link";
import QuantitySelector from "@/components/cart/QuantitySelector";
import { useRouter } from "next/navigation";
import AuthAlertModal from "@/components/ui/AuthAlertModal";
import Footer from "@/components/footer";


function CartPageInner() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleCheckoutClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      setIsAlertOpen(true);
    } else {
      router.push("/checkout");
    }
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharges = cartItems.length > 0 ? 250 : 0;
  const total = subtotal + deliveryCharges;

  const handleQuantityChange = (id: string, size: string, color: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      dispatch(updateQuantity({ id, size, color, quantity: newQty }));
    }
  };

  const handleRemove = (id: string, size: string, color: string) => {
    dispatch(removeFromCart({ id, size, color }));
  };

  if (!isMounted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 font-sans text-black">
        <div className="w-12 h-0.5 bg-neutral-200 animate-pulse" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 font-sans text-black">
        <h2 className="text-xl font-black uppercase tracking-tight">Your Bag is Empty</h2>
        <p className="text-xs text-neutral-400 uppercase tracking-widest">Add items to get started</p>
        <Link 
          href="/" 
          className="bg-black text-white px-8 py-3 text-xs font-black uppercase tracking-widest border border-black hover:bg-transparent hover:text-black transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
    <main className="min-h-screen bg-white py-12 px-4 lg:px-20 max-w-7xl mx-auto font-sans text-black selection:bg-black selection:text-white">
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-10">Your Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-6">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 sm:gap-6 pb-6 border-b border-neutral-100 items-start">
              <div className="relative w-24 h-32 bg-gray-50 border border-neutral-100 overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.title} fill className="object-cover object-top" />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-tight text-neutral-900 line-clamp-2 max-w-md">{item.title}</h3>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 space-y-0.5">
                    <p>Size: <span className="text-black">{item.size}</span></p>
                    <p>Color: <span className="text-black">{item.color}</span></p>
                  </div>
                  <div className="pt-2">
                    <QuantitySelector 
                      quantity={item.quantity}
                      onIncrement={() => handleQuantityChange(item.id, item.size, item.color, item.quantity, 1)}
                      onDecrement={() => handleQuantityChange(item.id, item.size, item.color, item.quantity, -1)}
                    />
                  </div>
                </div>
                
                <div className="flex sm:flex-col justify-between sm:items-end flex-row items-center h-full sm:min-h-[110px]">
                  <p className="text-sm font-black">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  <button 
                    onClick={() => handleRemove(item.id, item.size, item.color)}
                    className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition underline sm:no-underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 bg-gray-50 p-6 space-y-6 border border-neutral-100">
          <h2 className="text-sm font-black uppercase tracking-wider border-b border-neutral-200 pb-3">Order Summary</h2>
          
          <div className="space-y-3 text-xs font-bold uppercase tracking-wider text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-black font-black">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-black font-black">Rs. {deliveryCharges.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-4 text-sm text-black font-black">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
          
          <button onClick={handleCheckoutClick} className="w-full bg-black text-white border border-black py-4 text-xs font-black uppercase tracking-widest hover:bg-transparent hover:text-black transition duration-300">
            Proceed To Checkout
          </button>
          <AuthAlertModal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
}

export default function CartPage() {
  return (
    <Provider store={store}>
      <CartPageInner />
    </Provider>
  );
}
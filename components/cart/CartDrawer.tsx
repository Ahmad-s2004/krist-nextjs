"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { store, RootState } from "@/redux/store";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import Link from "next/link";
import Image from "next/image";
import AuthAlertModal from "../ui/AuthAlertModal";
import { useRouter } from "next/navigation";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartDrawerInner({ isOpen, onClose }: CartDrawerProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isMounted, setIsMounted] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleCheckoutClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      setIsAlertOpen(true);
    } else {
      onClose();
      router.push("/checkout");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (id: string, size: string, color: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      dispatch(updateQuantity({ id, size, color, quantity: newQty }));
    }
  };

  const handleRemove = (id: string, size: string, color: string) => {
    dispatch(removeFromCart({ id, size, color }));
  };

  if (!isMounted) return null;

  return (
    <div className={`fixed inset-0 z-50 transition-visibility duration-300 ${isOpen ? "visible" : "invisible"}`}>
      <div 
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} 
        onClick={onClose} 
      />

      <div className={`absolute right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <h2 className="text-sm font-black uppercase tracking-widest text-black">Your Cart</h2>
            <span className="text-[10px] font-bold text-neutral-400">({cartItems.length} Items)</span>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-neutral-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-2 text-neutral-400">
              <p className="text-xs uppercase font-bold tracking-wider">Your bag is empty</p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className={`flex gap-4 text-xs font-medium tracking-wide ${idx !== 0 ? "pt-6" : ""}`}>
                <div className="relative w-20 h-24 bg-neutral-50 border border-neutral-100 overflow-hidden flex-shrink-0">
                  {item.image && (
                    <Image src={item.image} alt={item.title} fill className="object-cover object-top" />
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="space-y-1">
                    <div className="flex justify-between gap-2">
                      <h4 className="font-bold text-black uppercase line-clamp-2 max-w-[180px]">{item.title}</h4>
                      <span className="font-black text-black whitespace-nowrap">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <div className="text-[10px] font-bold uppercase text-neutral-400 space-y-0.5">
                      <p>Size: <span className="text-black">{item.size}</span></p>
                      <p>Color: <span className="text-black">{item.color}</span></p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-neutral-200">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity, -1)}
                        className="px-2.5 py-1 text-neutral-400 hover:text-black transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 text-black font-bold text-[11px]">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity, 1)}
                        className="px-2.5 py-1 text-neutral-400 hover:text-black transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id, item.size, item.color)}
                      className="text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 space-y-4">
          <div className="flex justify-between items-baseline text-xs tracking-wide">
            <span className="text-neutral-500 font-bold uppercase">Subtotal</span>
            <span className="text-sm font-black text-black">Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="space-y-2 pt-2">
            <Link 
              href="/cart" 
              onClick={onClose}
              className="block w-full text-center bg-black text-white py-3.5 font-bold text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors rounded-none"
            >
              Open Full Shopping Cart
            </Link>
            <button
              onClick={handleCheckoutClick}
              className="block w-full text-center bg-transparent text-neutral-500 border border-neutral-200 py-3.5 font-bold text-xs tracking-widest uppercase hover:text-black hover:border-black transition-colors rounded-none"
            >
              Proceed To Checkout
            </button>
            <AuthAlertModal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer(props: CartDrawerProps) {
  return (
    <Provider store={store}>
      <CartDrawerInner {...props} />
    </Provider>
  );
}
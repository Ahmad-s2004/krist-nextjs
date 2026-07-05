"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createOrder } from "@/backend/services/orderService";

interface ICartItem {
  id: string | number;
  productId?: string;
  _id?: string;
  title: string;
  size?: string;
  color?: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
    paymentMethod: "cod"
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("krist_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity
    , 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const mockUserId = "65aef1234567890123456789";

      const formattedItems = cartItems.map(item => ({
        productId: item.productId || item._id || String(item.id),
        quantity: item.quantity
        ,
        size: item.size || "M",
        color: item.color || "Default"
      }));

      const payload = {
        userId: mockUserId,
        items: formattedItems,
        firstName: formData.firstName,
        lastName: formData.lastName,
        streetAddress: formData.address,
        city: formData.city,
        phoneNo: formData.phone,
        subtotal,
        shippingCost: shipping,
        totalPrice: total
      };

      const response = await createOrder(payload as any);

      if (response && response.success) {
        localStorage.removeItem("krist_cart");
        const trackingId = response.data?.trackingId || "";
        router.push(`/checkout/success?trackingID:${trackingId}`);
      } else {
        setError(response?.message || "Something went wrong.");
      }
    } catch (err: any) {
      setError(err?.message || "Internal server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-black selection:bg-black selection:text-white flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        <div className="lg:col-span-7 space-y-8">
          <div className="border-b border-neutral-100 pb-4">
            <h1 className="text-xl font-black tracking-tight uppercase">Checkout</h1>
            <p className="text-xs text-gray-400 font-medium tracking-wide pt-0.5">Verify your delivery mapping credentials below.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Shipping Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 px-4 py-2.5 text-xs font-medium focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Payment Gateway Selection</h3>
              <div className="grid grid-cols-1 gap-3">
                <label className="border border-black p-4 flex items-center justify-between cursor-pointer bg-neutral-50/50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="accent-black h-3.5 w-3.5"
                    />
                    <span className="text-xs font-bold uppercase tracking-wide">Cash On Delivery (COD)</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Default</span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || cartItems.length === 0}
                className="w-full bg-black text-white py-4 font-black text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5 bg-neutral-50/60 border border-neutral-100 p-6 md:p-8 space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-neutral-100 pb-3">Manifest Summary</h3>

          <div className="divide-y divide-neutral-100 overflow-y-auto max-h-[240px] pr-2">
            {cartItems.length === 0 ? (
              <p className="text-xs text-neutral-400 font-medium py-4">Your checklist is empty.</p>
            ) : (
              cartItems.map((item, idx) => (
                <div key={item.id} className={`flex gap-4 text-xs font-medium tracking-wide ${idx !== 0 ? "pt-4 mt-4" : ""}`}>
                  <div className="relative w-12 h-16 bg-white border border-neutral-200 overflow-hidden flex-shrink-0">
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill className="object-cover object-center" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-0.5">
                    <h4 className="font-bold uppercase line-clamp-1 text-neutral-900">{item.title}</h4>
                    <p className="text-neutral-400 text-[10px] font-bold uppercase">Size: {item.size || "Standard"} &nbsp;|&nbsp; quantity
                      : {item.quantity? item.quantity:1}</p>
                  </div>
                  <span className="font-black text-neutral-900 self-center">Rs. {Number(item.price) * Number(item.quantity)}</span>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-neutral-200/60 pt-4 space-y-3 text-xs tracking-wide">
            <div className="flex justify-between text-neutral-500 font-medium">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between text-neutral-500 font-medium">
              <span>Shipping Fee</span>
              <span>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
            </div>
            <div className="flex justify-between text-black font-black border-t border-neutral-200 pt-3 text-sm uppercase tracking-tight">
              <span>Grand Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
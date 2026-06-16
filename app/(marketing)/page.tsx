"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; 
import Footer from '../../components/footer/index';

export default function page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      
      <section className="bg-[#f3f4f6] relative overflow-hidden px-4 py-12 md:py-24 lg:px-20 flex flex-col md:flex-row items-center justify-between min-h-[500px]">
        <div className="max-w-xl z-10 space-y-4 md:space-y-6 text-center md:text-left">
          <p className="text-lg md:text-xl font-medium text-gray-700">Classic Exclusive</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black">
            Women’s Collection
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-gray-600">UPTO 40% OFF</p>
          <button className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition inline-flex items-center gap-2 mx-auto md:mx-0">
            Shop Now <span>→</span>
          </button>
        </div>
        
        <div className="relative w-full md:w-1/2 h-[400px] md:h-[550px] mt-8 md:mt-0">
          {loading ? (
            <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg" />
          ) : (
            <div className="relative w-full h-full">
              <div className="absolute top-4 left-4 right-4 bottom-4 border-4 border-white z-10 pointer-events-none hidden md:block"></div>
              <Image 
                src="/images/hero-woman.jpg"
                alt="Women's Collection Hero"
                fill
                priority
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 lg:px-20 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-black">Shop by Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Kids', 'Women', 'Men'].map((category, index) => (
            <div key={index} className="relative h-[350px] md:h-[450px] group overflow-hidden rounded-lg bg-gray-100">
              {loading ? (
                <div className="w-full h-full bg-gray-300 animate-pulse" />
              ) : (
                <>
                  <Image 
                    src={`/images/category-${category.toLowerCase()}.jpg`}
                    alt={`${category} Category`}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <span className="bg-white text-black px-6 py-2 rounded-md font-medium text-sm shadow-md uppercase tracking-wider block text-center min-w-[120px]">
                      {category}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 lg:px-20 max-w-7xl mx-auto border-t border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-black">Our Bestsellers</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { id: 1, title: 'JUPITER KIDS SQUIGGLY UNISEX TRACK PANT', price: 'Rs. 1,350' },
            { id: 2, title: 'JUPITER KIDS SUPERSTAR PREMIUM T-SHIRT', price: 'Rs. 890' },
            { id: 3, title: 'JUPITER KIDS DAZZLING UNISEX POLO', price: 'Rs. 790' },
            { id: 4, title: 'JUPITER KIDS TRACK SUIT / TWIN SET FOR KIDS', price: 'Rs. 2,500' },
            { id: 5, title: 'JUPITER KIDS UNISEX POCKET TERRY CARGO TROUSER', price: 'Rs. 1,190' },
            { id: 6, title: 'JUPITER KIDS ABLAZE UNISEX TRACK PAIR', price: 'Rs. 1,450' },
          ].map((product) => (
            <div key={product.id} className="flex flex-col group">
              <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden w-full">
                {loading ? (
                  <div className="w-full h-full bg-gray-300 animate-pulse" />
                ) : (
                  <Image 
                    src={`/images/product-${product.id}.jpg`}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-102 transition duration-300"
                  />
                )}
              </div>
              
              <div className="mt-4 flex flex-col justify-between flex-grow space-y-1">
                {loading ? (
                  <div className="space-y-2 py-1">
                    <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <h3 className="text-xs md:text-sm font-semibold tracking-tight text-gray-800 uppercase line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm font-bold text-black">{product.price}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-t border-b border-gray-200 py-10 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'Free shipping for order above 2000' },
            { icon: '🛡️', title: 'Money Guarantee', desc: 'Within 20 days for an exchange' },
            { icon: '🎧', title: 'Online Support', desc: '24 hours a day, 7 days a week' },
            { icon: '💳', title: 'Flexible Payment', desc: 'Pay with multiple credit cards' },
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center p-2 space-y-2">
              <span className="text-2xl mb-1">{feature.icon}</span>
              <h4 className="text-sm font-bold text-black uppercase tracking-wider">{feature.title}</h4>
              <p className="text-xs text-gray-500 max-w-[200px]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
          <Footer/>

    </div>
  );
}
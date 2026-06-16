'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; 

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans antialiased">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#f3f4f6] px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-center md:text-left order-2 md:order-1 flex flex-col justify-center items-center md:items-start">
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-gray-500 uppercase">
              Classic Exclusive
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
              Women’s Collection
            </h1>
            <p className="text-lg sm:text-xl font-bold text-gray-600 tracking-wide">
              UPTO 40% OFF
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-none text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-all duration-300 transform active:scale-95 inline-flex items-center gap-2">
              Shop Now <span>→</span>
            </button>
          </div>
          
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/5] lg:aspect-[1 disguise] order-1 md:order-2 overflow-hidden rounded-none">
            {loading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            ) : (
              <div className="relative w-full h-full">
                <div className="absolute inset-4 border border-white/40 z-10 pointer-events-none hidden sm:block"></div>
                <Image 
                  src="/images/hero-woman.jpg"
                  alt="Women's Collection Hero"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 2. SHOP BY CATEGORIES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-7xl w-full space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">
              Shop by Categories
            </h2>
            <div className="w-12 h-0.5 bg-black mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {['Kids', 'Women', 'Men'].map((category, index) => (
              <div 
                key={index} 
                className={`relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] group overflow-hidden bg-gray-50 border border-gray-100 ${
                  index === 2 ? 'col-span-2 md:col-span-1 mx-auto w-1/2 md:w-full aspect-[3/4]' : 'w-full'
                }`}
              >
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : (
                  <>
                    <Image 
                      src={`/images/category-${category.toLowerCase()}.jpg`}
                      alt={`${category} Category`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
                    <div className="absolute bottom-4 inset-x-4 flex justify-center">
                      <span className="w-full max-w-[140px] bg-white text-black py-2 text-center font-bold text-xs tracking-widest uppercase shadow-sm border border-gray-100 transform group-hover:-translate-y-1 transition-transform duration-300">
                        {category}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. OUR BESTSELLERS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 flex justify-center border-t border-gray-100">
        <div className="max-w-7xl w-full space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">
              Our Bestsellers
            </h2>
            <div className="w-12 h-0.5 bg-black mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { id: 1, title: 'JUPITER KIDS SQUIGGLY UNISEX TRACK PANT', price: 'Rs. 1,350' },
              { id: 2, title: 'JUPITER KIDS SUPERSTAR PREMIUM T-SHIRT', price: 'Rs. 890' },
              { id: 3, title: 'JUPITER KIDS DAZZLING UNISEX POLO', price: 'Rs. 790' },
              { id: 4, title: 'JUPITER KIDS TRACK SUIT / TWIN SET FOR KIDS', price: 'Rs. 2,500' },
              { id: 5, title: 'JUPITER KIDS UNISEX POCKET TERRY CARGO TROUSER', price: 'Rs. 1,190' },
              { id: 6, title: 'JUPITER KIDS ABLAZE UNISEX TRACK PAIR', price: 'Rs. 1,450' },
            ].map((product) => (
              <div key={product.id} className="flex flex-col group space-y-3">
                
                <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden w-full border border-gray-100">
                  {loading ? (
                    <div className="w-full h-full bg-gray-200 animate-pulse" />
                  ) : (
                    <Image 
                      src={`/images/product-${product.id}.jpg`}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                    />
                  )}
                </div>
                
                <div className="flex flex-col flex-grow space-y-1 px-1">
                  {loading ? (
                    <div className="space-y-2 py-1">
                      <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xs font-bold tracking-tight text-gray-800 uppercase line-clamp-2 min-h-[2rem] leading-tight group-hover:text-black transition-colors duration-200">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-black text-black tracking-wide">
                        {product.price}
                      </p>
                    </>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FEATURES BAR */}
      <section className="bg-white border-t border-b border-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-7xl w-full grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'Free shipping for order above 2000' },
            { icon: '🛡️', title: 'Money Guarantee', desc: 'Within 20 days for an exchange' },
            { icon: '🎧', title: 'Online Support', desc: '24 hours a day, 7 days a week' },
            { icon: '💳', title: 'Flexible Payment', desc: 'Pay with multiple credit cards' },
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-2 group">
              <div className="text-2xl md:text-3xl transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xs font-bold text-black uppercase tracking-widest">
                {feature.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 max-w-[180px] sm:max-w-[220px] leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
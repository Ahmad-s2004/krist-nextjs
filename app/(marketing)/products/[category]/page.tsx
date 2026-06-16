"use client";

import React, { useState, useEffect } from "react";
import FilterPanel from "@/components/products/FilterPanel";
import ProductGrid from "@/components/products/ProductGrid";
import SortDropdown from "@/components/products/SortDropdown";

const MOCK_PRODUCTS = [
  { 
    id: 1, 
    title: 'TRENDY WARM INSIDE FLEECE BEANIE', 
    category: 'Men', 
    size: 'M', 
    price: 580, 
    originalPrice: 599, 
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600'  
  },
  { 
    id: 2, 
    title: 'JUPITER KIDS DAZZLING UNISEX POLO', 
    category: 'Kids', 
    size: '4-5', 
    price: 790, 
    originalPrice: 990, 
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=600' 
  },
  { 
    id: 3, 
    title: 'WOMEN EXCLUSIVE LINEN SOLID DRESS', 
    category: 'Women', 
    size: 'S', 
    price: 2450, 
    originalPrice: 2450, 
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600' 
  },
  { 
    id: 4, 
    title: 'URBAN OVERSIZED COTTON HOODIE', 
    category: 'Men', 
    size: 'L', 
    price: 1850, 
    originalPrice: 2200, 
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600' 
  },
  { 
    id: 5, 
    title: 'CLASSIC VINTAGE LEATHER JACKET', 
    category: 'Men', 
    size: 'XL', 
    price: 2990, 
    originalPrice: 3500, 
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600' 
  },
  { 
    id: 6, 
    title: 'MINIMALIST SUMMER COTTON TEE', 
    category: 'Women', 
    size: 'M', 
    price: 650, 
    originalPrice: 850, 
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600' 
  },
  { 
    id: 7, 
    title: 'JUPITER KIDS SQUIGGLY TRACK PANT', 
    category: 'Kids', 
    size: '5-6', 
    price: 1350, 
    originalPrice: 1500, 
    image: 'https://images.unsplash.com/photo-1622290319146-7b63df48a635?q=80&w=600' 
  },
  { 
    id: 8, 
    title: 'PREMIUM WOOL KNIT SWEATER', 
    category: 'Women', 
    size: 'L', 
    price: 1950, 
    originalPrice: 1950, 
    image: 'https://images.unsplash.com/photo-1574164904299-3a102b110380?q=80&w=600' 
  },
  { 
    id: 9, 
    title: 'ELEGANT CASUAL BLAZER COAT', 
    category: 'Women', 
    size: 'XS', 
    price: 2800, 
    originalPrice: 3200, 
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600' 
  },
  { 
    id: 10, 
    title: 'JUPITER KIDS COZY TWIN SWEATSHIRT', 
    category: 'Kids', 
    size: '4-5', 
    price: 1190, 
    originalPrice: 1190, 
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600' 
  },
  { 
    id: 11, 
    title: 'ATHLETIC DRY-FIT TRAINING SHIRT', 
    category: 'Men', 
    size: 'S', 
    price: 950, 
    originalPrice: 1200, 
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600' 
  },
  { 
    id: 12, 
    title: 'JUPITER KIDS DENIM COMFORT JACKET', 
    category: 'Kids', 
    size: '5-6', 
    price: 1650, 
    originalPrice: 1850, 
    image: 'https://images.unsplash.com/photo-1611428813653-aa606c998586?q=80&w=600' 
  }
];

export default function page() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("");
  const [priceRange, setPriceRange] = useState(3000);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 0);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSize, priceRange, sortBy]);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSize = !selectedSize || product.size === selectedSize;
    const matchesPrice = product.price <= priceRange;
    return matchesCategory && matchesSize && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen w-full bg-white px-4 sm:px-6 lg:px-8 py-10 md:py-16 selection:bg-black selection:text-white flex justify-center">
      <div className="max-w-7xl w-full space-y-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-black uppercase">Catalog</h1>
            <p className="text-xs text-gray-400 font-medium tracking-wide">Showing {filteredProducts.length} premium deliverables</p>
          </div>
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-12 items-start">
          
          <FilterPanel 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>

        </div>

      </div>
    </div>
  );
}
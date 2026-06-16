"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';
import Footer from '@/components/footer';


const CategoryGrid = dynamic(() => import('@/components/home/CategoryGrid'), {
  loading: () => <div className="h-[400px] w-full bg-gray-50 animate-pulse" />,
});

const BestSellers = dynamic(() => import('@/components/home/BestSellers'), {
  loading: () => <div className="h-[500px] w-full bg-gray-50 animate-pulse" />,
});

const ServiceFeatures = dynamic(() => import('@/components/home/ServiceFeatures'), {
  loading: () => <div className="h-[150px] w-full bg-gray-50 animate-pulse" />,
});

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      <HeroSection loading={loading} />
      <CategoryGrid loading={loading} />
      <BestSellers loading={loading} />
      <ServiceFeatures />
    </div>
    <Footer/>
    </>
  );
}
import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';
import Footer from '@/components/footer';
import BestSellers from '@/components/home/BestSellers';

const CategoryGrid = dynamic(() => import('@/components/home/CategoryGrid'), {
  loading: () => <div className="h-[400px] w-full bg-gray-50 animate-pulse" />,
});

const ServiceFeatures = dynamic(() => import('@/components/home/ServiceFeatures'), {
  loading: () => <div className="h-[150px] w-full bg-gray-50 animate-pulse" />,
});

export default function HomePage() {
  return (
    <>
      <div className="bg-white min-h-screen selection:bg-black selection:text-white">
        <HeroSection loading={false} />
        <CategoryGrid loading={false} />
        <BestSellers />
        <ServiceFeatures />
      </div>
      <Footer />
    </>
  );
}
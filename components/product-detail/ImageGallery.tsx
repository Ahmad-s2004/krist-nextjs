"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  // Database format ke mutabik proper structure define kiya
  images: { img1: string }[] | string[] | any;
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const baseUri = process.env.NEXT_PUBLIC_IMG_URI || "https://krist-server.vercel.app";
  
  // Active index track karna sab se safe approach hai arrays ke liye
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Safety net check agar images data invalid ho ya empty ho
  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <div className="w-full aspect-[3/4] bg-neutral-100 flex items-center justify-center border">
        <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">No Preview Available</span>
      </div>
    );
  }

  // Helper function taake nested object ho ya plain string path, sahi url extract ho sake
  const getCleanUrl = (imgItem: any): string => {
    if (!imgItem) return "";
    const rawPath = typeof imgItem === "object" ? imgItem?.img1 : imgItem;
    if (!rawPath) return "";
    
    const cleanPath = rawPath.startsWith("http") 
      ? rawPath 
      : (rawPath.startsWith("/") ? rawPath : `/${rawPath}`);
      
    return cleanPath.startsWith("http") ? cleanPath : `${baseUri}${cleanPath}`;
  };

  const activeImageSrc = getCleanUrl(images[activeIndex]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-6 font-sans">
      {/* Thumbnails Sidebar */}
      <div className="flex md:flex-col gap-3 flex-shrink-0 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
        {images.map((img: any, idx: number) => {
          const thumbSrc = getCleanUrl(img);
          if (!thumbSrc) return null;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-20 bg-neutral-50 border transition-all duration-200 flex-shrink-0 rounded-none overflow-hidden ${
                activeIndex === idx
                  ? "border-black ring-1 ring-black"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <Image
                src={thumbSrc}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover object-top"
              />
            </button>
          );
        })}
      </div>

      {/* Main Display Image */}
      <div className="relative w-full aspect-[3/4] bg-neutral-50 border border-neutral-100/60 rounded-none overflow-hidden">
        {activeImageSrc ? (
          <Image
            src={activeImageSrc}
            alt={title}
            fill
            priority
            sizes="(max-w-768px) 100vw, 50vw"
            className="object-cover object-top transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
            <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Image Error</span>
          </div>
        )}
      </div>
    </div>
  );
}
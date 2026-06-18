"use client";
import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[] | { img1: string }[] | any;
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || "");

  if (!images || !Array.isArray(images)) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-6">
      <div className="flex md:flex-col gap-3 flex-shrink-0">
      {images.map((img: any, idx: number) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`relative w-16 h-20 bg-gray-50 border rounded-none overflow-hidden transition-all duration-200 ${
              activeImage === img ? "border-black ring-1 ring-black" : "border-gray-200 hover:border-neutral-400"
            }`}
          >
            <Image src={img} alt={`${title} thumb ${idx}`} fill className="object-cover object-center" />
          </button>
        ))}
      </div>

      <div className="relative w-full aspect-[3/4] bg-gray-50 border border-gray-100/60 rounded-none overflow-hidden">
        {activeImage && (
          <Image
            src={activeImage}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-all duration-300"
          />
        )}
      </div>
    </div>
  );
}
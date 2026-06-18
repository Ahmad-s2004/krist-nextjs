import React from "react";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/product-detail/ImageGallery";
import ProductTabs from "@/components/product-detail/ProductTabs";
import QuantitySelector from "@/components/cart/QuantitySelector";
import ProductDetailsClientWrapper from "@/components/product-detail/ProductDetailsClientWrapper";
import { getProductById } from "@/backend/services/productService";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const API_URL = "https://krist-server.vercel.app";

  let dbProduct: any = null;
  try {
    dbProduct = await getProductById(id);
  } catch (error) {
    console.error(error);
  }

  if (!dbProduct || dbProduct.status === "error") {
    notFound();
  }

  const imgPath1 = dbProduct.gallery?.[0]?.img1 || "";
  const imgPath2 = dbProduct.gallery?.[0]?.img2 || "";

  const primaryImage = imgPath1.startsWith("http") ? imgPath1 : `${API_URL}/${imgPath1}`;
  const secondaryImage = imgPath2 ? (imgPath2.startsWith("http") ? imgPath2 : `${API_URL}/${imgPath2}`) : null;

  const productImages = secondaryImage ? [primaryImage, secondaryImage] : [primaryImage];

  const product = {
    id: dbProduct._id.toString(),
    title: dbProduct.title,
    price: dbProduct.price,
    originalPrice: dbProduct.salePercent ? Math.round(dbProduct.price / (1 - dbProduct.salePercent / 100)) : dbProduct.price,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Default Color"],
    description: dbProduct.description || "Premium apparel unit crafted with precise tailoring and dynamic detailing protocols.",
    images: productImages,
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10 md:py-16 selection:bg-black selection:text-white flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
        
        <div className="lg:col-span-7 w-full">
          <ImageGallery images={product.images} title={product.title} />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 border-b border-gray-100 pb-5">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-black uppercase leading-tight">
              {product.title}
            </h1>
            <div className="flex gap-3 items-baseline pt-1">
              <span className="text-lg font-black text-black">Rs. {product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through font-medium">Rs. {product.originalPrice}</span>
              )}
            </div>
          </div>

          <ProductDetailsClientWrapper product={product}>
            <ProductTabs description={product.description} />
          </ProductDetailsClientWrapper>

        </div>
      </div>
    </div>
  );
}
import React from "react";
import FilterPanel from "@/components/products/FilterPanel";
import ProductGrid from "@/components/products/ProductGrid";
import SortDropdown from "@/components/products/SortDropdown";
import { getProductsByCategory } from "@/backend/services/productService";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopCategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const currentSize = (resolvedSearchParams.size as string) || "";
  const currentPriceRange = Number(resolvedSearchParams.price) || 5000;
  const currentSortBy = (resolvedSearchParams.sort as string) || "default";

  let products = [];
  try {
    products = await getProductsByCategory(category);
  } catch (error) {
    console.error("Failed to load items from server stack:", error);
  }

  const filteredProducts = products
    .filter((product: any) => {
      const matchesSize = !currentSize || product.size.includes(currentSize);
      const matchesPrice = product.price <= currentPriceRange;
      return matchesSize && matchesPrice;
    })
    .sort((a: any, b: any) => {
      if (currentSortBy === "price-low") return a.price - b.price;
      if (currentSortBy === "price-high") return b.price - a.price;
      return 0;
    });
    const plainProducts = JSON.parse(JSON.stringify(filteredProducts));

  return (
    <div className="min-h-screen w-full bg-white px-4 sm:px-6 lg:px-8 py-10 md:py-16 selection:bg-black selection:text-white flex justify-center font-sans">
      <div className="max-w-7xl w-full space-y-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-black uppercase">
              {category}&apos;s Catalog
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">
              Showing {filteredProducts.length} premium deliverables
            </p>
          </div>
          <SortDropdown currentSortBy={currentSortBy} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-12 items-start">

          <FilterPanel
            currentSize={currentSize}
            currentPriceRange={currentPriceRange}
          />

          <div className="lg:col-span-3">
            <ProductGrid products={plainProducts} loading={false} />
          </div>

        </div>

      </div>
    </div>
  );
}
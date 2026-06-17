import Image from 'next/image';
import Link from 'next/link';
import { getKidsBestSellers } from "@/backend/services/productService";

interface IProduct {
  _id: any;
  title: string;
  price: number;
  gallery: Array<{ img1: string; img2?: string }>;
}

export default async function BestSellers() {
  const API_URL = "https://krist-server.vercel.app";
  let kidsProducts: IProduct[] = [];

  try {
    const data = await getKidsBestSellers();
    kidsProducts = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Database fetch failed inside BestSellers component:", error);
  }

  if (kidsProducts.length === 0) return null;

  return (
    <section className="py-16 px-4 lg:px-20 max-w-7xl mx-auto border-t border-gray-100 space-y-10 font-sans">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">Our Bestsellers</h2>
        <div className="w-8 h-0.5 bg-black mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {kidsProducts.map((product) => {
          const imgPath = product.gallery?.[0]?.img1 || "";
          const imageSrc = imgPath.startsWith("http") ? imgPath : `${API_URL}/${imgPath}`;

          return (
            <Link 
              key={product._id.toString()} 
              href={`/products/details/${product._id.toString()}`}
              className="flex flex-col group space-y-3"
            >
              <div className="relative h-[400px] bg-gray-50 border border-gray-100 overflow-hidden w-full rounded-none">
                <Image 
                  src={imageSrc}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-103 transition duration-500"
                />
              </div>
              
              <div className="flex flex-col flex-grow space-y-1 px-1">
                <h3 className="text-xs font-bold tracking-tight text-neutral-800 uppercase line-clamp-2 leading-tight group-hover:underline">
                  {product.title}
                </h3>
                <p className="text-xs font-black text-black tracking-wide">Rs. {product.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
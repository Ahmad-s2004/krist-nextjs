import Image from 'next/image';

const PRODUCTS_MOCK = [
  { id: 1, title: 'JUPITER KIDS SQUIGGLY UNISEX TRACK PANT', price: 'Rs. 1,350' },
  { id: 2, title: 'JUPITER KIDS SUPERSTAR PREMIUM T-SHIRT', price: 'Rs. 890' },
  { id: 3, title: 'JUPITER KIDS DAZZLING UNISEX POLO', price: 'Rs. 790' },
  { id: 4, title: 'JUPITER KIDS TRACK SUIT / TWIN SET FOR KIDS', price: 'Rs. 2,500' },
  { id: 5, title: 'JUPITER KIDS UNISEX POCKET TERRY CARGO TROUSER', price: 'Rs. 1,190' },
  { id: 6, title: 'JUPITER KIDS ABLAZE UNISEX TRACK PAIR', price: 'Rs. 1,450' },
];

export default function BestSellers({ loading }) {
  return (
    <section className="py-16 px-4 lg:px-20 max-w-7xl mx-auto border-t border-gray-100 space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">Our Bestsellers</h2>
        <div className="w-8 h-0.5 bg-black mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {PRODUCTS_MOCK.map((product) => (
          <div key={product.id} className="flex flex-col group space-y-3">
            <div className="relative h-[400px] bg-gray-50 border border-gray-100 overflow-hidden w-full rounded-none">
              {loading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              ) : (
                <Image 
                  src={`/images/product-${product.id}.jpg`}
                  alt={product.title}
                  fill
                  className="object-cover object-center group-hover:scale-103 transition duration-300"
                />
              )}
            </div>
            
            <div className="flex flex-col flex-grow space-y-1 px-1">
              {loading ? (
                <div className="space-y-2 py-1">
                  <div className="h-3.5 bg-gray-200 rounded-none w-full animate-pulse" />
                  <div className="h-3.5 bg-gray-200 rounded-none w-1/4 animate-pulse" />
                </div>
              ) : (
                <>
                  <h3 className="text-xs font-bold tracking-tight text-neutral-800 uppercase line-clamp-2 leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-xs font-black text-black tracking-wide">{product.price}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
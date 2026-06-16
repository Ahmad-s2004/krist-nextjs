import Image from 'next/image';

const CATEGORIES = ['Kids', 'Women', 'Men'];

export default function CategoryGrid({ loading }) {
  return (
    <section className="py-16 px-4 lg:px-20 max-w-7xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">Shop by Categories</h2>
        <div className="w-8 h-0.5 bg-black mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((category, index) => (
          <div key={index} className="relative h-[350px] md:h-[450px] group overflow-hidden bg-gray-50 border border-gray-100 rounded-none">
            {loading ? (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            ) : (
              <>
                <Image 
                  src={`/images/category-${category.toLowerCase()}.jpg`}
                  alt={`${category} Category`}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full px-6 max-w-[200px]">
                  <span className="bg-white text-black py-3 text-xs font-bold uppercase tracking-widest block text-center shadow-sm border border-gray-100 rounded-none transition-all duration-300 hover:bg-black hover:text-white cursor-pointer select-none">
                    {category}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
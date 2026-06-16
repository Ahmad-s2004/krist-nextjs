import Image from 'next/image';

export default function HeroSection({ loading }) {
  return (
    <section className="bg-gray-50 relative overflow-hidden px-4 py-12 md:py-24 lg:px-20 flex flex-col md:flex-row items-center justify-between min-h-[500px]">
      <div className="max-w-xl z-10 space-y-4 md:space-y-6 text-center md:text-left">
        <p className="text-sm md:text-base font-bold tracking-widest text-gray-500 uppercase">Classic Exclusive</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black uppercase leading-none">
          Women’s Collection
        </h1>
        <p className="text-lg md:text-xl font-bold text-neutral-700 tracking-wide">UPTO 40% OFF</p>
        <button className="bg-black text-white border border-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-black transition-all duration-300 rounded-none inline-flex items-center gap-2 mx-auto md:mx-0">
          Shop Now <span>&rarr;</span>
        </button>
      </div>
      
      <div className="relative w-full md:w-1/2 h-[400px] md:h-[550px] mt-8 md:mt-0">
        {loading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded-none" />
        ) : (
          <div className="relative w-full h-full border border-gray-100">
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/40 z-10 pointer-events-none hidden md:block"></div>
            <Image 
              src="/images/hero-woman.jpg"
              alt="Women's Collection Hero"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        )}
      </div>
    </section>
  );
}
import Image from 'next/image';

interface HeroSectionProps {
  loading: boolean;
}

export default function HeroSection({ loading }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[500px] md:h-[720px] bg-gray-50 overflow-hidden">
      {loading ? (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      ) : (
        <Image 
          src="/banner.png"
          alt="Women's Collection Hero Banner"
          fill
          priority
          className="object-cover object-center"
        />
      )}
    </section>
  );
}
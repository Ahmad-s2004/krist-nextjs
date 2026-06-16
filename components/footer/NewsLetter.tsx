export default function NewsLetter({ title, desc }) {
  return (
    <div className="space-y-4 max-w-md w-full order-1 md:order-2">
      <h5 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm">
        {title}
      </h5>
      <p className="text-xs text-gray-500 leading-relaxed">
        {desc}
      </p>
      <div className="flex flex-col sm:flex-row gap-2 w-full pt-1">
        <input 
          type="email" 
          placeholder="Your e-mail address" 
          className="flex-grow bg-[#161616] border border-gray-800 focus:border-gray-600 focus:bg-[#1a1a1a] rounded-none px-4 py-2.5 text-white text-xs outline-none transition-all duration-300"
        />
        <button className="bg-white text-black border border-white px-6 py-2.5 font-bold hover:bg-transparent hover:text-white transition-all duration-300 uppercase text-xs tracking-widest flex-shrink-0">
          Subscribe
        </button>
      </div>
    </div>
  );
}
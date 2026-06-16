export default function OrderSummaryCard({ subtotal }) {
    return (
      <div className="lg:col-span-5 bg-neutral-50 border border-neutral-100 p-6 sm:p-8 space-y-6 lg:sticky lg:top-6 rounded-lg md:rounded-none">
        <div className="space-y-4">
          <h3 className="text-xs font-black tracking-widest uppercase text-black">Order Summary</h3>
          <div className="w-8 h-0.5 bg-black"></div>
        </div>
        <div className="space-y-4 border-b border-neutral-200 pb-5 text-xs sm:text-sm">
          <div className="flex justify-between items-center text-neutral-600 font-medium tracking-wide">
            <span>Bag Subtotal</span>
            <span className="font-bold text-black">Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between items-center text-neutral-600 font-medium tracking-wide">
            <span>Shipping & Handling</span>
            <span className="text-emerald-600 font-bold uppercase text-[11px] tracking-widest">Free</span>
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-black">
            <span className="text-xs font-black uppercase tracking-widest">Order Total</span>
            <span className="text-base sm:text-lg font-black tracking-tight">Rs. {subtotal}</span>
          </div>
          <p className="text-[11px] text-neutral-400 font-medium leading-normal">Prices are final. Local custom duties or tax calculation window applies at final address dispatch step.</p>
        </div>
        <button className="w-full bg-black text-white border border-black py-4 font-bold text-xs tracking-widest uppercase hover:bg-transparent hover:text-black transition-all duration-300 rounded-none shadow-sm flex items-center justify-center gap-2 pt-4.5">Proceed To Checkout</button>
      </div>
    );
  }
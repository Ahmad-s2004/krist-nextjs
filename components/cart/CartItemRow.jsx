import Image from "next/image";
import QuantitySelector from "./QuantitySelector";

export default function CartItemRow({ item, onQuantityChange, onRemove }) {
  return (
    <div className="bg-gray-50/50 md:bg-transparent border border-gray-100 md:border-0 p-4 md:p-0 rounded-lg md:rounded-none grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 md:py-6 items-center">
      <div className="md:col-span-6 flex gap-4 items-center">
        <div className="relative w-20 h-20 bg-gray-100 border border-gray-200/60 flex-shrink-0 aspect-square overflow-hidden rounded-md md:rounded-none">
          <Image src={item.image} alt={item.name} fill className="object-cover object-center" />
        </div>
        <div className="space-y-1 flex-1">
          <h4 className="text-xs sm:text-sm font-bold text-black tracking-wide uppercase line-clamp-2 md:max-w-[240px] leading-tight">{item.name}</h4>
          <p className="text-[11px] text-gray-500 font-medium tracking-wide">Color: <span className="text-gray-800 capitalize">{item.color}</span> &bull; Size: <span className="text-gray-800 uppercase">{item.size}</span></p>
          <button onClick={onRemove} className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest pt-1 block transition-colors underline underline-offset-2 md:no-underline">Remove</button>
        </div>
      </div>
      <div className="md:col-span-2 md:text-center flex md:flex-col justify-between items-center md:justify-center border-b border-gray-100 md:border-0 pb-2 md:pb-0">
        <span className="md:hidden text-gray-400 text-[11px] font-bold uppercase tracking-wider">Unit Price</span>
        <div className="flex md:flex-col items-baseline md:items-center gap-2 md:gap-0.5">
          <span className="text-[11px] md:text-xs text-gray-400 line-through font-medium">Rs. {item.originalPrice}</span>
          <span className="text-xs md:text-sm font-bold text-black">Rs. {item.price}</span>
        </div>
      </div>
      <div className="md:col-span-2 flex justify-between md:justify-center items-center border-b border-gray-100 md:border-0 pb-2 md:pb-0">
        <span className="md:hidden text-gray-400 text-[11px] font-bold uppercase tracking-wider">Quantity</span>
        <QuantitySelector quantity={item.quantity} onIncrement={() => onQuantityChange(1)} onDecrement={() => onQuantityChange(-1)} />
      </div>
      <div className="md:col-span-2 flex justify-between md:justify-end items-center text-xs md:text-sm font-black text-black tracking-wide">
        <span className="md:hidden text-gray-400 text-[11px] font-bold uppercase tracking-wider">Subtotal</span>
        <span>Rs. {item.price * item.quantity}</span>
      </div>
    </div>
  );
}
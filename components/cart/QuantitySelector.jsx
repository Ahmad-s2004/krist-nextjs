export default function QuantitySelector({ quantity, onIncrement, onDecrement }) {
    return (
      <div className="flex items-center border border-gray-300 bg-white shadow-sm">
        <button onClick={onDecrement} className="px-3 py-1 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors font-medium text-base select-none">&minus;</button>
        <span className="px-3 py-1 text-xs font-bold text-black min-w-[36px] text-center select-none">{quantity}</span>
        <button onClick={onIncrement} className="px-3 py-1 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors font-medium text-base select-none">&#43;</button>
      </div>
    );
  }
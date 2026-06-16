const SERVICES = [
    { icon: '🚚', title: 'Free Shipping', desc: 'Free shipping for order above 2000' },
    { icon: '🛡️', title: 'Money Guarantee', desc: 'Within 20 days for an exchange' },
    { icon: '🎧', title: 'Online Support', desc: '24 hours a day, 7 days a week' },
    { icon: '💳', title: 'Flexible Payment', desc: 'Pay with multiple credit cards' },
  ];
  
  export default function ServiceFeatures() {
    return (
      <section className="bg-white border-t border-b border-gray-100 py-12 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {SERVICES.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center p-2 space-y-2 group">
              <span className="text-3xl mb-1 select-none transition-transform duration-300 group-hover:scale-110">{feature.icon}</span>
              <h4 className="text-xs font-bold text-black uppercase tracking-widest">{feature.title}</h4>
              <p className="text-[11px] text-gray-400 font-medium max-w-[180px] leading-normal">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
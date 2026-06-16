export default function MobileApps({ title, apps }) {
  return (
    <div className="col-span-2 sm:col-span-1 space-y-5">
      <h5 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm">
        {title}
      </h5>
      <div className="flex flex-col gap-2.5 max-w-[170px]">
        {apps.map((app, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 bg-[#181818] border border-gray-800 hover:border-gray-600 rounded-md px-3.5 py-2 text-white cursor-pointer transition-all duration-300 group shadow-sm"
          >
            <div className="text-gray-400 group-hover:text-white transition-colors duration-300 flex-shrink-0 flex items-center justify-center">
              {app.icon}
            </div>
            <div className="flex flex-col justify-center text-left leading-none">
              <span className="text-[9px] text-gray-500 uppercase tracking-wider font-medium mb-0.5">
                {app.meta}
              </span>
              <span className="font-bold text-xs tracking-wide">
                {app.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
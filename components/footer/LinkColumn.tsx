export default function LinkColumn({ title, links }) {
  return (
    <div className="col-span-1 space-y-5">
      <h5 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm">
        {title}
      </h5>
      <ul className="space-y-3 text-xs md:text-sm">
        {links.map((link, idx) => (
          <li 
            key={idx} 
            className="hover:text-white cursor-pointer transition-colors duration-200 font-medium tracking-wide w-fit"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}
"use client";

import React from "react";
import Link from "next/link";

interface LinkColumnProps {
  title: string;
  links: string[];
}

export default function LinkColumn({ title, links }: LinkColumnProps) {
  return (
    <div className="col-span-1 space-y-5 font-sans">
      <h5 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm">
        {title}
      </h5>
      <ul className="space-y-3">
        {links.map((link, index) => {
          const dynamicHref = `/${link.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          
          return (
            <li key={index}>
              <Link
                href={dynamicHref}
                className="text-neutral-400 text-xs md:text-sm uppercase tracking-wide hover:text-white transition-colors duration-200"
              >
                {link}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
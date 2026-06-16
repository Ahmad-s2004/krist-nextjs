import React from 'react';
import LinkColumn from './LinkColumn';
import MobileApps from './MobileApps';
import NewsLetter from './NewsLetter';

export default function Footer() {
  const contactData = [
    { label: "Phone:", value: "00 33 169 7720" },
    { label: "Monday - Friday:", value: "9:00 am - 8:00 py" },
    { label: "Saturday:", value: "10:00 am - 6:00 py" }
  ];

  const appStoreData = [
    {
      name: "App Store",
      meta: "Download on the",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-.1.07 3.53-.91 1.21-.74 2.53.05 3.44c1.02.78 2.02.51 2.31.42-.08.2-.33.74-.73 1.31M15.97 4.17c.56-.68.94-1.62.84-2.57-.82.03-1.81.55-2.4 1.24-.5.58-.94 1.54-.82 2.47.91.07 1.83-.46 2.38-1.14z"/>
        </svg>
      )
    },
    {
      name: "Google Play",
      meta: "GET IT ON",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M3.609 1.814L13.785 12 3.609 22.186c-.183-.163-.301-.4-.301-.685V2.5c0-.285.118-.522.301-.686zM14.972 13.186l2.847 2.848L4.697 22.65c-.21.09-.432.144-.662.144-.316 0-.6-.104-.834-.275l11.771-9.333zm4.568-1.531l-3.414-1.954-2.91 2.91 2.91 2.91 3.414-1.954c.54-.31.9-.884.9-1.542s-.36-1.233-.9-1.542zM4.035 1.206c.234-.171.518-.275.834-.275.23 0 .452.054.662.144l13.122 6.616-2.847 2.848L4.035 1.206z"/>
        </svg>
      )
    },
    {
      name: "Windows Store",
      meta: "Download from",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z"/>
        </svg>
      )
    }
  ];

  const servicesLinks = ["About Us", "Contact", "Terms & Condition", "Privacy Policy"];
  const infoLinks = ["My Account", "Login", "My Cart", "My Wishlist", "Checkout"];

  return (
    <footer className="bg-[#111111] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 flex justify-center border-t border-gray-900 selection:bg-white selection:text-black">
      <div className="max-w-7xl w-full space-y-16">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-10 items-start">
          
          <div className="col-span-2 sm:col-span-1 space-y-5">
            <h5 className="text-white font-bold uppercase tracking-widest text-xs md:text-sm">
              Get in touch with us
            </h5>
            <ul className="space-y-3.5 text-xs md:text-sm">
              {contactData.map((item, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:gap-1.5 leading-relaxed">
                  <span className="text-gray-500 font-medium">{item.label}</span>
                  <span className="text-gray-300 font-semibold">{item.value}</span>
                </li>
              ))}
              <li className="pt-1.5">
                <a 
                  href="mailto:support@kristshop.com" 
                  className="text-blue-400 font-medium hover:text-blue-300 underline underline-offset-4 transition-colors duration-200 block sm:inline break-all"
                >
                  support@kristshop.com
                </a>
              </li>
            </ul>
          </div>

          <MobileApps title="Our Mobile App" apps={appStoreData} />

          <LinkColumn title="Services" links={servicesLinks} />

          <LinkColumn title="Information" links={infoLinks} />

        </div>

        <div className="border-t border-gray-900 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          
          <NewsLetter 
            title="Newsletter" 
            desc="Subscribe to our Newsletter to receive early information and exclusive updates." 
          />

          <div className="text-gray-600 text-xs tracking-wider font-medium text-left md:text-left order-2 md:order-1 flex items-end">
            &copy; {new Date().getFullYear()} KristShop. All rights reserved.
          </div>
          
        </div>

      </div>
    </footer>
  );
}
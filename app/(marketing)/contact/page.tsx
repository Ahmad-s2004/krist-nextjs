"use client";

import Footer from '../../../components/footer/index';
import { useState } from 'react';

export default function page() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <>
    <div className="min-h-[calc(100vh-73px)] w-full flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 selection:bg-black selection:text-white">
      <div className="max-w-7xl w-full py-12 md:py-20 space-y-16">
        
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black uppercase">
            Contact Us
          </h1>
          <div className="w-12 h-0.5 bg-black mx-auto"></div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide max-w-md mx-auto leading-relaxed">
            Have any questions or feedback? We&apos;d love to hear from you. Leave us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          
          <div className="lg:col-span-5 space-y-10 bg-gray-50 border border-gray-100 p-8 sm:p-10">
            
            <div className="space-y-6">
              <h3 className="text-sm font-black tracking-widest uppercase text-black">
                Info & Support
              </h3>
              <div className="w-8 h-0.5 bg-gray-300"></div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="text-xl pt-0.5 flex-shrink-0">📞</div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black">Call Center</h4>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600">00 33 169 7720</p>
                  <p className="text-[11px] text-gray-400 font-medium">Toll-free customer helper line</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-xl pt-0.5 flex-shrink-0">✉️</div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black">Email Us</h4>
                  <a href="mailto:support@kristshop.com" className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline block break-all">
                    support@kristshop.com
                  </a>
                  <p className="text-[11px] text-gray-400 font-medium">We respond within 24 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-xl pt-0.5 flex-shrink-0">📍</div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black">Main Office</h4>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-relaxed">
                    14 Totnes Road, Paignton, Devon, United Kingdom
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-xl pt-0.5 flex-shrink-0">🕒</div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black">Working Hours</h4>
                  <p className="text-xs font-semibold text-gray-600">Monday - Friday: 9:00 am - 8:00 pm</p>
                  <p className="text-xs font-semibold text-gray-600">Saturday: 10:00 am - 6:00 pm</p>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white border border-gray-200 focus:border-black rounded-none px-4 py-3 text-sm text-black outline-none transition-all duration-200 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-white border border-gray-200 focus:border-black rounded-none px-4 py-3 text-sm text-black outline-none transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full bg-white border border-gray-200 focus:border-black rounded-none px-4 py-3 text-sm text-black outline-none transition-all duration-200 placeholder-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your detailed message here..."
                  className="w-full bg-white border border-gray-200 focus:border-black rounded-none px-4 py-3 text-sm text-black outline-none transition-all duration-200 placeholder-gray-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white border border-black py-3.5 font-bold text-xs tracking-widest uppercase hover:bg-transparent hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 rounded-none pt-4"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Send Message"
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
      <Footer/>
    </>
  );
}
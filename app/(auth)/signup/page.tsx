"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function page() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] w-full flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 selection:bg-black selection:text-white">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center py-8">
        
        {/* Left Side: Symmetrical Visual Showcase (Hidden on Mobile) */}
        <div className="relative hidden lg:block w-full aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100">
          <div className="absolute inset-6 border border-white/30 z-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10" />
          <Image 
            src="/images/signup-banner.jpg" 
            alt="Krist Sign Up Showcase" 
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute bottom-12 inset-x-12 z-20 space-y-2 text-white">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-300">Join Us Today</span>
            <h2 className="text-3xl font-black tracking-tight uppercase leading-none">Unlocking Curation</h2>
            <p className="text-sm text-gray-200 tracking-wide font-medium pt-1">Create an account to track orders and save favorites.</p>
          </div>
        </div>

        {/* Right Side: Clean Symmetrical Form */}
        <div className="w-full max-w-md mx-auto space-y-8 flex flex-col justify-center">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-black tracking-tight text-black uppercase">
              Create An Account
            </h1>
            <p className="text-sm text-gray-500 font-medium tracking-wide">
              Let&apos;s get you set up in less than a minute.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Symmetrical Grid for Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full bg-white border border-gray-200 focus:border-black rounded-none px-4 py-3 text-sm text-black outline-none transition-all duration-200 placeholder-gray-400"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-gray-770">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full bg-white border border-gray-200 focus:border-black rounded-none px-4 py-3 text-sm text-black outline-none transition-all duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-770">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-white border border-gray-200 focus:border-black rounded-none px-4 py-3 text-sm text-black outline-none transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-gray-770">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                className="w-full bg-white border border-gray-200 focus:border-black rounded-none px-4 py-3 text-sm text-black outline-none transition-all duration-200 placeholder-gray-400"
              />
            </div>

            <div className="flex items-start pt-1">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 mt-0.5 accent-black rounded-none border-gray-300 text-black focus:ring-0 cursor-pointer"
              />
              <label htmlFor="agreeTerms" className="ml-2.5 block text-xs font-bold uppercase tracking-wider text-gray-600 cursor-pointer select-none leading-normal">
                I agree to the{' '}
                <Link href="/terms" className="text-black underline underline-offset-2 hover:text-gray-700">Terms & Conditions</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white border border-black py-3 font-bold text-xs tracking-widest uppercase hover:bg-transparent hover:text-black transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 rounded-none mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold tracking-widest uppercase">Or Sign Up With</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-400 px-4 py-2.5 transition-all duration-300 rounded-none group">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.26 1.714 15.424 1 12.24 1c-6.076 0-11 4.924-11 11s4.924 11 11 11c6.344 0 10.556-4.43 10.556-10.74 0-.726-.077-1.282-.175-1.7l-10.38-.001z"/>
              </svg>
              <span className="text-xs font-bold tracking-wider uppercase text-gray-700 group-hover:text-black">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-400 px-4 py-2.5 transition-all duration-300 rounded-none group">
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-xs font-bold tracking-wider uppercase text-gray-700 group-hover:text-black">Facebook</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 font-medium tracking-wide">
            Already have an account?{' '}
            <Link 
              href="/signin" 
              className="font-bold text-black underline underline-offset-4 hover:text-gray-700 transition-colors"
            >
              Sign In Instead
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface AuthAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthAlertModal({ isOpen, onClose }: AuthAlertModalProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Center Modal Card */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="w-full max-w-md bg-white border border-neutral-200 p-8 shadow-2xl relative pointer-events-auto rounded-none text-black font-sans"
            >
              {/* Close Icon Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Icon & Content */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 flex items-center justify-center rounded-none text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-black uppercase tracking-widest">Login Required</h3>
                  <p className="text-xs text-neutral-500 max-w-xs leading-relaxed uppercase tracking-wider">
                    To securely process your checkout items, you need to be securely logged into your account first.
                  </p>
                </div>

                {/* Call To Actions */}
                <div className="w-full pt-4 flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      onClose();
                      router.push("/signin?callbackUrl=/checkout");
                    }}
                    className="w-full bg-black text-white py-3 text-xs font-black uppercase tracking-widest border border-black hover:bg-neutral-900 transition duration-300"
                  >
                    Sign In Now
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-transparent text-neutral-400 py-3 text-[10px] font-bold uppercase tracking-widest hover:text-black transition duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // 🔥 Client-side layout hai, yahan localStorage direct read hogi
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!loggedIn) {
      // Agar logged in nahi hai, toh redirect to signin
      router.push("/signin?callbackUrl=%2Fdashboard");
    }
  }, [router]);

  // Hydration white flash bypass check
  if (!isMounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white font-sans">
        <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 animate-pulse">
          Loading Your Account...
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 font-sans">
      <h1 className="text-xl font-black uppercase tracking-wider text-black">
        Welcome to Dashboard
      </h1>
      <p className="text-xs text-neutral-500 mt-2">
        Bhai, ab bina middleware ke, aapka page direct client guard se secure ho gaya hai!
      </p>
    </div>
  );
}
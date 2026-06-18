"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!loggedIn) {
      router.push("/signin");
    }
  }, [router]);

  if (!isMounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 animate-pulse">
          Securing Routes...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
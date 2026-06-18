"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      
      if (!loggedIn) {
        router.push("/signin?callbackUrl=" + window.location.pathname);
      }
    }, [router]);

    if (!isMounted) {
      return (
        <div className="h-screen w-full flex items-center justify-center bg-white">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 animate-pulse">
            Verifying Session...
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
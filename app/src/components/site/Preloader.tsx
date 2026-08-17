"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/site/Logo";

export function Preloader() {
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1150);
    const unmountTimer = setTimeout(() => setMounted(false), 1750);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-5 bg-[linear-gradient(180deg,#FBFDFB,#E9F1EA)] transition-opacity duration-[550ms] ease-out"
      style={{ opacity: fading ? 0 : 1 }}
      aria-hidden={fading}
    >
      <span className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-green-500/50" />
        <Logo size={52} />
      </span>
      <span className="font-display text-lg font-bold text-forest-800">Kadie Fresh</span>
      <span className="h-1 w-43 overflow-hidden rounded-full bg-black/10">
        <span className="block h-full w-full origin-left animate-bar rounded-full bg-[linear-gradient(90deg,#16A34A,#F97316)]" />
      </span>
    </div>
  );
}

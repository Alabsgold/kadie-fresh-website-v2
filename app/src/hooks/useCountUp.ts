"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates the leading integer in a label (e.g. "120+ tonnes/month",
 * "10+", "4 hrs") from 0 up to its real value once the element scrolls
 * into view, preserving whatever prefix/suffix text surrounds the number.
 */
export function useCountUp(label: string, durationMs = 1200) {
  const match = label.match(/-?\d[\d,]*/);
  const target = match ? Number(match[0].replace(/,/g, "")) : null;
  const [display, setDisplay] = useState(target === null ? label : label.replace(match![0], "0"));
  const ref = useRef<HTMLElement | null>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setDisplay(label);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !ranRef.current) {
            ranRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(target * eased);
              setDisplay(label.replace(match![0], current.toLocaleString()));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  return { ref, display };
}

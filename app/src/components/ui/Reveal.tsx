"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ComponentPropsWithoutRef } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  className?: string;
  /** Milliseconds to hold before the fade-up starts once in view — used to
   * stagger sibling cards (e.g. `delay={i * 80}`). */
  delay?: number;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/** Fades an element up into place the first time it scrolls into view. */
export function Reveal<T extends ElementType = "div">({
  as,
  className = "",
  delay = 0,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      // Legitimate one-time environment-capability fallback, not derived
      // render state — SSR and initial client render both start hidden,
      // so this can't cause a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);

    // No blanket timeout failsafe here: it fired at 1.4s and revealed
    // below-the-fold content before the user ever scrolled to it, defeating
    // the effect. The observer fires immediately for in-view elements, the
    // no-IntersectionObserver branch above covers ancient browsers, and the
    // CSS hiding rule is scoped to `@media (scripting: enabled)` so content
    // can never be stranded invisible without JS.

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal="1"
      className={`${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ComponentPropsWithoutRef } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/** Fades an element up into place the first time it scrolls into view. */
export function Reveal<T extends ElementType = "div">({
  as,
  className = "",
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

    // Failsafe: never leave content permanently invisible if the observer
    // misfires (e.g. a very short page, or a browser quirk).
    const failsafe = setTimeout(() => setVisible(true), 1400);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal="1"
      className={`${visible ? "is-visible" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}

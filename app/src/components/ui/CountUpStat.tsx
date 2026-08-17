"use client";

import { useCountUp } from "@/hooks/useCountUp";

export function CountUpStat({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp(value);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="font-display text-[29px] font-extrabold tracking-[-0.03em] text-white">
        {display}
      </div>
      <div className="mt-0.5 text-[13px] text-white/62">{label}</div>
    </div>
  );
}

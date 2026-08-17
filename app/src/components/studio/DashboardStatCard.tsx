"use client";

import { useCountUp } from "@/hooks/useCountUp";

export function DashboardStatCard({
  label,
  value,
  delta,
  progress,
}: {
  label: string;
  value: number;
  delta: string;
  progress: number;
}) {
  const { ref, display } = useCountUp(String(value), 900);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="glass-card p-5">
      <div className="text-[13px] font-semibold text-gray-500">{label}</div>
      <div className="mt-1.5 font-display text-[32px] font-extrabold text-forest-900">
        {display}
      </div>
      <div className="mt-1 text-xs text-gray-400">{delta}</div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EAF3EC]">
        <div
          className="h-full rounded-full bg-green-600"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}

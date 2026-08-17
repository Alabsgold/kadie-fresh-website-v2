"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((next: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessage(next);
    timerRef.current = setTimeout(() => setMessage(null), 2400);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
          <div className="flex animate-toast items-center gap-2.5 rounded-full bg-forest-800 px-5 py-3 text-sm font-medium text-white shadow-[0_14px_34px_rgba(14,61,34,0.34)]">
            <span className="inline-block h-2 w-2 flex-none rounded-full bg-[#4ADE80]" />
            {message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

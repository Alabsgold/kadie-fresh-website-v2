"use client";

import { useState, useSyncExternalStore } from "react";
import { useToast } from "@/components/ui/Toast";

const STORAGE_KEY = "kf-cookie-consent";

/** True once hydrated on the client — lets us defer localStorage reads
 * (an external, non-SSR-safe store) without calling setState in an effect. */
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function CookieBar({ copy }: { copy: string }) {
  const isClient = useIsClient();
  const [dismissed, setDismissed] = useState(false);
  const { showToast } = useToast();

  const hasStoredChoice = isClient && Boolean(window.localStorage.getItem(STORAGE_KEY));
  const visible = isClient && !hasStoredChoice && !dismissed;

  function dismiss(choice: "accepted" | "essentials-only") {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setDismissed(true);
    if (choice === "accepted") showToast("Preferences saved");
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4">
      <div
        className="flex max-w-xl animate-toast flex-wrap items-center gap-4 rounded-2xl p-4"
        style={{
          background: "rgba(255,255,255,.78)",
          backdropFilter: "blur(22px) saturate(1.7)",
          border: "1px solid rgba(255,255,255,.8)",
          boxShadow: "0 16px 40px rgba(14,61,34,.16)",
        }}
      >
        <p className="min-w-52 flex-1 text-sm text-gray-700">{copy}</p>
        <div className="flex flex-none gap-2">
          <button
            type="button"
            onClick={() => dismiss("essentials-only")}
            className="btn-outline px-4 py-2 text-sm"
          >
            Only essentials
          </button>
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className="cursor-pointer rounded-full border-0 bg-[linear-gradient(180deg,#22C55E,#16A34A)] px-4 py-2 text-sm font-bold text-white shadow-[0_6px_18px_rgba(22,163,74,.3)]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

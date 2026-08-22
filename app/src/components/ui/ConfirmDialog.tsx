"use client";

import { useEffect } from "react";

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = true,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && !loading) {
        onCancel();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, loading, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-950/50 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (!loading) onCancel();
        }}
      />

      {/* Modal Dialog Box */}
      <div className="glass-panel relative z-10 w-full max-w-md animate-pop p-6 shadow-[0_20px_50px_rgba(7,32,15,0.25)] border border-white/60 bg-white/95">
        <h3 className="font-display text-xl font-extrabold tracking-[-0.02em] text-forest-900">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="btn-outline px-4 py-2 text-sm disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`rounded-full px-5 py-2 text-sm font-semibold text-white transition-all shadow-md ${
              isDestructive
                ? "bg-red-600 hover:bg-red-700 active:scale-95 disabled:opacity-50"
                : "btn-cta"
            }`}
          >
            {loading ? "Processing…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

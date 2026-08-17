"use client";

import { useState } from "react";
import { updateWhatsappNumber } from "@/app/actions/settings";
import { useToast } from "@/components/ui/Toast";

export function WhatsappNumberCard({ initialNumber }: { initialNumber: string }) {
  const [value, setValue] = useState(initialNumber);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  async function save() {
    setSaving(true);
    await updateWhatsappNumber(value.trim());
    setSaving(false);
    showToast("WhatsApp number updated across the site");
  }

  return (
    <div
      className="rounded-2xl bg-white p-5"
      style={{ border: "1.5px solid #F97316", boxShadow: "0 8px 24px rgba(249,115,22,.1)" }}
    >
      <div className="font-display text-base font-bold text-forest-900">
        Change WhatsApp number
      </div>
      <p className="mt-1.5 text-sm text-gray-500">
        This is the number every WhatsApp button on your website opens.
      </p>
      <div className="mt-3.5 flex flex-wrap gap-2.5">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="min-w-45 flex-1 rounded-xl border border-forest-800/14 px-3.5 py-2.5 text-sm outline-none"
        />
        <button
          type="button"
          disabled={saving}
          onClick={save}
          className="btn-cta px-5 py-2.5 text-sm disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save change"}
        </button>
      </div>
    </div>
  );
}

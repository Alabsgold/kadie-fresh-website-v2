"use client";

import { useState } from "react";
import Link from "next/link";
import { submitDistributorApplication } from "@/app/actions/distributor";
import { useToast } from "@/components/ui/Toast";

type Fields = {
  company: string;
  contactEmail: string;
  contactPhone: string;
  country: string;
  volume: string;
  markets: string;
  message: string;
  declaration: boolean;
};

function emptyFields(): Fields {
  return {
    company: "",
    contactEmail: "",
    contactPhone: "",
    country: "Nigeria",
    volume: "",
    markets: "",
    message: "",
    declaration: false,
  };
}

export function DistributorForm() {
  const { showToast } = useToast();
  const [fields, setFields] = useState<Fields>(() => emptyFields());
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    if (
      !fields.company.trim() ||
      !fields.contactEmail.trim() ||
      !fields.contactPhone.trim() ||
      !fields.volume.trim() ||
      !fields.declaration
    ) {
      showToast("Company, volume and the declaration are required");
      return;
    }

    setSubmitting(true);
    const result = await submitDistributorApplication(fields);
    setSubmitting(false);

    if (!result.ok) {
      showToast(result.error);
      return;
    }
    setReference(result.reference);
  }

  if (reference) {
    return (
      <div className="min-h-130 bg-[linear-gradient(175deg,#F4FBF6,#FFFFFF_70%)] px-6 py-17.5 text-center">
        <div className="relative mx-auto mb-6.5 h-24 w-24">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-green-600 opacity-28" />
          <span className="absolute inset-0 flex animate-pop items-center justify-center rounded-full bg-[radial-gradient(circle_at_34%_30%,#22C55E,#12833C)] text-4xl text-white">
            ✓
          </span>
        </div>
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-[-0.035em] text-forest-900">
          Application received
        </h1>
        <p className="mx-auto max-w-md text-base leading-relaxed text-gray-600">
          It is in the studio inbox now. Expect a reply within three working days, with the line
          card and volume pricing attached.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setFields(emptyFields());
              setReference(null);
            }}
            className="btn-outline px-6 py-3.25 text-[15px]"
          >
            Submit another
          </button>
          <Link href="/studio/login" className="btn-cta px-6 py-3.25 text-[15px]">
            See it in the studio →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-5.5 pb-14">
      <div className="mx-auto max-w-2xl">
        <div className="glass-panel p-6.5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                Company
              </label>
              <input
                value={fields.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Zenith Foods Ltd"
                className="w-full rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 text-[15px] outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                Country of operation
              </label>
              <input
                value={fields.country}
                onChange={(e) => set("country", e.target.value)}
                className="w-full rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 text-[15px] outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                Your email
              </label>
              <input
                value={fields.contactEmail}
                onChange={(e) => set("contactEmail", e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 text-[15px] outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                Your phone
              </label>
              <input
                value={fields.contactPhone}
                onChange={(e) => set("contactPhone", e.target.value)}
                placeholder="0810 542 0458"
                className="w-full rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 text-[15px] outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                Monthly volume you can move
              </label>
              <input
                value={fields.volume}
                onChange={(e) => set("volume", e.target.value)}
                placeholder="e.g. 4 pallets"
                className="w-full rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 text-[15px] outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                Markets or channels served
              </label>
              <input
                value={fields.markets}
                onChange={(e) => set("markets", e.target.value)}
                placeholder="Retail chains, food service"
                className="w-full rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 text-[15px] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                Anything else
              </label>
              <textarea
                value={fields.message}
                onChange={(e) => set("message", e.target.value)}
                rows={4}
                placeholder="Existing lines you carry, cold-chain capacity, target start date…"
                className="w-full resize-y rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 text-[15px] outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => set("declaration", !fields.declaration)}
            className="mt-5 flex w-full items-start gap-3 text-left"
          >
            <span
              className={`mt-0.5 flex h-5.5 w-5.5 flex-none items-center justify-center rounded-md border-2 transition-colors ${
                fields.declaration
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-forest-800/22 bg-white"
              }`}
            >
              {fields.declaration && (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                  <path
                    d="M3 8.5 6.2 11.5 13 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="text-[14px] leading-relaxed text-gray-600">
              I confirm the company holds the cold-chain capacity to handle prepared produce, and
              I accept the distributor terms.
            </span>
          </button>

          <div className="mt-6 flex items-center gap-3 border-t border-forest-800/8 pt-5">
            <span className="mr-auto text-[13px] text-gray-400">
              We reply within three working days.
            </span>
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="btn-cta px-6 py-3 text-[14.5px] disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

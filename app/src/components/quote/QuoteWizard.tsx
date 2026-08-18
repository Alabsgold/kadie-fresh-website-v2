"use client";

import { useState } from "react";
import Link from "next/link";
import { submitQuote } from "@/app/actions/quote";
import { Chip } from "@/components/ui/Chip";
import { buyerTypes, frequencies, type QuoteInput } from "@/lib/validation";

type Fields = {
  name: string;
  business: string;
  email: string;
  phone: string;
  buyerType: (typeof buyerTypes)[number];
  items: string[];
  volume: string;
  frequency: (typeof frequencies)[number];
  location: string;
  notes: string;
};

const STEP_TITLES = ["Who you are", "What you need", "Review & send"];

function emptyFields(initialItem?: string): Fields {
  return {
    name: "",
    business: "",
    email: "",
    phone: "",
    buyerType: "Restaurant / hotel",
    items: initialItem ? [initialItem] : [],
    volume: "",
    frequency: "Weekly",
    location: "",
    notes: "",
  };
}

export function QuoteWizard({
  productNames,
  initialItem,
}: {
  productNames: string[];
  initialItem?: string;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fields, setFields] = useState<Fields>(() => emptyFields(initialItem));
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [shakeToken, setShakeToken] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function fail(nextErrors: Partial<Record<string, string>>) {
    setErrors(nextErrors);
    setShakeToken((t) => t + 1);
  }

  function validateStep1() {
    const next: Partial<Record<string, string>> = {};
    if (!fields.name.trim()) next.name = "We need a name to put on the quote.";
    if (!fields.email.trim()) next.email = "Add an email so we can send the quote.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      next.email = "That address does not look right.";
    if (!fields.phone.trim()) next.phone = "A phone or WhatsApp number speeds this up a lot.";
    if (Object.keys(next).length) {
      fail(next);
      return false;
    }
    return true;
  }

  function validateStep2() {
    const next: Partial<Record<string, string>> = {};
    if (fields.items.length === 0)
      next.items = "Pick at least one line, or describe it in the notes on the next step.";
    if (!fields.volume.trim()) next.volume = "Give us a rough volume so we can price it.";
    if (Object.keys(next).length) {
      fail(next);
      return false;
    }
    return true;
  }

  function next() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => (s === 1 ? 2 : 3) as 1 | 2 | 3);
  }

  function back() {
    setStep((s) => (s === 3 ? 2 : 1) as 1 | 2 | 3);
  }

  async function send() {
    setSubmitting(true);
    const payload: QuoteInput = {
      name: fields.name,
      business: fields.business,
      email: fields.email,
      phone: fields.phone,
      buyerType: fields.buyerType,
      items: fields.items,
      volume: fields.volume,
      frequency: fields.frequency,
      location: fields.location,
      notes: fields.notes,
    };
    const result = await submitQuote(payload);
    setSubmitting(false);
    if (!result.ok) {
      fail(result.fieldErrors);
      setStep(1);
      return;
    }
    setReference(result.reference);
  }

  function toggleItem(name: string) {
    setFields((f) => ({
      ...f,
      items: f.items.includes(name) ? f.items.filter((i) => i !== name) : [...f.items, name],
    }));
    setErrors((e) => ({ ...e, items: undefined }));
  }

  if (reference) {
    return (
      <div className="min-h-130 bg-[linear-gradient(175deg,#F0FDF4,#FFFFFF_70%)] px-6 py-17.5 text-center">
        <div className="relative mx-auto mb-6.5 h-24 w-24">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-green-600 opacity-28" />
          <span className="absolute inset-0 flex animate-pop items-center justify-center rounded-full bg-[radial-gradient(circle_at_34%_30%,#22C55E,#16A34A)] text-4xl text-white">
            ✓
          </span>
        </div>
        <h1 className="mb-3 font-display text-4xl font-extrabold tracking-[-0.035em] text-forest-900">
          Quote request sent.
        </h1>
        <p className="mx-auto max-w-md text-base leading-relaxed text-gray-600">
          Reference <strong className="text-forest-900">{reference}</strong>. We will come back
          with pack sizes and a price within one working day.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn-outline px-6 py-3.25 text-[15px]">
            Back to products
          </Link>
          <Link href="/studio/login" className="btn-cta px-6 py-3.25 text-[15px]">
            See it arrive in the studio →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-130 bg-[linear-gradient(175deg,#F0FDF4,#FFFFFF_60%)] px-6 py-8 pb-15">
      <div className="mx-auto max-w-2xl">
        <div className="text-xs font-bold tracking-[0.14em] text-green-600 uppercase">
          Request a quote
        </div>
        <h1 className="mt-2.5 mb-5.5 font-display text-4xl font-extrabold tracking-[-0.035em] text-forest-900">
          Tell us what your kitchen needs.
        </h1>

        <div className="mb-6.5 flex items-center gap-2.5">
          {STEP_TITLES.map((title, i) => {
            const n = i + 1;
            const active = n <= step;
            return (
              <div key={title} className="flex flex-1 items-center gap-2.5">
                <span
                  className={`flex h-6.5 w-6.5 flex-none items-center justify-center rounded-full text-xs font-bold ${
                    active ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {n}
                </span>
                <span
                  className={`hidden text-sm font-semibold sm:inline ${
                    active ? "text-forest-900" : "text-gray-400"
                  }`}
                >
                  {title}
                </span>
                {n < 3 && (
                  <span
                    className={`h-px flex-1 ${n < step ? "bg-green-600" : "bg-gray-200"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="glass-panel p-6.5">
          {step === 1 && (
            <div className="grid animate-fade-up grid-cols-1 gap-4 sm:grid-cols-2">
              <div key={`name-${shakeToken}`} className={errors.name ? "animate-shake" : ""}>
                <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                  Your name
                </label>
                <input
                  value={fields.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Femi Alabi"
                  className={`w-full rounded-xl border px-4 py-3.25 text-[15px] outline-none ${
                    errors.name ? "border-red-600" : "border-forest-800/14"
                  }`}
                />
                {errors.name && <div className="mt-1.5 text-xs text-red-600">{errors.name}</div>}
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                  Business <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  value={fields.business}
                  onChange={(e) => set("business", e.target.value)}
                  placeholder="Harbour Hotel"
                  className="w-full rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 text-[15px] outline-none"
                />
              </div>

              <div key={`email-${shakeToken}`} className={errors.email ? "animate-shake" : ""}>
                <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                  Email
                </label>
                <input
                  value={fields.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@company.com"
                  className={`w-full rounded-xl border px-4 py-3.25 text-[15px] outline-none ${
                    errors.email ? "border-red-600" : "border-forest-800/14"
                  }`}
                />
                {errors.email && <div className="mt-1.5 text-xs text-red-600">{errors.email}</div>}
              </div>

              <div key={`phone-${shakeToken}`} className={errors.phone ? "animate-shake" : ""}>
                <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                  Phone / WhatsApp
                </label>
                <input
                  value={fields.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="0810 542 0458"
                  className={`w-full rounded-xl border px-4 py-3.25 text-[15px] outline-none ${
                    errors.phone ? "border-red-600" : "border-forest-800/14"
                  }`}
                />
                {errors.phone && <div className="mt-1.5 text-xs text-red-600">{errors.phone}</div>}
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-[13px] font-semibold text-gray-700">
                  What kind of buyer are you?
                </label>
                <div className="flex flex-wrap gap-2">
                  {buyerTypes.map((bt) => (
                    <Chip
                      key={bt}
                      active={fields.buyerType === bt}
                      onClick={() => set("buyerType", bt)}
                    >
                      {bt}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <div key={`items-${shakeToken}`} className={errors.items ? "animate-shake" : ""}>
                <label className="mb-2 block text-[13px] font-semibold text-gray-700">
                  Which lines? Pick as many as you need.
                </label>
                <div className="flex flex-wrap gap-2">
                  {productNames.map((name) => (
                    <Chip
                      key={name}
                      active={fields.items.includes(name)}
                      onClick={() => toggleItem(name)}
                    >
                      {name}
                    </Chip>
                  ))}
                </div>
                {errors.items && <div className="mt-2 text-xs text-red-600">{errors.items}</div>}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div key={`volume-${shakeToken}`} className={errors.volume ? "animate-shake" : ""}>
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                    Estimated volume
                  </label>
                  <input
                    value={fields.volume}
                    onChange={(e) => set("volume", e.target.value)}
                    placeholder="e.g. 40kg per week"
                    className={`w-full rounded-xl border px-4 py-3.25 text-[15px] outline-none ${
                      errors.volume ? "border-red-600" : "border-forest-800/14"
                    }`}
                  />
                  {errors.volume && (
                    <div className="mt-1.5 text-xs text-red-600">{errors.volume}</div>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                    How often?
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {frequencies.map((f) => (
                      <Chip
                        key={f}
                        active={fields.frequency === f}
                        onClick={() => set("frequency", f)}
                      >
                        {f}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">
                    Delivery location
                  </label>
                  <input
                    value={fields.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder="Ikeja, Lagos"
                    className="w-full rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 text-[15px] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up">
              <div className="mb-3.5 font-display text-xl font-bold text-forest-900">
                Check it over
              </div>
              <div className="overflow-hidden rounded-2xl border border-forest-800/10">
                {[
                  { label: "Name", value: fields.name },
                  { label: "Business", value: fields.business || "—" },
                  { label: "Email", value: fields.email },
                  { label: "Phone", value: fields.phone },
                  { label: "Buyer type", value: fields.buyerType },
                  {
                    label: "Lines",
                    value: fields.items.length ? fields.items.join(", ") : "To be described",
                  },
                  { label: "Volume", value: `${fields.volume} · ${fields.frequency}` },
                  { label: "Deliver to", value: fields.location || "—" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-5 border-t border-forest-800/6 px-4 py-3 text-sm first:border-t-0"
                  >
                    <span className="text-gray-500">{row.label}</span>
                    <span className="max-w-[60%] text-right font-semibold text-forest-900">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <label className="mt-4.5 mb-1.5 block text-[13px] font-semibold text-gray-700">
                Anything else we should know?
              </label>
              <textarea
                value={fields.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={4}
                placeholder="Cut size, packaging preference, delivery window…"
                className="w-full resize-y rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 text-[15px] outline-none"
              />
              <div className="mt-2.5 text-xs text-gray-400">
                We reply within one working day. Mon–Sat, 6am–6pm.
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3 border-t border-forest-800/8 pt-5">
            {step > 1 && (
              <button type="button" onClick={back} className="btn-outline px-5 py-3 text-[14.5px]">
                Back
              </button>
            )}
            <span className="mr-auto text-[13px] text-gray-400">
              {step === 3 ? "Nothing is sent until you press below" : `Step ${step} of 3`}
            </span>
            <button
              type="button"
              disabled={submitting}
              onClick={step === 3 ? send : next}
              className="btn-cta px-6 py-3 text-[14.5px] disabled:opacity-60"
            >
              {step === 3 ? (submitting ? "Sending…" : "Send quote request") : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

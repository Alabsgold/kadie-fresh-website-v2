"use client";

import { useRef, useState } from "react";
import type { SiteSettings } from "@/generated/prisma/client";
import { updateSiteSettings } from "@/app/actions/settings";
import { useToast } from "@/components/ui/Toast";

const LEGAL_PAGES: { label: string; status: string; pillClass: string }[] = [
  { label: "Terms of service", status: "Published", pillClass: "bg-green-50 text-green-700" },
  { label: "Privacy policy", status: "Published", pillClass: "bg-green-50 text-green-700" },
  { label: "Cookie notice", status: "Draft", pillClass: "bg-orange-50 text-orange-700" },
];

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-600">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
      />
    </div>
  );
}

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState({
    businessName: settings.businessName,
    tagline: settings.tagline,
    email: settings.email,
    phone: settings.phone,
    address: settings.address,
    hours: settings.hours,
    instagramHandle: settings.instagramHandle,
    linkedinPath: settings.linkedinPath,
    seoTitle: settings.seoTitle,
    seoDescription: settings.seoDescription,
    googleSearchConsoleId: settings.googleSearchConsoleId ?? "",
    heroVideoUrl: settings.heroVideoUrl,
    heroPosterUrl: settings.heroPosterUrl,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<"video" | "poster" | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  async function uploadHeroMedia(kind: "video" | "poster", file: File | null | undefined) {
    if (!file) return;
    setUploading(kind);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "site");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || !data.url) {
        showToast(data.error || "Upload failed — try again");
        return;
      }
      set(kind === "video" ? "heroVideoUrl" : "heroPosterUrl", data.url);
      showToast(`New ${kind} uploaded — save changes to put it live`);
    } catch {
      showToast("Upload failed — try again");
    } finally {
      setUploading(null);
    }
  }

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    setSaving(true);
    await updateSiteSettings(form);
    setSaving(false);
    showToast("Site settings saved");
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-forest-900">
            Site settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Details that appear across the whole website.
          </p>
        </div>
        <button
          type="button"
          disabled={saving}
          onClick={save}
          className="btn-cta px-5 py-2.5 text-sm disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <div className="glass-card p-5">
          <div className="font-display text-lg font-bold text-forest-900">Business details</div>
          <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <Field label="Business name" value={form.businessName} onChange={(v) => set("businessName", v)} />
            <Field label="Tagline" value={form.tagline} onChange={(v) => set("tagline", v)} />
            <Field label="Contact email" value={form.email} onChange={(v) => set("email", v)} />
            <Field label="Phone / WhatsApp" value={form.phone} onChange={(v) => set("phone", v)} />
            <Field label="Address" value={form.address} onChange={(v) => set("address", v)} />
            <Field label="Opening hours" value={form.hours} onChange={(v) => set("hours", v)} />
            <Field
              label="Instagram handle"
              value={form.instagramHandle}
              onChange={(v) => set("instagramHandle", v)}
            />
            <Field
              label="LinkedIn path"
              value={form.linkedinPath}
              onChange={(v) => set("linkedinPath", v)}
            />
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="font-display text-lg font-bold text-forest-900">Search &amp; discovery</div>
          <div className="mt-3.5 flex flex-col gap-3.5">
            <Field label="Page title" value={form.seoTitle} onChange={(v) => set("seoTitle", v)} />
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-600">
                Meta description
              </label>
              <textarea
                value={form.seoDescription}
                onChange={(e) => set("seoDescription", e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-600">
                Google Search Console verification
              </label>
              <input
                value={form.googleSearchConsoleId}
                onChange={(e) => set("googleSearchConsoleId", e.target.value)}
                placeholder="google-site-verification=…"
                className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Pasted here, it is written into the site head automatically.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="font-display text-lg font-bold text-forest-900">Homepage hero</div>
          <p className="mt-1 text-xs text-gray-500">
            The video behind the homepage headline. Keep clips short (10–20 seconds), MP4, and
            ideally under 15MB so the page stays fast. The design adapts to any footage — no
            other changes needed when you swap it.
          </p>
          <div className="mt-3.5 flex flex-col gap-3.5">
            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm"
              className="hidden"
              onChange={(e) => {
                uploadHeroMedia("video", e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <input
              ref={posterInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                uploadHeroMedia("poster", e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Hero video
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    value={form.heroVideoUrl}
                    onChange={(e) => set("heroVideoUrl", e.target.value)}
                    className="w-full min-w-0 flex-1 rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                  <button
                    type="button"
                    disabled={uploading !== null}
                    onClick={() => videoInputRef.current?.click()}
                    className="btn-outline flex-none px-3.5 py-2 text-xs disabled:opacity-60"
                  >
                    {uploading === "video" ? "Uploading…" : "Upload new"}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Poster image (shown while the video loads — optional)
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    value={form.heroPosterUrl}
                    onChange={(e) => set("heroPosterUrl", e.target.value)}
                    placeholder="None — the green backdrop shows instead"
                    className="w-full min-w-0 flex-1 rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                  <button
                    type="button"
                    disabled={uploading !== null}
                    onClick={() => posterInputRef.current?.click()}
                    className="btn-outline flex-none px-3.5 py-2 text-xs disabled:opacity-60"
                  >
                    {uploading === "poster" ? "Uploading…" : "Upload new"}
                  </button>
                </div>
              </div>
            </div>
            {form.heroVideoUrl && (
              <video
                key={form.heroVideoUrl}
                src={form.heroVideoUrl}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="h-40 w-full rounded-2xl bg-forest-900 object-cover"
              />
            )}
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="font-display text-lg font-bold text-forest-900">Legal pages</div>
          <div className="mt-3.5 flex flex-col divide-y divide-forest-800/6">
            {LEGAL_PAGES.map((page) => (
              <div key={page.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <span className="text-sm font-semibold text-forest-900">{page.label}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${page.pillClass}`}>
                  {page.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

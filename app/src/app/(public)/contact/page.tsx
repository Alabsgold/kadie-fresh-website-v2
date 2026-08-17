import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSiteSettings } from "@/lib/data/settings";
import { CATEGORY_SWATCH } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "WhatsApp is fastest — it is the number the whole team watches. Email suits documentation and standing-order paperwork.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const rows = [
    {
      label: "Tap to call",
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s+/g, "")}`,
    },
    {
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      label: "Opening hours",
      value: settings.hours,
      href: undefined,
    },
    {
      label: "Facility",
      value: settings.address,
      href: undefined,
    },
  ] as const;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Message the line."
        subcopy="WhatsApp is fastest — it is the number the whole team watches. Email suits documentation and standing-order paperwork."
      />

      <div className="grid grid-cols-1 gap-5.5 px-6 pt-5.5 pb-14 lg:grid-cols-[1.1fr_1fr]">
        <div className="glass-card flex flex-col divide-y divide-forest-800/8 p-2">
          {rows.map((row) =>
            row.href ? (
              <a
                key={row.label}
                href={row.href}
                className="flex flex-col gap-0.5 rounded-2xl px-4.5 py-4.5 transition-colors hover:bg-green-50"
              >
                <span className="text-xs font-bold tracking-[0.12em] text-green-600 uppercase">
                  {row.label}
                </span>
                <span className="font-display text-lg font-bold tracking-[-0.015em] text-forest-900">
                  {row.value}
                </span>
              </a>
            ) : (
              <div key={row.label} className="flex flex-col gap-0.5 px-4.5 py-4.5">
                <span className="text-xs font-bold tracking-[0.12em] text-green-600 uppercase">
                  {row.label}
                </span>
                <span className="font-display text-lg font-bold tracking-[-0.015em] text-forest-900">
                  {row.value}
                </span>
              </div>
            ),
          )}
        </div>

        <div className="flex flex-col gap-5.5">
          <div className="relative h-52 overflow-hidden rounded-3xl sm:h-60">
            <div className="h-full w-full" style={{ background: CATEGORY_SWATCH.Veg }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-8 w-8">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-orange-500 opacity-40" />
                <span className="absolute inset-0 m-auto h-3.5 w-3.5 rounded-full border-2 border-white bg-orange-500" />
              </div>
            </div>
          </div>

          <div className="glass-card flex flex-col gap-2.5 p-6">
            <h2 className="font-display text-xl font-extrabold tracking-[-0.02em] text-forest-900">
              Need a price?
            </h2>
            <p className="text-[14.5px] leading-relaxed text-pretty text-gray-600">
              The quote form captures cut spec, volume and frequency in three steps — it gets you
              an answer faster than a message.
            </p>
            <Link href="/quote" className="btn-cta mt-2 inline-flex w-fit px-6.5 py-3.5 text-[15px]">
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { getQuoteByReference } from "@/lib/data/enquiries";

export const metadata: Metadata = {
  title: "Track your quote",
  description: "Check the status and response of your Kadie Fresh quote request.",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

const STATUS_CONFIG = {
  NEW: { label: "Under review", pillClass: "bg-orange-50 text-orange-700 border-orange-200" },
  REPLIED: { label: "Quote Ready", pillClass: "bg-green-50 text-green-700 border-green-200" },
  CLOSED: { label: "Completed", pillClass: "bg-gray-100 text-gray-600 border-gray-200" },
} as const;

type PageProps = {
  searchParams: Promise<{ ref?: string }>;
};

export default async function TrackQuotePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawRef = params.ref ?? "";
  const refCode = rawRef.trim().toUpperCase();

  const quote = refCode ? await getQuoteByReference(refCode) : null;
  const hasSearched = Boolean(refCode);

  return (
    <>
      <PageHeader
        eyebrow="Quote Tracker"
        title="Check your quote status."
        subcopy="Enter your reference code (e.g. KF-1204) to see the current status of your request and view our response."
      />

      <div className="px-6 pb-16">
        <div className="mx-auto max-w-2xl">
          {/* Reference Lookup Form */}
          <Reveal className="glass-panel p-6 sm:p-8">
            <form action="/track-quote" method="GET" className="flex flex-col gap-4">
              <label htmlFor="ref" className="text-sm font-bold text-forest-900">
                Reference Code
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="ref"
                  name="ref"
                  type="text"
                  defaultValue={refCode}
                  placeholder="e.g. KF-1204"
                  required
                  className="flex-1 rounded-xl border border-forest-800/14 bg-white px-4 py-3.25 font-mono text-base font-semibold text-forest-900 outline-none transition-all placeholder:font-sans placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
                />
                <button type="submit" className="btn-cta px-7 py-3.25 text-base whitespace-nowrap">
                  Track quote →
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Your reference code was displayed after submitting your quote request.
              </p>
            </form>
          </Reveal>

          {/* Results View */}
          {hasSearched && (
            <div className="mt-8">
              {quote ? (
                <Reveal className="glass-panel overflow-hidden p-6 sm:p-8">
                  {/* Status Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest-800/8 pb-5">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Reference Number
                      </span>
                      <h2 className="font-mono text-2xl font-extrabold text-forest-900">
                        {quote.reference}
                      </h2>
                    </div>
                    <span
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-bold ${
                        STATUS_CONFIG[quote.status as keyof typeof STATUS_CONFIG]?.pillClass ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {STATUS_CONFIG[quote.status as keyof typeof STATUS_CONFIG]?.label ?? quote.status}
                    </span>
                  </div>

                  {/* Quote Request Summary */}
                  <div className="mt-6 space-y-3.5">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                      <div className="rounded-xl border border-forest-800/8 bg-white/60 p-3.5">
                        <span className="text-xs font-medium text-gray-400 block mb-0.5">Submitted by</span>
                        <span className="font-semibold text-forest-900">
                          {quote.name} {quote.business ? `(${quote.business})` : ""}
                        </span>
                      </div>
                      <div className="rounded-xl border border-forest-800/8 bg-white/60 p-3.5">
                        <span className="text-xs font-medium text-gray-400 block mb-0.5">Date submitted</span>
                        <span className="font-semibold text-forest-900">{formatDate(quote.createdAt)}</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-forest-800/8 bg-white/60 p-3.5 text-sm">
                      <span className="text-xs font-medium text-gray-400 block mb-1">Requested lines & details</span>
                      <div className="font-medium text-forest-900">
                        {quote.items.length > 0 ? quote.items.join(", ") : "Custom specification"}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {quote.volume} · {quote.frequency} {quote.location ? `· Deliver to ${quote.location}` : ""}
                      </div>
                    </div>
                  </div>

                  {/* Admin Reply Section */}
                  {quote.status === "REPLIED" && quote.replyMessage ? (
                    <div className="mt-7 rounded-2xl border border-green-500/30 bg-green-50/70 p-5.5 sm:p-6 shadow-sm">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-bold tracking-wider text-green-800 uppercase flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                          Official Kadie Fresh Response
                        </span>
                        {quote.repliedAt && (
                          <span className="text-xs text-gray-500">{formatDate(quote.repliedAt)}</span>
                        )}
                      </div>
                      <div className="whitespace-pre-wrap font-sans text-base leading-relaxed text-forest-950 font-medium">
                        {quote.replyMessage}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <a
                          href={`https://wa.me/2348105420458?text=${encodeURIComponent(
                            `Hello, I would like to proceed with my quote ${quote.reference}.`,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-cta px-6 py-2.5 text-sm inline-flex items-center gap-2"
                        >
                          Confirm order on WhatsApp →
                        </a>
                        <Link href="/contact" className="btn-outline px-5 py-2.5 text-sm">
                          Contact team
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-7 rounded-2xl border border-orange-200 bg-orange-50/50 p-5 text-sm text-orange-950">
                      <div className="font-semibold text-orange-900 mb-1 flex items-center gap-2">
                        <span>⏳</span> Request received & processing
                      </div>
                      <p className="text-orange-900/80 leading-relaxed">
                        Our team is preparing your custom pack and pricing quote. We reply within one working day (Mon–Sat, 6am–6pm). Check back soon or contact us via WhatsApp for urgent orders.
                      </p>
                    </div>
                  )}
                </Reveal>
              ) : (
                <Reveal className="glass-panel p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl text-red-600 mb-3">
                    ?
                  </div>
                  <h3 className="font-display text-xl font-bold text-forest-900">
                    No quote found
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-500 max-w-md mx-auto">
                    We couldn&apos;t find a quote matching reference <strong className="font-mono text-gray-800">{refCode}</strong>. Please double-check your code or request a new quote below.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <Link href="/quote" className="btn-cta px-6 py-2.5 text-sm">
                      Request a quote
                    </Link>
                    <Link href="/contact" className="btn-outline px-5 py-2.5 text-sm">
                      Contact support
                    </Link>
                  </div>
                </Reveal>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

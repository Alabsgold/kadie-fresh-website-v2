"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/generated/prisma/client";
import { PageHeader } from "@/components/ui/PageHeader";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Tooltip } from "@/components/ui/Tooltip";
import { useToast } from "@/components/ui/Toast";
import { CATEGORY_SWATCH } from "@/lib/images";

const FILTERS = ["All", "Fruit", "Veg"] as const;

export function ProductsBrowser({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");
  const { showToast } = useToast();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (filter !== "All" && p.category !== filter) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, filter, query]);

  return (
    <>
      <PageHeader
        eyebrow="The catalogue"
        title="Every line we prepare."
        subcopy="Washed, cut and sealed within four hours. Retail packs, kitchen volumes and bulk pallets from the same line — each one date-coded to the batch it came from."
      />

      <div className="flex flex-wrap items-center gap-3 px-6 pb-5">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
              {f}
            </Chip>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 rounded-full border border-forest-800/10 bg-white/70 px-4 py-2.25 backdrop-blur-md">
          <span className="text-sm text-gray-400">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lines"
            className="w-37.5 border-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>
        <Tooltip label="One-page PDF: every line, pack size, MOQ and shelf life">
          <a
            href="/api/line-card"
            onClick={() => showToast("Line card PDF downloaded")}
            className="btn-outline px-4.5 py-2.5 text-sm"
          >
            Download line card ↓
          </a>
        </Tooltip>
      </div>

      <div className="px-6 pb-14">
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p) => (
              <Reveal key={p.id}>
                <Link href={`/products/${p.slug}`} className="glass-card block p-3.5">
                  <div
                    className="h-38 rounded-2xl bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${p.heroImageUrl}), ${
                        CATEGORY_SWATCH[p.category] ?? CATEGORY_SWATCH.Veg
                      }`,
                    }}
                  />
                  <div className="mt-3.5 flex items-center gap-2">
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      {p.category}
                    </span>
                    <span className="text-xs text-gray-400">MOQ {p.moq}</span>
                  </div>
                  <div className="mt-2 font-display text-[19px] font-bold tracking-[-0.02em] text-forest-900">
                    {p.name}
                  </div>
                  <div className="mt-0.75 text-[13.5px] text-gray-500">{p.pack}</div>
                  <div className="mt-3.5 flex items-center justify-between">
                    <span className="text-[13.5px] font-semibold whitespace-nowrap text-green-600">
                      View spec →
                    </span>
                    <span className="text-xs text-gray-400">{p.shelfLife}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-forest-800/18 bg-[#FAFDFB] px-5 py-17.5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-xl">
              ⌕
            </div>
            <div className="font-display text-xl font-bold text-forest-900">
              No line matches that
            </div>
            <p className="max-w-76 text-sm text-gray-500">
              We cut to spec on request. Tell us what you need and we will quote it even if it is
              not listed.
            </p>
            <div className="mt-1.5 flex gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilter("All");
                }}
                className="btn-outline px-4.5 py-2.5 text-sm"
              >
                Clear search
              </button>
              <Link href="/quote" className="btn-cta px-5 py-2.5 text-sm">
                Request a quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

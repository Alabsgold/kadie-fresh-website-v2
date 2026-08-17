"use client";

import { useMemo, useState } from "react";
import type { GalleryImage } from "@/generated/prisma/client";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { GALLERY_CATEGORIES } from "@/lib/galleryCategories";

const FILTERS = ["All", ...GALLERY_CATEGORIES] as const;

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? images : images.filter((img) => img.category === filter)),
    [images, filter],
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 px-6 pb-5">
        {FILTERS.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      <div className="px-6 pb-14">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visible.map((img, i) => (
            <Reveal key={img.id} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setSelected(img)}
                className="group block w-full cursor-pointer overflow-hidden rounded-2xl text-left"
              >
                <div
                  className="w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${img.url})`,
                    height: i % 2 === 0 ? "260px" : "190px",
                  }}
                />
                <div className="mt-2 text-sm font-semibold text-forest-900">{img.label}</div>
                <div className="text-xs text-gray-400">{img.category}</div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center gap-4 bg-black/85 p-6 backdrop-blur-md"
        >
          <div
            className="max-h-[70vh] w-full max-w-3xl rounded-2xl bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage: `url(${selected.url})`,
              aspectRatio: "4 / 3",
            }}
          />
          <div className="text-center">
            <div className="font-display text-lg font-bold text-white">{selected.label}</div>
            <div className="mt-1 text-xs tracking-wide text-white/60 uppercase">
              Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}

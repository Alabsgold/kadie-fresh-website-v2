import type { Metadata } from "next";
import { listAllGalleryImages } from "@/lib/data/gallery";
import { GalleryManager } from "@/components/studio/GalleryManager";

export const metadata: Metadata = { title: "Gallery" };

export default async function StudioGalleryPage() {
  const images = await listAllGalleryImages();
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-forest-900">
        Gallery
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Hidden photographs stay in the library but off the public gallery.
      </p>
      <GalleryManager initialImages={images} />
    </div>
  );
}

import type { Metadata } from "next";
import { listPublishedGalleryImages } from "@/lib/data/gallery";
import { PageHeader } from "@/components/ui/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "The line, the product and the dispatch floor — in the room, not on a brochure.",
};

export default async function GalleryPage() {
  const images = await listPublishedGalleryImages();

  return (
    <>
      <PageHeader eyebrow="Gallery" title="See it in the room" />
      <GalleryGrid images={images} />
    </>
  );
}

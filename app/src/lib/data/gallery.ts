import "server-only";
import { prisma } from "@/lib/prisma";

export async function listPublishedGalleryImages() {
  return prisma.galleryImage.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function listAllGalleryImages() {
  return prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
}

export { GALLERY_CATEGORIES } from "@/lib/galleryCategories";

"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
}

export async function createGalleryImage(data: { url: string; label: string; category: string }) {
  await requireSession();
  const count = await prisma.galleryImage.count();
  const image = await prisma.galleryImage.create({
    data: {
      url: data.url,
      label: data.label,
      category: data.category,
      published: false,
      sortOrder: count,
    },
  });
  revalidatePath("/studio/gallery");
  revalidatePath("/gallery");
  return image;
}

export async function toggleGalleryImagePublished(id: string, published: boolean) {
  await requireSession();
  const image = await prisma.galleryImage.update({ where: { id }, data: { published } });
  revalidatePath("/studio/gallery");
  revalidatePath("/gallery");
  return image;
}

export async function deleteGalleryImage(id: string) {
  await requireSession();
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/studio/gallery");
  revalidatePath("/gallery");
}

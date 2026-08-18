"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
}

function revalidateProductPaths() {
  revalidatePath("/studio/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function createDraftProduct() {
  await requireSession();
  const count = await prisma.product.count();
  const slug = `new-line-${randomUUID().slice(0, 8)}`;
  const product = await prisma.product.create({
    data: {
      slug,
      name: "New line",
      category: "Veg",
      pack: "—",
      grade: "—",
      shelfLife: "—",
      moq: "20 packs",
      storage: "—",
      origin: "—",
      blurb: "",
      // Empty until a photo is uploaded — cards render the category swatch
      // instead of a misleading stock image.
      heroImageUrl: "",
      thumbImageUrls: [],
      published: false,
      sortOrder: count,
    },
  });
  revalidateProductPaths();
  return product;
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    pack: string;
    grade: string;
    shelfLife: string;
    moq: string;
    storage: string;
    origin: string;
    blurb: string;
  },
) {
  await requireSession();
  const product = await prisma.product.update({ where: { id }, data });
  revalidateProductPaths();
  return product;
}

export async function updateProductImage(id: string, heroImageUrl: string) {
  await requireSession();
  const product = await prisma.product.update({ where: { id }, data: { heroImageUrl } });
  revalidateProductPaths();
  revalidatePath(`/products/${product.slug}`);
  return product;
}

export async function toggleProductPublished(id: string, published: boolean) {
  await requireSession();
  const product = await prisma.product.update({ where: { id }, data: { published } });
  revalidateProductPaths();
  return product;
}

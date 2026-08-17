import "server-only";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/generated/prisma/client";

export function specRows(product: Product) {
  return [
    { label: "Pack", value: product.pack },
    { label: "Grade", value: product.grade },
    { label: "Shelf life", value: product.shelfLife },
    { label: "Minimum order", value: product.moq },
    { label: "Storage", value: product.storage },
    { label: "Sourced", value: product.origin },
    { label: "Batch coding", value: "Date + farm code on every pack" },
  ];
}

export function hasPhotoWarning(product: Pick<Product, "thumbImageUrls">) {
  return product.thumbImageUrls.length === 0;
}

export async function listPublishedProducts() {
  return prisma.product.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function listAllProducts() {
  return prisma.product.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

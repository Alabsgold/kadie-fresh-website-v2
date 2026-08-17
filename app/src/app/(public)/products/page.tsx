import type { Metadata } from "next";
import { listPublishedProducts } from "@/lib/data/products";
import { ProductsBrowser } from "@/components/products/ProductsBrowser";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Washed, cut and sealed within four hours. Retail packs, kitchen volumes and bulk pallets from the same line.",
};

export default async function ProductsPage() {
  const products = await listPublishedProducts();
  return <ProductsBrowser products={products} />;
}

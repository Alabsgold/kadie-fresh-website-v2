import type { Metadata } from "next";
import { listAllProducts, hasPhotoWarning } from "@/lib/data/products";
import { ProductsManager } from "@/components/studio/ProductsManager";

export const metadata: Metadata = { title: "Products" };

export default async function StudioProductsPage() {
  const products = await listAllProducts();
  const initialProducts = products.map((product) => ({
    ...product,
    photoWarning: hasPhotoWarning(product),
  }));

  return <ProductsManager initialProducts={initialProducts} />;
}

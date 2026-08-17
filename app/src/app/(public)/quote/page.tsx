import type { Metadata } from "next";
import { listPublishedProducts } from "@/lib/data/products";
import { QuoteWizard } from "@/components/quote/QuoteWizard";

export const metadata: Metadata = { title: "Request a quote" };

export default async function QuotePage(props: PageProps<"/quote">) {
  const searchParams = await props.searchParams;
  const products = await listPublishedProducts();
  const productSlug = typeof searchParams.product === "string" ? searchParams.product : undefined;
  const preselected = products.find((p) => p.slug === productSlug);

  return (
    <QuoteWizard
      productNames={products.map((p) => p.name)}
      initialItem={preselected?.name}
    />
  );
}

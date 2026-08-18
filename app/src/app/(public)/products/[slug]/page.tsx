import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, specRows } from "@/lib/data/products";
import { getSiteSettings } from "@/lib/data/settings";
import { Reveal } from "@/components/ui/Reveal";
import { Tooltip } from "@/components/ui/Tooltip";
import { CATEGORY_SWATCH } from "@/lib/images";

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductDetailPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()]);
  if (!product) notFound();

  const swatch = CATEGORY_SWATCH[product.category] ?? CATEGORY_SWATCH.Veg;
  const telHref = `tel:+${settings.phone.replace(/\D/g, "")}`;

  return (
    <>
      <div className="px-6 pt-6.5">
        <div className="text-[13px] text-gray-400">
          <Link href="/products" className="font-semibold text-green-600">
            Products
          </Link>{" "}
          · {product.name}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8.5 px-6 pt-5.5 pb-11 lg:grid-cols-2">
        <div>
          <div
            className="h-80 rounded-3xl bg-cover bg-center shadow-[0_20px_44px_rgba(14,61,34,0.12)]"
            style={{
              backgroundImage: product.heroImageUrl
                ? `url(${product.heroImageUrl}), ${swatch}`
                : swatch,
            }}
          />
          {product.thumbImageUrls.length > 0 && (
            <div className="mt-3 flex gap-2.5">
              {product.thumbImageUrls.map((url, i) => (
                <div
                  key={i}
                  className="h-16 w-16 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${url})` }}
                />
              ))}
            </div>
          )}
        </div>

        <Reveal>
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            {product.category}
          </span>
          <h1 className="mt-3 mb-2.5 font-display text-4xl font-extrabold tracking-[-0.035em] text-forest-900">
            {product.name}
          </h1>
          <p className="mb-5 max-w-md text-base leading-relaxed text-pretty text-gray-600">
            {product.blurb}
          </p>

          <div className="glass-panel overflow-hidden rounded-2xl">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-3 text-xs font-bold tracking-[0.12em] text-green-600 uppercase">
              Spec sheet
              <Tooltip label="Every figure here is held per batch and printed on the pack label">
                <span className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-green-600/50 text-[10px] text-green-600 normal-case">
                  i
                </span>
              </Tooltip>
            </div>
            {specRows(product).map((row) => (
              <div
                key={row.label}
                className="flex justify-between gap-5 border-t border-forest-800/7 px-4 py-2.75 text-sm"
              >
                <span className="text-gray-500">{row.label}</span>
                <span className="text-right font-semibold text-forest-900">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/quote?product=${encodeURIComponent(product.slug)}`}
              className="btn-cta px-6.5 py-3.75 text-[15.5px]"
            >
              Request a quote for this line
            </Link>
            <a
              href={telHref}
              className="rounded-full border border-forest-800/16 px-6 py-3.75 text-[15px] font-semibold text-forest-800"
            >
              Call the line
            </a>
          </div>

          <div className="mt-5.5 flex gap-3 rounded-2xl border-l-3 border-green-600 bg-green-50 px-4.5 py-4">
            <div>
              <div className="text-[14.5px] font-bold text-forest-800">Our guarantee</div>
              <p className="mt-1.25 text-sm leading-relaxed text-pretty text-forest-800/80">
                {settings.guaranteeStatement}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}

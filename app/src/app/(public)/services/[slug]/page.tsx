import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";
import { CATEGORY_SWATCH } from "@/lib/images";

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  return { title: service?.name ?? "Service" };
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <div className="px-6 pt-6.5">
        <div className="text-[13px] text-gray-400">
          <Link href="/services" className="font-semibold text-green-600">
            Services
          </Link>{" "}
          · {service.name}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8.5 px-6 pt-5.5 pb-14 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            {service.kicker}
          </span>
          <h1 className="mt-3 mb-2.5 font-display text-4xl font-extrabold tracking-[-0.035em] text-forest-900">
            {service.name}
          </h1>
          <p className="mb-6 max-w-md text-base leading-relaxed text-pretty text-gray-600">
            {service.blurb}
          </p>

          <ul className="flex flex-col gap-3">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-[15px] text-forest-800">
                <span className="mt-0.5 flex h-5.5 w-5.5 flex-none items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-600">
                  ✓
                </span>
                <span className="leading-relaxed text-pretty">{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/quote?service=${encodeURIComponent(service.slug)}`}
              className="btn-cta px-6.5 py-3.75 text-[15.5px]"
            >
              Request a quote
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-forest-800/16 px-6 py-3.75 text-[15px] font-semibold text-forest-800"
            >
              Talk to us
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <div
            className="h-56 rounded-3xl shadow-[0_20px_44px_rgba(14,61,34,0.12)]"
            style={{ background: CATEGORY_SWATCH.Veg }}
          />

          <div className="glass-panel mt-4.5 overflow-hidden rounded-2xl">
            <div className="bg-green-50 px-4 py-3 text-xs font-bold tracking-[0.12em] text-green-600 uppercase">
              At a glance
            </div>
            <div className="flex justify-between gap-5 border-t border-forest-800/7 px-4 py-2.75 text-sm">
              <span className="text-gray-500">Turnaround</span>
              <span className="text-right font-semibold text-forest-900">
                {service.turnaround}
              </span>
            </div>
            <div className="flex justify-between gap-5 border-t border-forest-800/7 px-4 py-2.75 text-sm">
              <span className="text-gray-500">Minimum</span>
              <span className="text-right font-semibold text-forest-900">{service.minimum}</span>
            </div>
            <div className="flex justify-between gap-5 border-t border-forest-800/7 px-4 py-2.75 text-sm">
              <span className="text-gray-500">Batch coding</span>
              <span className="text-right font-semibold text-forest-900">Included</span>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}

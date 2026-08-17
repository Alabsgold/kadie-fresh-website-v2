import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CATEGORY_SWATCH } from "@/lib/images";
import { FOUNDER } from "@/content/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kadie Fresh prepares fresh produce in a controlled facility in Ikorodu and supplies homes, kitchens, distributors and export buyers across and beyond Lagos.",
};

const STATS = [
  { value: "10+", label: "Prepared lines" },
  { value: "4 hrs", label: "Wash to seal" },
  { value: "Lagos", label: "And export" },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Prep is the hardest part of a kitchen. We do it first."
        subcopy="Kadie Fresh prepares fresh produce in a controlled facility in Ikorodu and supplies homes, kitchens, distributors and export buyers across and beyond Lagos."
      />

      <section className="px-6 pt-5.5 pb-11">
        <Reveal className="relative overflow-hidden rounded-3xl">
          <div
            className="h-64 w-full sm:h-80"
            style={{ background: CATEGORY_SWATCH.Veg }}
          />
          <div className="glass-panel absolute inset-x-4 bottom-4 grid grid-cols-3 gap-3 rounded-2xl px-5 py-5 sm:inset-x-6 sm:bottom-6 sm:px-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-extrabold tracking-[-0.03em] text-forest-900 sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[12.5px] text-gray-600 sm:text-[13px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="founder" className="px-6 pb-16">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="text-xs font-bold tracking-[0.14em] text-green-600 uppercase">
              The founder
            </div>
            <h2 className="mt-3 font-display text-[28px] font-extrabold tracking-[-0.03em] text-forest-900 sm:text-[32px]">
              {FOUNDER.name}
            </h2>
            <div className="mt-1 text-[15px] font-semibold text-gray-500">
              {FOUNDER.role}
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {FOUNDER.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[15.5px] leading-relaxed text-pretty text-gray-600"
                >
                  {p}
                </p>
              ))}
            </div>

            <blockquote className="mt-7 rounded-r-2xl border-l-4 border-orange-500 bg-orange-50/60 py-4 pr-5 pl-5.5 text-[17px] leading-relaxed text-pretty text-forest-900 italic">
              &ldquo;{FOUNDER.pullQuote}&rdquo;
            </blockquote>

            <Link href="/team" className="btn-cta mt-8 inline-flex px-7.5 py-4 text-base">
              Meet the team &rarr;
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

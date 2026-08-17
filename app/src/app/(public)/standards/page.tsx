import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { STANDARDS } from "@/content/standards";

export const metadata: Metadata = {
  title: "Trust & standards",
  description:
    "Six things govern how the line runs. Each one is written down, recorded per batch, and available to any buyer who asks.",
};

export default function StandardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust & standards"
        title="I'm precise, on the open."
        subcopy="Six things govern how the line runs. Each one is written down, recorded per batch, and available to any buyer who asks."
      />

      <div className="grid grid-cols-1 gap-4.5 px-6 pt-5.5 pb-11 sm:grid-cols-2 lg:grid-cols-3">
        {STANDARDS.map((standard, i) => (
          <Reveal
            key={standard.title}
            style={{ transitionDelay: `${i * 55}ms` }}
            className="glass-card flex flex-col gap-3 p-5.5"
          >
            <span className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-full bg-green-50">
              <span className="inline-block h-3.5 w-3.5 rounded-full bg-green-600" />
            </span>
            <h2 className="font-display text-lg font-bold tracking-[-0.02em] text-forest-900">
              {standard.title}
            </h2>
            <p className="text-[14.5px] leading-relaxed text-pretty text-gray-600">
              {standard.description}
            </p>
          </Reveal>
        ))}
      </div>

      <section className="mx-6 mb-14 flex flex-wrap items-center gap-5.5 rounded-3xl bg-[linear-gradient(120deg,#0E3D22,#07200F)] p-10">
        <div className="min-w-65 flex-1">
          <h2 className="font-display text-[28px] font-extrabold text-balance text-white">
            Exporting? The credentials sit on their own page.
          </h2>
          <p className="mt-2.5 text-[15.5px] text-[#EAF6EE]/66">
            NAFDAC, NEPC and phytosanitary certification, with the consignment process written
            out.
          </p>
        </div>
        <Link href="/export-credentials" className="btn-cta px-7.5 py-4 text-base">
          Export credentials &rarr;
        </Link>
      </section>
    </>
  );
}

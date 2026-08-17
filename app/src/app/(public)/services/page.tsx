import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The same facility, the same four-hour window. What changes is the pack, the volume and the paperwork that travels with it.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Four services, one line."
        subcopy="The same facility, the same four-hour window. What changes is the pack, the volume and the paperwork that travels with it."
      />

      <div className="grid grid-cols-1 gap-4.5 px-6 pt-5.5 pb-14 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <Reveal key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="glass-card flex h-full flex-col gap-3 p-5.5 transition-[transform,box-shadow,border-color] duration-240 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1 hover:border-green-600/30"
            >
              <span className="text-xs font-bold tracking-[0.12em] text-green-600 uppercase">
                {service.kicker}
              </span>
              <h2 className="font-display text-xl font-extrabold tracking-[-0.02em] text-forest-900">
                {service.name}
              </h2>
              <p className="flex-1 text-[14.5px] leading-relaxed text-pretty text-gray-600">
                {service.blurb}
              </p>
              <div className="flex items-center justify-between border-t border-forest-800/8 pt-3 text-[13px]">
                <span className="text-gray-500">{service.turnaround}</span>
                <span className="font-semibold text-green-600">View service &rarr;</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}

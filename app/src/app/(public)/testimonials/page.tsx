import type { Metadata } from "next";
import { listApprovedTestimonials } from "@/lib/data/testimonials";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What kitchens, caterers and export partners say about buying from Kadie Fresh.",
};

export default async function TestimonialsPage() {
  const testimonials = await listApprovedTestimonials();

  return (
    <>
      <PageHeader eyebrow="Testimonials" title="What buyers tell us" />

      <div className="px-6 pb-14">
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal key={t.id}>
              <div className="glass-card flex h-full flex-col p-6">
                <div className="font-display text-6xl leading-none text-green-200">&ldquo;</div>
                <p className="-mt-3 flex-1 text-[15px] leading-relaxed text-pretty text-forest-900">
                  {t.quote}
                </p>
                <div className="mt-5 border-t border-black/5 pt-4">
                  <div className="font-semibold text-forest-900">{t.authorName}</div>
                  <div className="text-sm text-gray-500">{t.authorRole}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

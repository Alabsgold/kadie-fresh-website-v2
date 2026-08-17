import type { Metadata } from "next";
import { listAllTestimonials } from "@/lib/data/testimonials";
import { TestimonialsManager } from "@/components/studio/TestimonialsManager";

export const metadata: Metadata = { title: "Testimonials" };

export default async function StudioTestimonialsPage() {
  const testimonials = await listAllTestimonials();
  return <TestimonialsManager initialTestimonials={testimonials} />;
}

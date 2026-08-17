import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FAQS } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Practical answers on shelf life, delivery, minimum orders, payment, spec issues and certification.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title="Practical answers" />

      <div className="px-6 pt-5.5 pb-11">
        <div className="mx-auto max-w-2xl">
          <FaqAccordion faqs={FAQS} />
        </div>
      </div>

      <section className="mx-6 mb-14 flex flex-wrap items-center justify-between gap-5.5 rounded-3xl bg-[linear-gradient(120deg,#0E3D22,#07200F)] p-10">
        <h2 className="font-display text-[26px] font-extrabold text-balance text-white">
          Still not answered? Message the line directly.
        </h2>
        <Link href="/contact" className="btn-cta px-7.5 py-4 text-base">
          Contact us
        </Link>
      </section>
    </>
  );
}

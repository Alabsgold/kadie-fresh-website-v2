import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = { title: "Terms of service" };

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const paragraphs = settings.termsContent.split(/\n\s*\n/).filter((p) => p.trim());

  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of service" />
      <div className="px-6 pt-5.5 pb-14">
        <div className="mx-auto flex max-w-2xl flex-col gap-4.5">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-[15.5px] leading-relaxed text-pretty text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

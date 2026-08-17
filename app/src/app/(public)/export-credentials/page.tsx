import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { EXPORT_PROCESS } from "@/content/standards";
import { listCertifications, CERTIFICATION_STATUS_LABEL } from "@/lib/data/certifications";

export const metadata: Metadata = {
  title: "Export credentials",
  description:
    "Registrations held continuously, certification arranged per consignment, and a process an importer can audit.",
};

const STATUS_PILL: Record<string, string> = {
  VALID: "bg-green-50 text-green-700",
  ON_REQUEST: "bg-blue-50 text-blue-700",
  RENEWING: "bg-orange-50 text-orange-700",
};

export default async function ExportCredentialsPage() {
  const certifications = await listCertifications();

  return (
    <>
      <section className="bg-[linear-gradient(160deg,#0E3D22,#0B2E1A)] px-6 pt-14 pb-11">
        <div className="text-xs font-bold tracking-[0.14em] text-[#86EFAC] uppercase">
          Export credentials
        </div>
        <h1 className="mt-3 mb-2.5 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-balance text-white sm:text-5xl">
          The paperwork, before you ask for it.
        </h1>
        <p className="max-w-2xl text-[16px] leading-relaxed text-pretty text-white/70">
          Registrations held continuously, certification arranged per consignment, and a process
          an importer can audit.
        </p>
        <div className="mt-7 flex flex-wrap gap-3.5">
          <Link href="/api/line-card" className="btn-cta px-7.5 py-4 text-base">
            Download line card &darr;
          </Link>
          <Link
            href="/distributors"
            className="rounded-full border border-white/40 bg-white/10 px-7.5 py-4 text-base font-bold text-white backdrop-blur-md transition-colors hover:border-white hover:bg-white/20"
          >
            Become a distributor
          </Link>
        </div>
      </section>

      <section className="px-6 pt-11 pb-5">
        <div className="text-xs font-bold tracking-[0.14em] text-green-600 uppercase">
          What we hold
        </div>
        <h2 className="mt-2.5 mb-6.5 font-display text-[32px] font-extrabold tracking-[-0.035em] text-forest-900">
          Documents on file
        </h2>

        <Reveal className="glass-panel overflow-x-auto rounded-2xl">
          <div className="min-w-165">
            <div className="grid grid-cols-[1.6fr_1.3fr_1fr_1fr_auto] gap-4 bg-green-50 px-5 py-3 text-xs font-bold tracking-[0.1em] text-green-600 uppercase">
              <span>Name</span>
              <span>Issuer</span>
              <span>Ref</span>
              <span>Valid</span>
              <span className="text-right">Status</span>
            </div>
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="grid grid-cols-[1.6fr_1.3fr_1fr_1fr_auto] items-center gap-4 border-t border-forest-800/7 px-5 py-3.5 text-sm"
              >
                <span className="font-semibold text-forest-900">{cert.name}</span>
                <span className="text-gray-500">{cert.issuer}</span>
                <span className="text-gray-500">{cert.ref}</span>
                <span className="text-gray-500">Valid to {cert.expires}</span>
                <span
                  className={`ml-auto w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_PILL[cert.status] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {CERTIFICATION_STATUS_LABEL[cert.status] ?? cert.status}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-6 pt-11 pb-14">
        <div className="text-xs font-bold tracking-[0.14em] text-green-600 uppercase">
          How a consignment runs
        </div>
        <h2 className="mt-2.5 mb-7.5 font-display text-[32px] font-extrabold tracking-[-0.035em] text-forest-900">
          Four steps, every consignment
        </h2>
        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
          {EXPORT_PROCESS.map((step, i) => (
            <Reveal key={step.title} style={{ transitionDelay: `${i * 55}ms` }}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-sm font-bold text-green-600">
                {i + 1}
              </span>
              <div className="mt-3.5 text-base font-bold text-forest-900">{step.title}</div>
              <div className="mt-0.5 text-[13.5px] text-gray-500">{step.description}</div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

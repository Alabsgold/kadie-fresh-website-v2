import type { Metadata } from "next";
import { listCertifications } from "@/lib/data/certifications";
import { CertificationsManager } from "@/components/studio/CertificationsManager";

export const metadata: Metadata = { title: "Certifications" };

export default async function StudioCertificationsPage() {
  const certifications = await listCertifications();
  return <CertificationsManager initialCertifications={certifications} />;
}

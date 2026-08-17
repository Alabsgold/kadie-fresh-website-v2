import "server-only";
import { prisma } from "@/lib/prisma";

export async function listCertifications() {
  return prisma.certification.findMany({ orderBy: { sortOrder: "asc" } });
}

export { CERTIFICATION_STATUS_LABEL } from "@/lib/certificationStatus";

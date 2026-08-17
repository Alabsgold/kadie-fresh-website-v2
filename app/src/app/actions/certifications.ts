"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { CertificationStatus } from "@/generated/prisma/client";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
}

export async function createDraftCertification() {
  await requireSession();
  const count = await prisma.certification.count();
  const cert = await prisma.certification.create({
    data: {
      name: "New certification",
      issuer: "Issuer",
      ref: "—",
      expires: "—",
      status: "RENEWING",
      sortOrder: count,
    },
  });
  revalidatePath("/studio/certifications");
  revalidatePath("/export-credentials");
  return cert;
}

export async function updateCertification(
  id: string,
  data: { name: string; issuer: string; ref: string; expires: string; status: CertificationStatus },
) {
  await requireSession();
  const cert = await prisma.certification.update({ where: { id }, data });
  revalidatePath("/studio/certifications");
  revalidatePath("/export-credentials");
  return cert;
}

export async function deleteCertification(id: string) {
  await requireSession();
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/studio/certifications");
  revalidatePath("/export-credentials");
}

import "server-only";
import { prisma } from "@/lib/prisma";

/** Generates a short, human-readable, unique enquiry reference like "KF-1204". */
export async function generateEnquiryReference(): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const count = await prisma.enquiry.count();
    const candidate = `KF-${1200 + count}`;
    const exists = await prisma.enquiry.findUnique({ where: { reference: candidate } });
    if (!exists) return candidate;
  }
  // Extremely unlikely fallback if concurrent submissions keep colliding.
  return `KF-${1200 + Math.floor(Math.random() * 100000)}`;
}

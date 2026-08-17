import "server-only";
import { prisma } from "@/lib/prisma";

export async function listApprovedTestimonials() {
  return prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function listAllTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
}

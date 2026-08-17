"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
}

export async function createTestimonial(data: {
  authorName: string;
  authorRole: string;
  quote: string;
}) {
  await requireSession();
  const count = await prisma.testimonial.count();
  const testimonial = await prisma.testimonial.create({
    data: {
      authorName: data.authorName,
      authorRole: data.authorRole,
      quote: data.quote,
      approved: false,
      sortOrder: count,
    },
  });
  revalidatePath("/studio/testimonials");
  revalidatePath("/testimonials");
  return testimonial;
}

export async function toggleTestimonialApproved(id: string, approved: boolean) {
  await requireSession();
  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: { approved },
  });
  revalidatePath("/studio/testimonials");
  revalidatePath("/testimonials");
  return testimonial;
}

export async function deleteTestimonial(id: string) {
  await requireSession();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/studio/testimonials");
  revalidatePath("/testimonials");
}

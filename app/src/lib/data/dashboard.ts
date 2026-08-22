import "server-only";
import { prisma } from "@/lib/prisma";
import { hasPhotoWarning } from "@/lib/data/products";

export async function getDashboardStats() {
  const [
    enquiryCount,
    quoteCount,
    products,
    certificationCount,
    lastPublishedPost,
    whatsappMetric,
    visitorsMetric,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { type: "QUOTE" } }),
    prisma.product.findMany({ select: { heroImageUrl: true, thumbImageUrls: true } }),
    prisma.certification.count(),
    prisma.blogPost.findFirst({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: { publishedAt: true },
    }),
    prisma.siteMetric.findUnique({ where: { key: "whatsapp_taps" } }),
    prisma.siteMetric.findUnique({ where: { key: "visitors" } }),
  ]);

  const missingPhotoCount = products.filter(hasPhotoWarning).length;
  const daysSinceLastPost = lastPublishedPost?.publishedAt
    ? Math.floor((Date.now() - lastPublishedPost.publishedAt.getTime()) / 86_400_000)
    : null;

  return {
    whatsappTaps: whatsappMetric?.count ?? 0,
    visitors: visitorsMetric?.count ?? 0,
    formEnquiries: enquiryCount,
    quoteRequests: quoteCount,
    attention: {
      missingPhotoCount,
      certificationCount,
      daysSinceLastPost,
    },
  };
}

export async function incrementMetric(key: "whatsapp_taps" | "visitors") {
  return prisma.siteMetric.upsert({
    where: { key },
    update: { count: { increment: 1 } },
    create: { key, count: 1 },
  });
}

export async function clearAllQuotesAndEnquiries() {
  await prisma.enquiry.deleteMany({});
  await prisma.siteMetric.upsert({
    where: { key: "whatsapp_taps" },
    update: { count: 0 },
    create: { key: "whatsapp_taps", count: 0 },
  });
  await prisma.siteMetric.upsert({
    where: { key: "visitors" },
    update: { count: 0 },
    create: { key: "visitors", count: 0 },
  });
}

export async function getRecentEnquiries(limit = 4) {
  return prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: limit });
}

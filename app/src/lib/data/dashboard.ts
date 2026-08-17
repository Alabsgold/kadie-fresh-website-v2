import "server-only";
import { prisma } from "@/lib/prisma";
import { hasPhotoWarning } from "@/lib/data/products";

export async function getDashboardStats() {
  const [enquiryCount, quoteCount, products, certificationCount, lastPublishedPost] =
    await Promise.all([
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { type: "QUOTE" } }),
      prisma.product.findMany({ select: { thumbImageUrls: true } }),
      prisma.certification.count(),
      prisma.blogPost.findFirst({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        select: { publishedAt: true },
      }),
    ]);

  const missingPhotoCount = products.filter(hasPhotoWarning).length;
  const daysSinceLastPost = lastPublishedPost?.publishedAt
    ? Math.floor((Date.now() - lastPublishedPost.publishedAt.getTime()) / 86_400_000)
    : null;

  return {
    // No real analytics integration is wired up yet — these two remain
    // manually-set placeholders until one is (e.g. WhatsApp click tracking,
    // page-view analytics). Everything else below is computed live.
    whatsappTaps: 38,
    visitors: 412,
    formEnquiries: enquiryCount,
    quoteRequests: quoteCount,
    attention: {
      missingPhotoCount,
      certificationCount,
      daysSinceLastPost,
    },
  };
}

export async function getRecentEnquiries(limit = 4) {
  return prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: limit });
}

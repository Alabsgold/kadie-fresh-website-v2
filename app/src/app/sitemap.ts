import { MetadataRoute } from "next";
import { SERVICES } from "@/content/services";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kadiefresh.com";

  // Fallbacks for when the database is not available (e.g. during build or cold environments)
  const fallbackProducts = [
    "pineapple",
    "ugu",
    "pepper",
    "carrots",
    "watermelon",
    "coconut",
    "onions",
    "plantain",
  ];

  const fallbackBlogs = [
    "cold-chain",
    "ugu",
    "export-docs",
  ];

  let products: { slug: string; updatedAt: Date }[] = [];
  let blogs: { slug: string; updatedAt: Date }[] = [];

  try {
    // Attempt to fetch dynamic products from the database
    const dbProducts = await prisma.product.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    products = dbProducts;
  } catch (e) {
    console.warn("Sitemap Generator: Could not fetch products from database, using seeded fallbacks.", e);
    products = fallbackProducts.map(slug => ({
      slug,
      updatedAt: new Date(),
    }));
  }

  try {
    // Attempt to fetch dynamic blog posts from the database
    const dbBlogs = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogs = dbBlogs;
  } catch (e) {
    console.warn("Sitemap Generator: Could not fetch blog posts from database, using seeded fallbacks.", e);
    blogs = fallbackBlogs.map(slug => ({
      slug,
      updatedAt: new Date(),
    }));
  }

  // Create product URL list
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Create blog URL list
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Create services URL list
  const serviceUrls = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(), // static content
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Core static pages
  const staticUrls = [
    "",
    "/about",
    "/contact",
    "/products",
    "/blog",
    "/services",
    "/faq",
    "/quote",
    "/distributors",
    "/gallery",
    "/standards",
    "/testimonials",
    "/export-credentials",
    "/privacy",
    "/terms",
    "/cookie-notice",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : 0.5,
  }));

  return [...staticUrls, ...serviceUrls, ...productUrls, ...blogUrls];
}

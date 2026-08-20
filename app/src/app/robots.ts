import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kadiefresh.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/studio/", // Protect the admin dashboard from being indexed
        "/api/",    // Protect internal APIs
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

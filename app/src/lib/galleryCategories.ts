/** Plain constant — safe to import from Client Components. Keep out of
 * files that `import "server-only"` (like @/lib/data/gallery), otherwise
 * bundling a client component pulls in the Prisma/pg module graph and
 * breaks the client build. */
export const GALLERY_CATEGORIES = ["The line", "Product", "Dispatch", "Facility"] as const;

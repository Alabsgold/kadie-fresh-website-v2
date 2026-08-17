/** Plain constant — safe to import from Client Components. Keep out of
 * files that `import "server-only"` (like @/lib/data/certifications),
 * otherwise bundling a client component pulls in the Prisma/pg module
 * graph and breaks the client build. */
export const CERTIFICATION_STATUS_LABEL: Record<string, string> = {
  VALID: "Valid",
  ON_REQUEST: "On request",
  RENEWING: "Renewing",
};

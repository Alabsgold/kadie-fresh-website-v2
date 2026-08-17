import "server-only";
import { prisma } from "@/lib/prisma";

/** Site settings is a singleton row (id=1), seeded on setup. */
export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (!settings) {
    throw new Error("SiteSettings row is missing — run `npm run db:seed`.");
  }
  return settings;
}

export function whatsappLink(whatsappNumber: string, message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

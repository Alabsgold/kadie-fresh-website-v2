"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export async function updateWhatsappNumber(whatsappNumber: string) {
  await requireSession();
  await prisma.siteSettings.update({ where: { id: 1 }, data: { whatsappNumber } });
  revalidatePath("/", "layout");
  revalidatePath("/studio");
}

export type SiteSettingsInput = {
  businessName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  instagramHandle: string;
  linkedinPath: string;
  seoTitle: string;
  seoDescription: string;
  googleSearchConsoleId: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
};

export async function updateSiteSettings(input: SiteSettingsInput) {
  await requireSession();
  await prisma.siteSettings.update({
    where: { id: 1 },
    data: {
      ...input,
      googleSearchConsoleId: input.googleSearchConsoleId || null,
      heroVideoUrl: input.heroVideoUrl || "/hero-video.mp4",
    },
  });
  revalidatePath("/", "layout");
  revalidatePath("/studio/settings");
}

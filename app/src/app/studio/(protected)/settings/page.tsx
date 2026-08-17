import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/settings";
import { SiteSettingsForm } from "@/components/studio/SiteSettingsForm";

export const metadata: Metadata = { title: "Site settings" };

export default async function StudioSettingsPage() {
  const settings = await getSiteSettings();
  return <SiteSettingsForm settings={settings} />;
}

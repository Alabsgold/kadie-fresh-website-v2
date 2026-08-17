import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import { getSiteSettings } from "@/lib/data/settings";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display-loaded",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans-loaded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.seoTitle,
      template: `%s · ${settings.businessName}`,
    },
    description: settings.seoDescription,
    verification: settings.googleSearchConsoleId
      ? { google: settings.googleSearchConsoleId }
      : undefined,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

import { getSiteSettings } from "@/lib/data/settings";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppWidget } from "@/components/site/WhatsAppWidget";
import { CookieBar } from "@/components/site/CookieBar";
import { Preloader } from "@/components/site/Preloader";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Preloader />
      <Header phone={settings.phone} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <WhatsAppWidget whatsappNumber={settings.whatsappNumber} />
      <CookieBar copy={settings.cookieConsentCopy} />
    </div>
  );
}

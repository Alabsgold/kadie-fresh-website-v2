import Link from "next/link";
import { getSiteSettings } from "@/lib/data/settings";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Header phone={settings.phone} />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div className="font-display text-[120px] leading-none font-extrabold text-[#DCFCE7]">
          404
        </div>
        <h1 className="mt-2 mb-3 font-display text-4xl font-extrabold tracking-[-0.035em] text-forest-900">
          That page is not on the line.
        </h1>
        <p className="max-w-md text-base text-gray-600">
          It may have been moved. The catalogue and the quote form are both one tap away.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-outline px-6 py-3.25 text-[15px]">
            Back home
          </Link>
          <Link href="/products" className="btn-cta px-6 py-3.25 text-[15px]">
            See the catalogue
          </Link>
        </div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}

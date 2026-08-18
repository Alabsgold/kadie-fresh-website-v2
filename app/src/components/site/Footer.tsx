import Link from "next/link";
import { FOOTER_COLUMNS } from "@/content/nav";

const SOCIALS = (settings: { instagramHandle: string; linkedinPath: string }) => [
  { glyph: "f", label: "Facebook", href: "https://facebook.com/kadiefresh" },
  { glyph: "in", label: "LinkedIn", href: `https://linkedin.com/${settings.linkedinPath}` },
  { glyph: "ig", label: "Instagram", href: `https://instagram.com/${settings.instagramHandle}` },
  { glyph: "x", label: "X", href: "https://x.com/kadiefresh" },
];

export function Footer({
  settings,
}: {
  settings: {
    email: string;
    instagramHandle: string;
    linkedinPath: string;
  };
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-800 px-6 pt-14 pb-8 text-[#EAF6EE]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="font-display text-lg font-bold text-white">Kadie Fresh</div>
          <p className="mt-3 max-w-52 text-sm text-white/60">
            Prepared fresh produce, Ikorodu, Lagos. Mon–Sat 6am–6pm.
          </p>
          <a href={`mailto:${settings.email}`} className="mt-3 inline-block text-sm text-[#86EFAC]">
            {settings.email}
          </a>
          <div className="mt-4 flex gap-2">
            {SOCIALS(settings).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs font-semibold text-white/80 hover:bg-white/10"
              >
                {s.glyph}
              </a>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="text-xs font-bold tracking-[0.1em] text-white/45 uppercase">
              {col.title}
            </div>
            <div className="mt-3 flex flex-col gap-2.5 text-sm text-white/75">
              {col.links.map((link) => (
                <Link key={link.href} href={link.href} className="text-white/75 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55">
        <span>© {year} Kadie Fresh. RC 1849022.</span>
        <div className="flex gap-5">
          <Link href="/terms" className="text-white/55 hover:text-white">
            Terms of service
          </Link>
          <Link href="/privacy" className="text-white/55 hover:text-white">
            Privacy
          </Link>
          <Link href="/cookie-notice" className="text-white/55 hover:text-white">
            Cookie notice
          </Link>
        </div>
      </div>
    </footer>
  );
}

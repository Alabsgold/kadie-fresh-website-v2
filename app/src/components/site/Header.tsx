"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_NAV } from "@/content/nav";
import { Tooltip } from "@/components/ui/Tooltip";
import { Logo } from "@/components/site/Logo";
import { MobileDrawer } from "@/components/site/MobileDrawer";

export function Header({ phone }: { phone: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const telHref = `tel:+${phone.replace(/\D/g, "")}`;

  return (
    <>
      <header className="glass-nav sticky top-0 z-30 flex items-center gap-6 px-6 py-3.5">
        <Link href="/" className="flex flex-none items-center gap-2.5 py-0.5 leading-none">
          <Logo size={30} />
          <span className="whitespace-nowrap font-display text-[19px] font-bold tracking-[-0.02em] text-forest-800">
            Kadie Fresh
          </span>
        </Link>

        <nav className="hidden flex-shrink-0 items-center gap-6 text-[14.5px] font-medium whitespace-nowrap text-gray-700 wide:flex">
          {SITE_NAV.map((item) => {
            const label = item.label;
            const tip = "tooltip" in item ? item.tooltip : undefined;
            const link = (
              <Link key={item.href} href={item.href} className="text-gray-700 hover:text-green-700">
                {label}
              </Link>
            );
            return tip ? (
              <Tooltip key={item.href} label={tip}>
                {link}
              </Tooltip>
            ) : (
              link
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3.5">
          <Tooltip label="Tap to call — Mon to Sat, 6am to 6pm">
            <a
              href={telHref}
              className="hidden flex-none items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-forest-800 wide:flex"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600" />
              {phone}
            </a>
          </Tooltip>
          <Link href="/quote" className="btn-cta flex-none px-5 py-2.5 text-sm whitespace-nowrap">
            Request a quote
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-black/10 bg-white text-lg text-forest-800 wide:hidden"
          >
            ☰
          </button>
        </div>
      </header>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} phone={phone} />
    </>
  );
}

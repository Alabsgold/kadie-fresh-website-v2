"use client";

import Link from "next/link";
import { SITE_NAV } from "@/content/nav";

export function MobileDrawer({
  open,
  onClose,
  phone,
}: {
  open: boolean;
  onClose: () => void;
  phone: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 animate-drawer bg-[linear-gradient(160deg,#0E3D22,#082816)] px-6 py-5.5 wide:hidden">
      <div className="flex items-center justify-between">
        <span className="font-display text-[19px] font-bold text-white">Kadie Fresh</span>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="cursor-pointer border-0 bg-transparent text-2xl text-white"
        >
          ×
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-3.5">
        {SITE_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="font-display text-[34px] font-bold tracking-[-0.02em] text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="absolute right-6 bottom-7.5 left-6 flex flex-col gap-3.5">
        <Link
          href="/quote"
          onClick={onClose}
          className="btn-cta py-4 text-center text-base"
        >
          Request a quote
        </Link>
        <a href={`tel:+${phone.replace(/\D/g, "")}`} className="text-[13.5px] text-white/66">
          {phone} · Ikorodu, Lagos · Mon–Sat 6am–6pm
        </a>
      </div>
    </div>
  );
}

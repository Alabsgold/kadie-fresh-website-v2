"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STUDIO_NAV } from "@/content/nav";
import { Tooltip } from "@/components/ui/Tooltip";
import { logout } from "@/app/actions/auth";

export function Sidebar({
  name,
  newEnquiryCount,
}: {
  name: string;
  newEnquiryCount: number;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-none flex-col bg-[linear-gradient(180deg,#0E3D22,#07200F)] px-4 py-6 text-white">
      <Link href="/studio" className="mb-7 flex items-center gap-2.5 px-2">
        <span
          className="h-7 w-7 flex-none rounded-full"
          style={{ background: "radial-gradient(circle at 32% 30%,#22C55E,#16A34A)" }}
        />
        <span className="font-display text-[17px] font-bold">Kadie Fresh</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {STUDIO_NAV.map((item) => {
          const active =
            item.href === "/studio" ? pathname === "/studio" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                active ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/6 hover:text-white"
              }`}
            >
              {item.label}
              {item.label === "Enquiries" && newEnquiryCount > 0 && (
                <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold">
                  {newEnquiryCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 flex items-center gap-2.5 border-t border-white/10 pt-4">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/15 text-xs font-bold">
          {name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </span>
        <div className="flex-1 leading-tight">
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-white/50">Owner</div>
        </div>
        <Tooltip label="Sign out">
          <form action={logout}>
            <button
              type="submit"
              aria-label="Sign out"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
            >
              ⏻
            </button>
          </form>
        </Tooltip>
      </div>
    </aside>
  );
}

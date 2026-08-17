import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Logo } from "@/components/site/Logo";
import { LoginForm } from "@/components/studio/LoginForm";

export const metadata: Metadata = { title: "Studio sign in" };

export default async function StudioLoginPage() {
  const session = await getSession();
  if (session) redirect("/studio");

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[linear-gradient(180deg,#0E3D22,#07200F)] p-11 text-white lg:flex">
        <div className="absolute inset-0 animate-drift bg-[radial-gradient(60%_50%_at_20%_20%,rgba(34,197,94,.35),transparent_60%)]" />
        <div className="relative flex items-center gap-2.5">
          <Logo size={28} />
          <span className="font-display text-lg font-bold">Kadie Fresh</span>
        </div>
        <div className="relative max-w-md">
          <h1 className="font-display text-4xl font-extrabold tracking-[-0.03em]">
            The control panel for the whole site.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70">
            Products, enquiries, testimonials, certifications, blog and gallery — edited here,
            live on the site in seconds.
          </p>
        </div>
        <div className="relative text-xs text-white/45">
          Staff access only · sessions expire after 12 hours
        </div>
      </div>

      <div className="flex items-center justify-center bg-[#FAFDFB] p-8">
        <LoginForm />
      </div>
    </div>
  );
}

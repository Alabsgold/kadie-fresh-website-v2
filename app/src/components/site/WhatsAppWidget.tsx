import { whatsappLink } from "@/lib/data/settings";

export function WhatsAppWidget({ whatsappNumber }: { whatsappNumber: string }) {
  const href = whatsappLink(
    whatsappNumber,
    "Hello Kadie Fresh, I would like to enquire about your prepared produce.",
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6.5 bottom-6.5 z-[66] flex items-center gap-3 rounded-full px-4 py-3 text-white transition-transform hover:-translate-y-0.75 hover:shadow-[0_20px_44px_rgba(14,61,34,0.42)]"
      style={{
        background: "rgba(20,150,70,.9)",
        backdropFilter: "blur(16px) saturate(1.7)",
        border: "1px solid rgba(255,255,255,.34)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.34), 0 14px 36px rgba(14,61,34,.34)",
      }}
    >
      <span className="relative flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/15 text-lg">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/40" />
        <span className="relative">💬</span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-bold">Chat on WhatsApp</span>
        <span className="flex items-center gap-1.5 text-xs text-white/80">
          <span className="inline-block h-1.5 w-1.5 animate-blip rounded-full bg-[#4ADE80]" />
          Online now
        </span>
      </span>
    </a>
  );
}

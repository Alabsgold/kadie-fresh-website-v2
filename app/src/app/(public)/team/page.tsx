import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TEAM } from "@/content/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Small team, fixed responsibilities. You will know who to call.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our team"
        title="Who handles your produce"
        subcopy="Small team, fixed responsibilities. You will know who to call."
      />

      <div className="grid grid-cols-1 gap-4.5 px-6 pt-5.5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((member, i) => (
          <Reveal
            key={member.name}
            style={{ transitionDelay: `${i * 55}ms` }}
            className="glass-card flex flex-col items-start gap-3.5 p-6"
          >
            <div
              className="h-16 w-16 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 32% 30%,#CDEED8,#8FD3A9)",
              }}
            />
            <div>
              <h2 className="font-display text-lg font-bold tracking-[-0.02em] text-forest-900">
                {member.name}
              </h2>
              <div className="mt-0.5 text-[13.5px] font-semibold text-green-700">
                {member.role}
              </div>
            </div>
            <p className="text-[14.5px] leading-relaxed text-pretty text-gray-600">
              {member.note}
            </p>
          </Reveal>
        ))}
      </div>
    </>
  );
}

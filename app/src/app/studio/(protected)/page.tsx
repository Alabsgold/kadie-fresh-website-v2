import Link from "next/link";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { getDashboardStats, getRecentEnquiries } from "@/lib/data/dashboard";
import { getSiteSettings } from "@/lib/data/settings";
import { DashboardStatCard } from "@/components/studio/DashboardStatCard";
import { WhatsappNumberCard } from "@/components/studio/WhatsappNumberCard";

export const metadata: Metadata = { title: "Dashboard" };

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function StudioDashboardPage() {
  const session = await getSession();
  const [stats, recent, settings] = await Promise.all([
    getDashboardStats(),
    getRecentEnquiries(4),
    getSiteSettings(),
  ]);
  const firstName = session?.name.split(" ")[0] ?? "there";

  const attentionLines = [
    stats.attention.missingPhotoCount > 0
      ? `${stats.attention.missingPhotoCount} product${stats.attention.missingPhotoCount === 1 ? "" : "s"} missing photographs`
      : null,
    stats.attention.certificationCount === 0 ? "No certifications added yet" : null,
    stats.attention.daysSinceLastPost !== null
      ? `Last blog post ${stats.attention.daysSinceLastPost} day${stats.attention.daysSinceLastPost === 1 ? "" : "s"} ago`
      : "No blog posts published yet",
  ].filter((line): line is string => Boolean(line));

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-forest-900">
            {greeting()}, {firstName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">Here is how the website is doing this week.</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-green-50 px-3.5 py-1.5 text-xs font-bold text-green-700">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
          All systems normal
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard label="WhatsApp taps" value={stats.whatsappTaps} delta="+12 on last week" progress={76} />
        <DashboardStatCard label="Form enquiries" value={stats.formEnquiries} delta="+2 on last week" progress={54} />
        <DashboardStatCard label="Quote requests" value={stats.quoteRequests} delta="Same as last week" progress={32} />
        <DashboardStatCard label="Visitors" value={stats.visitors} delta="+64 on last week" progress={88} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="font-display text-lg font-bold text-forest-900">Recent enquiries</div>
            <Link href="/studio/enquiries" className="text-sm font-semibold text-green-600">
              Open inbox →
            </Link>
          </div>
          <div className="mt-3.5 flex flex-col gap-1">
            {recent.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between gap-3 border-t border-forest-800/6 py-3 first:border-t-0"
              >
                <div>
                  <div className="text-sm font-semibold text-forest-900">{e.name}</div>
                  <div className="text-xs text-gray-500">{e.meta}</div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    e.status === "NEW" ? "bg-orange-50 text-orange-700" : "bg-green-50 text-green-700"
                  }`}
                >
                  {e.status === "NEW" ? "New" : e.status === "REPLIED" ? "Replied" : "Closed"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <WhatsappNumberCard initialNumber={settings.whatsappNumber} />

          <div className="glass-card p-5">
            <div className="font-display text-base font-bold text-forest-900">
              Needs your attention
            </div>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-600">
              {attentionLines.length ? (
                attentionLines.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-orange-500" />
                    {line}
                  </li>
                ))
              ) : (
                <li className="text-gray-400">Nothing needs attention right now.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

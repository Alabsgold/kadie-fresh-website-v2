"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Enquiry } from "@/generated/prisma/client";
import { sendReply, markUnread } from "@/app/actions/enquiries";
import { Chip } from "@/components/ui/Chip";
import { useToast } from "@/components/ui/Toast";
import { relativeTime } from "@/lib/relativeTime";

type EnquiryWithBody = Enquiry & { body: string };

const TABS = ["All", "New", "Replied"] as const;

export function EnquiriesInbox({ initialEnquiries }: { initialEnquiries: EnquiryWithBody[] }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const visible = useMemo(() => {
    if (tab === "New") return enquiries.filter((e) => e.status === "NEW");
    if (tab === "Replied") return enquiries.filter((e) => e.status === "REPLIED");
    return enquiries;
  }, [enquiries, tab]);

  const selected = enquiries.find((e) => e.id === selectedId) ?? null;
  const newCount = enquiries.filter((e) => e.status === "NEW").length;

  async function reply() {
    if (!selected || !replyText.trim()) return;
    setSending(true);
    await sendReply(selected.id, replyText.trim());
    setEnquiries((list) =>
      list.map((e) => (e.id === selected.id ? { ...e, status: "REPLIED" as const } : e)),
    );
    setReplyText("");
    setSending(false);
    showToast(`Reply sent to ${selected.name}`);
    router.refresh();
  }

  async function unread(id: string) {
    await markUnread(id);
    setEnquiries((list) => list.map((e) => (e.id === id ? { ...e, status: "NEW" as const } : e)));
    router.refresh();
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-forest-900">
        Enquiries
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {newCount} unread · {enquiries.length} total
      </p>

      <div className="mt-4 flex gap-2">
        {TABS.map((t) => (
          <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
            {t}
          </Chip>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[380px_1fr]">
        <div className="glass-card divide-y divide-forest-800/6 overflow-hidden">
          {visible.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-5 py-14 text-center">
              <div className="text-2xl">📭</div>
              <div className="font-display font-bold text-forest-900">Nothing in this view</div>
              <p className="text-sm text-gray-500">
                When a buyer sends a quote request it lands here, with their contact details
                attached.
              </p>
            </div>
          ) : (
            visible.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelectedId(e.id)}
                className={`flex w-full items-start gap-3 px-4.5 py-3.5 text-left ${
                  selectedId === e.id ? "bg-green-50/60" : "hover:bg-black/2"
                }`}
              >
                <span
                  className={`mt-1.5 h-2 w-2 flex-none rounded-full ${
                    e.status === "NEW" ? "bg-orange-500" : "bg-transparent"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-forest-900">{e.name}</span>
                    <span className="flex-none text-xs text-gray-400">
                      {relativeTime(e.createdAt)}
                    </span>
                  </div>
                  <div className="truncate text-xs text-gray-500">{e.meta}</div>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="glass-card p-5.5">
          {!selected ? (
            <p className="text-sm text-gray-400">Pick an enquiry to read and reply</p>
          ) : (
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-display text-xl font-bold text-forest-900">
                    {selected.name}
                  </div>
                  <div className="mt-0.5 text-sm text-gray-500">
                    {selected.meta} · {relativeTime(selected.createdAt)}
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    selected.status === "NEW"
                      ? "bg-orange-50 text-orange-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {selected.status === "NEW" ? "New" : "Replied"}
                </span>
              </div>

              <div className="mt-3.5 flex flex-wrap gap-2">
                <a
                  href={`mailto:${selected.email}`}
                  className="btn-outline px-3.5 py-1.75 text-xs"
                >
                  {selected.email}
                </a>
                <a href={`tel:${selected.phone}`} className="btn-outline px-3.5 py-1.75 text-xs">
                  {selected.phone}
                </a>
              </div>

              <div className="mt-4 rounded-2xl bg-green-50 p-4 text-sm whitespace-pre-line text-gray-700">
                {selected.body}
              </div>

              {selected.replyMessage && (
                <div className="mt-3 rounded-2xl border border-green-600/20 bg-green-50 p-4 text-sm whitespace-pre-line text-forest-800">
                  <div className="mb-1 text-xs font-bold text-green-700 uppercase">Your reply</div>
                  {selected.replyMessage}
                </div>
              )}

              <label className="mt-4.5 mb-1.5 block text-[13px] font-semibold text-gray-700">
                Reply
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                placeholder="Thanks for reaching out — here is what we can do…"
                className="w-full resize-y rounded-xl border border-forest-800/14 px-4 py-3 text-sm outline-none"
              />
              <div className="mt-3 flex gap-2.5">
                <button
                  type="button"
                  disabled={sending || !replyText.trim()}
                  onClick={reply}
                  className="btn-cta px-5 py-2.5 text-sm disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send reply"}
                </button>
                <button
                  type="button"
                  onClick={() => unread(selected.id)}
                  className="btn-outline px-5 py-2.5 text-sm"
                >
                  Mark unread
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

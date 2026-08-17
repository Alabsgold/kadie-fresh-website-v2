"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/generated/prisma/client";
import {
  createTestimonial,
  deleteTestimonial,
  toggleTestimonialApproved,
} from "@/app/actions/testimonials";
import { useToast } from "@/components/ui/Toast";

export function TestimonialsManager({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [quote, setQuote] = useState("");
  const [adding, setAdding] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const pendingCount = useMemo(
    () => testimonials.filter((t) => !t.approved).length,
    [testimonials],
  );
  const liveCount = useMemo(
    () => testimonials.filter((t) => t.approved).length,
    [testimonials],
  );

  async function handleAdd() {
    if (!authorName.trim() || !authorRole.trim() || !quote.trim()) return;
    setAdding(true);
    const testimonial = await createTestimonial({
      authorName: authorName.trim(),
      authorRole: authorRole.trim(),
      quote: quote.trim(),
    });
    setTestimonials((list) => [...list, testimonial]);
    setAuthorName("");
    setAuthorRole("");
    setQuote("");
    setAdding(false);
    showToast("Testimonial added");
    router.refresh();
  }

  async function handleToggle(t: Testimonial) {
    const updated = await toggleTestimonialApproved(t.id, !t.approved);
    setTestimonials((list) => list.map((item) => (item.id === updated.id ? updated : item)));
    showToast(updated.approved ? "Testimonial published" : "Testimonial unpublished");
    router.refresh();
  }

  async function handleDelete(id: string) {
    await deleteTestimonial(id);
    setTestimonials((list) => list.filter((item) => item.id !== id));
    showToast("Testimonial deleted");
    router.refresh();
  }

  return (
    <div className="p-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-forest-900">
          Testimonials
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {pendingCount} awaiting review · {liveCount} live
        </p>
      </div>

      <div className="glass-card mt-6 p-5">
        <div className="font-display text-base font-bold text-forest-900">Add testimonial</div>
        <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Author name"
            className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
          />
          <input
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
            placeholder="Author role"
            className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
          />
        </div>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Quote"
          rows={2}
          className="mt-3 w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
        />
        <button
          type="button"
          disabled={adding}
          onClick={handleAdd}
          className="btn-cta mt-3.5 px-5 py-2.5 text-sm disabled:opacity-60"
        >
          {adding ? "Adding…" : "Add testimonial"}
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-forest-800/18 bg-[#FAFDFB] px-6 py-16 text-center">
          <p className="text-sm text-gray-500">No testimonials yet.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="glass-card flex flex-col gap-3.5 p-5">
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    t.approved ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                  }`}
                >
                  {t.approved ? "Published" : "Pending"}
                </span>
              </div>
              <p className="flex-1 text-sm text-gray-700">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <div className="text-sm font-semibold text-forest-900">{t.authorName}</div>
                <div className="text-xs text-gray-500">{t.authorRole}</div>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle(t)}
                  className="btn-outline flex-1 px-4 py-2 text-xs"
                >
                  {t.approved ? "Unpublish" : "Publish"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(t.id)}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

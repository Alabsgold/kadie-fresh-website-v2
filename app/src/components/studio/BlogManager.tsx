"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/generated/prisma/client";
import { createDraftPost, updatePost } from "@/app/actions/blog";
import { useToast } from "@/components/ui/Toast";

type Form = {
  title: string;
  category: string;
  excerpt: string;
  body: string;
  readTime: string;
  author: string;
  published: boolean;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Normalizes the stored `\n\n`-joined body into a clean textarea-editable string. */
function toTextareaValue(body: string) {
  return body
    .split("\n\n")
    .filter(Boolean)
    .join("\n\n");
}

/** Splits the textarea contents back into paragraphs on blank-line boundaries and re-joins for storage. */
function toStoredBody(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join("\n\n");
}

export function BlogManager({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  function select(post: BlogPost) {
    setSelectedId(post.id);
    setForm({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      body: toTextareaValue(post.body),
      readTime: post.readTime,
      author: post.author,
      published: post.published,
    });
  }

  async function addDraft() {
    const post = await createDraftPost();
    setPosts((list) => [post, ...list]);
    select(post);
    router.refresh();
  }

  async function save() {
    if (!selectedId || !form) return;
    setSaving(true);
    const updated = await updatePost(selectedId, { ...form, body: toStoredBody(form.body) });
    setPosts((list) => list.map((p) => (p.id === updated.id ? updated : p)));
    setForm((f) => (f ? { ...f, body: toTextareaValue(updated.body) } : f));
    setSaving(false);
    showToast("Post saved");
    router.refresh();
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-forest-900">
            Blog
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Drafts stay off the public blog until published.
          </p>
        </div>
        <button type="button" onClick={addDraft} className="btn-cta px-5 py-2.5 text-sm">
          New post
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_440px]">
        <div className="glass-card divide-y divide-forest-800/6 overflow-hidden">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => select(post)}
              className={`flex w-full items-center gap-3.5 px-4.5 py-3.5 text-left ${
                selectedId === post.id ? "bg-green-50/60" : "hover:bg-black/2"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-forest-900">
                  {post.title || "Untitled post"}
                </div>
                <div className="truncate text-xs text-gray-500">
                  {post.category} · {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  post.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </button>
          ))}
        </div>

        <div className="glass-card p-5">
          {!form ? (
            <p className="text-sm text-gray-400">Pick a post to edit, or start a new one</p>
          ) : (
            <div className="flex flex-col gap-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="A working title"
                  className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Body — one blank line between paragraphs
                </label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  rows={9}
                  className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Category
                  </label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Read time
                  </label>
                  <input
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Author</label>
                  <input
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setForm({ ...form, published: !form.published })}
                className="mt-1 flex w-full items-start gap-3 text-left"
              >
                <span
                  className={`mt-0.5 flex h-5.5 w-5.5 flex-none items-center justify-center rounded-md border-2 transition-colors ${
                    form.published
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-forest-800/22 bg-white"
                  }`}
                >
                  {form.published && (
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                      <path
                        d="M3 8.5 6.2 11.5 13 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-[14px] leading-relaxed text-gray-600">
                  Publish to the public blog
                </span>
              </button>

              <div className="mt-1 flex items-center gap-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={save}
                  className="btn-cta flex-1 py-2.5 text-sm disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save post"}
                </button>
                <Link href="/blog" className="btn-outline px-5 py-2.5 text-sm">
                  Preview site
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

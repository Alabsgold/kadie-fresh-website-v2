import Link from "next/link";
import type { Metadata } from "next";
import { listPublishedPosts } from "@/lib/data/blog";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on standards, sourcing and what actually keeps prepared produce good.",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function BlogPage() {
  const posts = await listPublishedPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="From the line"
        subcopy="Notes on standards, sourcing and what actually keeps prepared produce good."
      />

      <div className="grid grid-cols-1 gap-4.5 px-6 pt-5.5 pb-14 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Reveal key={post.id}>
            <Link href={`/blog/${post.slug}`} className="glass-card flex h-full flex-col p-3.5">
              <div
                className="h-38 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${post.coverImageUrl})` }}
              />
              <div className="mt-3.5 flex items-center gap-2 text-xs">
                <span className="font-bold tracking-[0.12em] text-green-600 uppercase">
                  {post.category}
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-400">
                  {post.publishedAt ? formatDate(post.publishedAt) : ""}
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-400">{post.readTime}</span>
              </div>
              <div className="mt-2 font-display text-[19px] font-bold tracking-[-0.02em] text-forest-900">
                {post.title}
              </div>
              <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-pretty text-gray-600">
                {post.excerpt}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}

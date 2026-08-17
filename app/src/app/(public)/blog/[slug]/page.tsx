import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, listPublishedPosts, postParagraphs } from "@/lib/data/blog";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  return { title: post?.title ?? "Blog" };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const otherPosts = (await listPublishedPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <div className="px-6 pt-6.5">
        <div className="text-[13px] text-gray-400">
          <Link href="/blog" className="font-semibold text-green-600">
            Blog
          </Link>{" "}
          · {post.category}
        </div>
      </div>

      <div className="px-6 pt-5.5 pb-14">
        <Reveal className="mx-auto max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold tracking-[0.12em] text-green-600 uppercase">
              {post.category}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-400">
              {post.publishedAt ? formatDate(post.publishedAt) : ""}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-400">{post.readTime}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-400">{post.author}</span>
          </div>

          <h1 className="mt-3 mb-5 font-display text-4xl font-extrabold tracking-[-0.035em] text-balance text-forest-900 sm:text-5xl">
            {post.title}
          </h1>

          <div
            className="h-72 rounded-3xl bg-cover bg-center shadow-[0_20px_44px_rgba(14,61,34,0.12)] sm:h-96"
            style={{ backgroundImage: `url(${post.coverImageUrl})` }}
          />

          <div className="mt-7 flex flex-col gap-4.5">
            {postParagraphs(post.body).map((paragraph, i) => (
              <p key={i} className="text-[16px] leading-relaxed text-pretty text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border-l-3 border-green-600 bg-green-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[15.5px] font-bold text-forest-800">Buying for a kitchen?</div>
              <p className="mt-1 text-sm leading-relaxed text-pretty text-[#3F6B4F]">
                We will quote against your own cut spec.
              </p>
            </div>
            <Link href="/quote" className="btn-cta shrink-0 px-6 py-3 text-[15px]">
              Request a quote
            </Link>
          </div>
        </Reveal>

        {otherPosts.length > 0 && (
          <div className="mx-auto mt-14 max-w-2xl">
            <h2 className="font-display text-xl font-extrabold tracking-[-0.02em] text-forest-900">
              Keep reading
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4.5 sm:grid-cols-2">
              {otherPosts.map((p) => (
                <Reveal key={p.id}>
                  <Link href={`/blog/${p.slug}`} className="glass-card flex h-full flex-col p-3.5">
                    <div
                      className="h-28 rounded-2xl bg-cover bg-center"
                      style={{ backgroundImage: `url(${p.coverImageUrl})` }}
                    />
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="font-bold tracking-[0.12em] text-green-600 uppercase">
                        {p.category}
                      </span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-400">{p.readTime}</span>
                    </div>
                    <div className="mt-2 font-display text-[16.5px] font-bold tracking-[-0.02em] text-forest-900">
                      {p.title}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

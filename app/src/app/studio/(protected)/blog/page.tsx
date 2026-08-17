import type { Metadata } from "next";
import { listAllPosts } from "@/lib/data/blog";
import { BlogManager } from "@/components/studio/BlogManager";

export const metadata: Metadata = { title: "Blog" };

export default async function StudioBlogPage() {
  const posts = await listAllPosts();
  return <BlogManager initialPosts={posts} />;
}

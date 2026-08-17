import "server-only";
import { prisma } from "@/lib/prisma";

export async function listPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function listAllPosts() {
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function getPost(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export function postParagraphs(body: string) {
  return body.split("\n\n").filter(Boolean);
}

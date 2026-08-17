"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { FARM_PHOTO } from "@/lib/images";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

function revalidateBlogPaths() {
  revalidatePath("/studio/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function createDraftPost() {
  const session = await requireSession();
  const count = await prisma.blogPost.count();
  const slug = `new-post-${randomUUID().slice(0, 8)}`;
  const post = await prisma.blogPost.create({
    data: {
      slug,
      title: "",
      category: "The line",
      excerpt: "",
      body: "",
      readTime: "5 min",
      author: session.name,
      coverImageUrl: FARM_PHOTO,
      published: false,
      publishedAt: null,
      sortOrder: count,
    },
  });
  revalidateBlogPaths();
  return post;
}

export async function updatePost(
  id: string,
  data: {
    title: string;
    category: string;
    excerpt: string;
    body: string;
    readTime: string;
    author: string;
    published: boolean;
  },
) {
  await requireSession();

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  const publishedAt =
    data.published && existing && !existing.publishedAt ? new Date() : undefined;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      ...(publishedAt ? { publishedAt } : {}),
    },
  });
  revalidateBlogPaths();
  return post;
}

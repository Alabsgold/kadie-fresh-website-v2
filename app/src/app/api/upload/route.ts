import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_BYTES = 8 * 1024 * 1024; // 8MB, matches the gallery dropzone copy

/** Saves an uploaded image to public/uploads/<category>/ and returns its public URL. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  const category = String(formData.get("category") ?? "misc").replace(/[^a-z0-9-]/gi, "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Only JPG, PNG or WebP images are allowed" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is larger than 8MB" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "public", "uploads", category || "misc");
  await mkdir(dir, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), bytes);

  return NextResponse.json({ url: `/uploads/${category || "misc"}/${filename}` });
}

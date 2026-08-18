import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const VIDEO_TYPES: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
};
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB, matches the gallery dropzone copy
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50MB — hero clips should stay well under this

/** Saves an uploaded image or video to public/uploads/<category>/ and returns its public URL. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  const category = String(formData.get("category") ?? "misc").replace(/[^a-z0-9-]/gi, "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const isVideo = file.type in VIDEO_TYPES;
  const ext = IMAGE_TYPES[file.type] ?? VIDEO_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Only JPG, PNG or WebP images, or MP4/WebM video, are allowed" },
      { status: 400 },
    );
  }
  const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > maxBytes) {
    return NextResponse.json(
      { error: `File is larger than ${isVideo ? "50MB" : "8MB"}` },
      { status: 400 },
    );
  }

  const dir = path.join(process.cwd(), "public", "uploads", category || "misc");
  await mkdir(dir, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), bytes);

  return NextResponse.json({ url: `/uploads/${category || "misc"}/${filename}` });
}

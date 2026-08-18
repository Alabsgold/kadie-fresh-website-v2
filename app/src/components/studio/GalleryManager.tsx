"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { GalleryImage } from "@/generated/prisma/client";
import {
  createGalleryImage,
  deleteGalleryImage,
  toggleGalleryImagePublished,
} from "@/app/actions/gallery";
import { useToast } from "@/components/ui/Toast";

export function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { showToast } = useToast();

  async function handleFile(file: File | null | undefined) {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "gallery");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || !data.url) {
        showToast(data.error || "Upload failed — try again");
        return;
      }

      const image = await createGalleryImage({
        url: data.url,
        label: "Untitled photograph",
        category: "Facility",
      });
      setImages((list) => [...list, image]);
      showToast("Photograph added as hidden — publish when captioned");
      router.refresh();
    } catch {
      showToast("Upload failed — try again");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleToggle(image: GalleryImage) {
    const updated = await toggleGalleryImagePublished(image.id, !image.published);
    setImages((list) => list.map((img) => (img.id === updated.id ? updated : img)));
    router.refresh();
  }

  async function handleDelete(id: string) {
    await deleteGalleryImage(id);
    setImages((list) => list.filter((img) => img.id !== id));
    router.refresh();
  }

  return (
    <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          handleFile(file);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        disabled={isUploading}
        className={`flex aspect-square flex-col items-center justify-center gap-2.5 rounded-3xl border border-dashed px-5 text-center transition-colors ${
          isDragOver
            ? "border-green-600 bg-green-50/60"
            : "border-forest-800/18 bg-white hover:border-green-600/60 hover:bg-green-50/40"
        } ${isUploading ? "opacity-60" : ""}`}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M12 5l-6 6M12 5l6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="text-sm font-semibold text-forest-900">
          {isUploading ? "Uploading…" : "Drop photographs"}
        </div>
        <div className="text-xs text-gray-500">JPG or PNG, up to 8MB</div>
      </button>

      {images.map((image) => (
        <div key={image.id} className="glass-card flex flex-col overflow-hidden">
          <div
            className="aspect-square w-full bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: `url(${image.url})` }}
          />
          <div className="flex items-start justify-between gap-2 px-3 py-2.5">
            <div className="min-w-0">
              <div className="truncate text-xs font-semibold text-forest-900">{image.label}</div>
              <div className="truncate text-[11px] text-gray-500">{image.category}</div>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(image.id)}
              className="flex-none text-gray-300 hover:text-red-600"
              aria-label="Delete photograph"
            >
              ×
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleToggle(image)}
            className={`mx-3 mb-3 rounded-full px-3 py-1.5 text-xs font-semibold ${
              image.published
                ? "bg-green-50 text-green-700 hover:bg-green-100"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {image.published ? "Hide" : "Show"}
          </button>
        </div>
      ))}
    </div>
  );
}

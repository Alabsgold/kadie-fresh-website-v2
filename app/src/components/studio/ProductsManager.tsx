"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/generated/prisma/client";
import { createDraftProduct, updateProduct, toggleProductPublished } from "@/app/actions/products";
import { useToast } from "@/components/ui/Toast";

export type ProductAdmin = Product & { photoWarning: boolean };

type Form = {
  name: string;
  pack: string;
  grade: string;
  shelfLife: string;
  moq: string;
  storage: string;
  origin: string;
  blurb: string;
};

export function ProductsManager({ initialProducts }: { initialProducts: ProductAdmin[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  function select(product: ProductAdmin) {
    setSelectedId(product.id);
    setForm({
      name: product.name,
      pack: product.pack,
      grade: product.grade,
      shelfLife: product.shelfLife,
      moq: product.moq,
      storage: product.storage,
      origin: product.origin,
      blurb: product.blurb,
    });
  }

  async function addDraft() {
    const product = await createDraftProduct();
    const withWarning: ProductAdmin = { ...product, photoWarning: true };
    setProducts((list) => [...list, withWarning]);
    select(withWarning);
    showToast("Draft line created — hidden until you publish it");
    router.refresh();
  }

  async function save() {
    if (!selectedId || !form) return;
    setSaving(true);
    const updated = await updateProduct(selectedId, form);
    setProducts((list) =>
      list.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)),
    );
    setSaving(false);
    showToast("Product updated on the site");
    router.refresh();
  }

  async function togglePublished(product: ProductAdmin) {
    const updated = await toggleProductPublished(product.id, !product.published);
    setProducts((list) =>
      list.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)),
    );
    router.refresh();
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-forest-900">
            Products
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Click a line to edit it. Hidden lines stay off the public catalogue.
          </p>
        </div>
        <button type="button" onClick={addDraft} className="btn-cta px-5 py-2.5 text-sm">
          Add product
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_400px]">
        <div className="glass-card divide-y divide-forest-800/6 overflow-hidden">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => select(product)}
              className={`flex w-full cursor-pointer items-center gap-3.5 px-4.5 py-3.5 text-left ${
                selectedId === product.id ? "bg-green-50/60" : "hover:bg-black/2"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-forest-900">
                    {product.name}
                  </span>
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                    {product.category}
                  </span>
                </div>
                <div className="truncate text-xs text-gray-500">
                  {product.pack} · MOQ {product.moq}
                </div>
                {product.photoWarning && (
                  <div className="mt-0.5 text-xs font-semibold text-orange-500">
                    ⚠ No photographs
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePublished(product);
                }}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  product.published
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {product.published ? "Live" : "Hidden"}
              </button>
            </div>
          ))}
        </div>

        <div className="glass-card p-5">
          {!form ? (
            <p className="text-sm text-gray-400">Pick a line to edit its spec and photographs</p>
          ) : (
            <div className="flex flex-col gap-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Pack</label>
                  <input
                    value={form.pack}
                    onChange={(e) => setForm({ ...form, pack: e.target.value })}
                    className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">MOQ</label>
                  <input
                    value={form.moq}
                    onChange={(e) => setForm({ ...form, moq: e.target.value })}
                    className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Shelf life
                  </label>
                  <input
                    value={form.shelfLife}
                    onChange={(e) => setForm({ ...form, shelfLife: e.target.value })}
                    className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Grade</label>
                  <input
                    value={form.grade}
                    onChange={(e) => setForm({ ...form, grade: e.target.value })}
                    className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Storage
                  </label>
                  <input
                    value={form.storage}
                    onChange={(e) => setForm({ ...form, storage: e.target.value })}
                    className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Sourced
                  </label>
                  <input
                    value={form.origin}
                    onChange={(e) => setForm({ ...form, origin: e.target.value })}
                    className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Description
                </label>
                <textarea
                  value={form.blurb}
                  onChange={(e) => setForm({ ...form, blurb: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                />
              </div>
              <button
                type="button"
                disabled={saving}
                onClick={save}
                className="btn-cta mt-1 py-2.5 text-sm disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save product"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

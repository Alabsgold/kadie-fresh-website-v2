"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Certification, CertificationStatus } from "@/generated/prisma/client";
import {
  createDraftCertification,
  updateCertification,
  deleteCertification,
} from "@/app/actions/certifications";
import { CERTIFICATION_STATUS_LABEL } from "@/lib/certificationStatus";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const STATUS_OPTIONS: CertificationStatus[] = ["VALID", "ON_REQUEST", "RENEWING"];

const STATUS_PILL: Record<CertificationStatus, string> = {
  VALID: "bg-green-50 text-green-700",
  ON_REQUEST: "bg-gray-100 text-gray-600",
  RENEWING: "bg-orange-50 text-orange-700",
};

export function CertificationsManager({
  initialCertifications,
}: {
  initialCertifications: Certification[];
}) {
  const [certs, setCerts] = useState(initialCertifications);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<{
    name: string;
    issuer: string;
    ref: string;
    expires: string;
    status: CertificationStatus;
    fileUrl: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { showToast } = useToast();

  function select(cert: Certification) {
    setSelectedId(cert.id);
    setForm({
      name: cert.name,
      issuer: cert.issuer,
      ref: cert.ref,
      expires: cert.expires,
      status: cert.status,
      fileUrl: cert.fileUrl || "",
    });
  }

  async function addDraft() {
    const cert = await createDraftCertification();
    setCerts((c) => [...c, cert]);
    select(cert);
    router.refresh();
  }

  async function uploadFile(file: File | null | undefined) {
    if (!file || !selectedId || !form) return;
    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "certifications");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || !data.url) {
        showToast(data.error || "Upload failed — try again");
        return;
      }

      const updated = await updateCertification(selectedId, { ...form, fileUrl: data.url });
      setCerts((list) => list.map((c) => (c.id === updated.id ? updated : c)));
      setForm((f) => (f ? { ...f, fileUrl: data.url } : f));
      showToast("Document attached to certificate");
      router.refresh();
    } catch {
      showToast("Upload failed — try again");
    } finally {
      setUploadingFile(false);
    }
  }

  async function save() {
    if (!selectedId || !form) return;
    setSaving(true);
    const updated = await updateCertification(selectedId, form);
    setCerts((list) => list.map((c) => (c.id === updated.id ? updated : c)));
    setSaving(false);
    showToast("Certification updated");
    router.refresh();
  }

  async function remove() {
    if (!deletingId) return;
    setDeleting(true);
    try {
      await deleteCertification(deletingId);
      setCerts((list) => list.filter((c) => c.id !== deletingId));
      if (selectedId === deletingId) {
        setSelectedId(null);
        setForm(null);
      }
      showToast("Certification deleted");
      router.refresh();
    } catch {
      showToast("Failed to delete certification");
    } finally {
      setDeleting(false);
      setDeletingId(null);
    }
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-forest-900">
            Certifications
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            These appear on the export credentials page in the order listed.
          </p>
        </div>
        <button type="button" onClick={addDraft} className="btn-cta px-5 py-2.5 text-sm">
          Add certification
        </button>
      </div>

      {certs.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-forest-800/18 bg-green-50 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-xl">
            📄
          </div>
          <h2 className="font-display text-xl font-bold text-forest-900">
            No certifications added yet
          </h2>
          <p className="max-w-sm text-sm text-gray-500">
            Export buyers check this first. Upload NAFDAC and NEPC registrations to switch the
            credentials page on.
          </p>
          <button type="button" onClick={addDraft} className="btn-cta mt-1 px-5 py-2.5 text-sm">
            Add the first one
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
          <div className="glass-card divide-y divide-forest-800/6 overflow-hidden">
            {certs.map((cert) => (
              <button
                key={cert.id}
                type="button"
                onClick={() => select(cert)}
                className={`flex w-full items-center gap-3.5 px-4.5 py-3.5 text-left ${
                  selectedId === cert.id ? "bg-green-50/60" : "hover:bg-black/2"
                }`}
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-green-50 text-base">
                  📄
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-forest-900">{cert.name}</div>
                  <div className="truncate text-xs text-gray-500">
                    {cert.issuer} · {cert.ref}
                  </div>
                  {cert.fileUrl && (
                    <div className="mt-0.5 text-[11px] font-semibold text-green-700">
                      ✓ Document attached
                    </div>
                  )}
                </div>
                <div className="hidden text-xs text-gray-400 sm:block">Expires {cert.expires}</div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_PILL[cert.status]}`}
                >
                  {CERTIFICATION_STATUS_LABEL[cert.status]}
                </span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingId(cert.id);
                  }}
                  className="text-gray-300 hover:text-red-600 px-1 py-0.5 text-lg"
                >
                  ×
                </span>
              </button>
            ))}
          </div>

          <div className="glass-card p-5">
            {!form ? (
              <p className="text-sm text-gray-400">Pick a certificate to edit its details</p>
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

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">
                    Document File (PDF or Image)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      uploadFile(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={uploadingFile}
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-outline flex-1 py-2 text-xs font-semibold disabled:opacity-50"
                    >
                      {uploadingFile
                        ? "Uploading…"
                        : form.fileUrl
                        ? "Change document"
                        : "Upload document (PDF / Image)"}
                    </button>
                    {form.fileUrl && (
                      <a
                        href={form.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition-colors hover:bg-green-100"
                      >
                        View ↗
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Issuer</label>
                  <input
                    value={form.issuer}
                    onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                    className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-600">Reference</label>
                    <input
                      value={form.ref}
                      onChange={(e) => setForm({ ...form, ref: e.target.value })}
                      className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-600">Expires</label>
                    <input
                      value={form.expires}
                      onChange={(e) => setForm({ ...form, expires: e.target.value })}
                      className="w-full rounded-lg border border-forest-800/14 px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as CertificationStatus })}
                    className="w-full rounded-lg border border-forest-800/14 bg-white px-3 py-2 text-sm outline-none"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {CERTIFICATION_STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  disabled={saving}
                  onClick={save}
                  className="btn-cta mt-1 py-2.5 text-sm disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save certificate"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete this certification?"
        description="This action cannot be undone. The certificate record will be permanently removed from export credentials."
        confirmLabel="Delete certification"
        isDestructive
        loading={deleting}
        onConfirm={remove}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}

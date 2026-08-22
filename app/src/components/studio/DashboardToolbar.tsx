"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { clearQuotesAction, exportDashboardStatsCsv } from "@/app/actions/dashboardActions";

export function DashboardToolbar() {
  const [refreshing, setRefreshing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const router = useRouter();
  const { showToast } = useToast();

  function handleRefresh() {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => {
      setRefreshing(false);
      showToast("Dashboard stats refreshed");
    }, 400);
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const { csvText, filename } = await exportDashboardStatsCsv();
      const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("Stats downloaded (CSV)");
    } catch {
      showToast("Failed to export stats");
    } finally {
      setDownloading(false);
    }
  }

  async function handleClearQuotes() {
    setClearing(true);
    try {
      await clearQuotesAction();
      setConfirmClearOpen(false);
      showToast("All quotes cleared and stats reset to 0");
      router.refresh();
    } catch {
      showToast("Failed to clear quotes");
    } finally {
      setClearing(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          disabled={refreshing}
          onClick={handleRefresh}
          className="btn-outline px-4 py-2 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
        >
          <span className={`inline-block ${refreshing ? "animate-spin" : ""}`}>↻</span>
          Refresh stats
        </button>

        <button
          type="button"
          disabled={downloading}
          onClick={handleDownload}
          className="btn-outline px-4 py-2 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
        >
          <span>↓</span>
          {downloading ? "Exporting…" : "Download stats (CSV)"}
        </button>

        <button
          type="button"
          disabled={clearing}
          onClick={() => setConfirmClearOpen(true)}
          className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors disabled:opacity-50"
        >
          Clear quotes & reset
        </button>
      </div>

      <ConfirmDialog
        isOpen={confirmClearOpen}
        title="Clear all quotes and reset stats?"
        description="This will permanently delete all enquiry & quote rows and reset visitor/tap metrics to 0. This action cannot be undone."
        confirmLabel="Clear all quotes"
        isDestructive
        loading={clearing}
        onConfirm={handleClearQuotes}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </>
  );
}

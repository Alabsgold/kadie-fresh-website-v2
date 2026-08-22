"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { getDashboardStats, clearAllQuotesAndEnquiries } from "@/lib/data/dashboard";
import { listEnquiries } from "@/lib/data/enquiries";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}

export async function clearQuotesAction() {
  await requireSession();
  await clearAllQuotesAndEnquiries();
  revalidatePath("/studio");
  revalidatePath("/studio/enquiries");
  return { success: true };
}

export async function exportDashboardStatsCsv() {
  await requireSession();
  const [stats, enquiries] = await Promise.all([
    getDashboardStats(),
    listEnquiries("all"),
  ]);

  const now = new Date().toISOString().slice(0, 10);
  const rows: string[] = [];

  rows.push("KADIE FRESH - DASHBOARD METRICS SUMMARY");
  rows.push(`Export Date,${now}`);
  rows.push("");
  rows.push("Metric,Value");
  rows.push(`WhatsApp Taps,${stats.whatsappTaps}`);
  rows.push(`Form Enquiries,${stats.formEnquiries}`);
  rows.push(`Quote Requests,${stats.quoteRequests}`);
  rows.push(`Visitors,${stats.visitors}`);
  rows.push("");
  rows.push("ENQUIRIES & QUOTES LIST");
  rows.push("Reference,Type,Status,Name,Business,Email,Phone,Created At");

  for (const e of enquiries) {
    const ref = `"${(e.reference || "").replace(/"/g, '""')}"`;
    const type = `"${(e.type || "").replace(/"/g, '""')}"`;
    const status = `"${(e.status || "").replace(/"/g, '""')}"`;
    const name = `"${(e.name || "").replace(/"/g, '""')}"`;
    const business = `"${(e.business || "").replace(/"/g, '""')}"`;
    const email = `"${(e.email || "").replace(/"/g, '""')}"`;
    const phone = `"${(e.phone || "").replace(/"/g, '""')}"`;
    const date = `"${new Date(e.createdAt).toISOString()}"`;

    rows.push(`${ref},${type},${status},${name},${business},${email},${phone},${date}`);
  }

  const csvText = rows.join("\n");
  const filename = `kadie-fresh-stats-${now}.csv`;

  return { csvText, filename };
}

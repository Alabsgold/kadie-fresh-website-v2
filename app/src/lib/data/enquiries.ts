import "server-only";
import { prisma } from "@/lib/prisma";
import { generateEnquiryReference } from "@/lib/reference";
import type { QuoteInput, DistributorInput } from "@/lib/validation";

export async function createQuoteEnquiry(input: QuoteInput) {
  const reference = await generateEnquiryReference();
  const meta = `${input.buyerType} · ${input.items[0] ?? "custom cut"} · ${input.location || "Lagos"}`;

  return prisma.enquiry.create({
    data: {
      reference,
      type: "QUOTE",
      name: input.name,
      business: input.business || null,
      email: input.email,
      phone: input.phone,
      meta,
      buyerType: input.buyerType,
      items: input.items,
      volume: input.volume,
      frequency: input.frequency,
      location: input.location || null,
      notes: input.notes || null,
    },
  });
}

export async function createDistributorEnquiry(input: DistributorInput) {
  const reference = await generateEnquiryReference();
  const meta = `Distributor application · ${input.country}`;

  return prisma.enquiry.create({
    data: {
      reference,
      type: "DISTRIBUTOR",
      name: input.company,
      business: input.company,
      email: input.contactEmail,
      phone: input.contactPhone,
      meta,
      volume: input.volume,
      notes: input.message || null,
      details: {
        country: input.country,
        markets: input.markets || null,
        declarationAccepted: input.declaration,
      },
    },
  });
}

export async function listEnquiries(filter: "all" | "new" | "replied" = "all") {
  return prisma.enquiry.findMany({
    where:
      filter === "new" ? { status: "NEW" } : filter === "replied" ? { status: "REPLIED" } : {},
    orderBy: { createdAt: "desc" },
  });
}

export async function countNewEnquiries() {
  return prisma.enquiry.count({ where: { status: "NEW" } });
}

export async function getEnquiry(id: string) {
  return prisma.enquiry.findUnique({ where: { id }, include: { repliedBy: true } });
}

export async function replyToEnquiry(id: string, message: string, adminUserId: string) {
  return prisma.enquiry.update({
    where: { id },
    data: {
      status: "REPLIED",
      replyMessage: message,
      repliedAt: new Date(),
      repliedById: adminUserId,
    },
  });
}

export async function markEnquiryUnread(id: string) {
  return prisma.enquiry.update({ where: { id }, data: { status: "NEW" } });
}

/** Builds the full free-text message body shown in the inbox detail panel. */
export function enquiryBody(enquiry: {
  type: string;
  reference: string;
  items: string[];
  volume: string | null;
  frequency: string | null;
  location: string | null;
  notes: string | null;
  details: unknown;
}) {
  if (enquiry.type === "QUOTE") {
    const lines = enquiry.items.length ? enquiry.items.join(", ") : "described in notes";
    const parts = [
      `Quote request ${enquiry.reference}`,
      `Lines: ${lines}`,
      `Volume: ${enquiry.volume ?? "—"}${enquiry.frequency ? ` · ${enquiry.frequency}` : ""}`,
      `Deliver to: ${enquiry.location || "—"}`,
    ];
    if (enquiry.notes) parts.push("", enquiry.notes);
    return parts.join("\n");
  }

  if (enquiry.type === "DISTRIBUTOR") {
    const details = (enquiry.details ?? {}) as { markets?: string | null };
    const parts = [
      "Distributor application",
      `Markets: ${details.markets || "—"}`,
      `Volume: ${enquiry.volume ?? "—"}`,
    ];
    if (enquiry.notes) parts.push("", enquiry.notes);
    return parts.join("\n");
  }

  return enquiry.notes ?? "";
}

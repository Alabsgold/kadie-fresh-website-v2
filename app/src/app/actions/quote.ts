"use server";

import { quoteSchema } from "@/lib/validation";
import { createQuoteEnquiry } from "@/lib/data/enquiries";

export type QuoteActionResult =
  | { ok: true; reference: string }
  | { ok: false; fieldErrors: Partial<Record<string, string>> };

export async function submitQuote(raw: unknown): Promise<QuoteActionResult> {
  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<string, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }

  const enquiry = await createQuoteEnquiry(parsed.data);
  return { ok: true, reference: enquiry.reference };
}

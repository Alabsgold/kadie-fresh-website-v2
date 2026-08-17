"use server";

import { distributorSchema } from "@/lib/validation";
import { createDistributorEnquiry } from "@/lib/data/enquiries";

export type DistributorActionResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };

export async function submitDistributorApplication(raw: unknown): Promise<DistributorActionResult> {
  const parsed = distributorSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Company, volume and the declaration are required" };
  }

  const enquiry = await createDistributorEnquiry(parsed.data);
  return { ok: true, reference: enquiry.reference };
}

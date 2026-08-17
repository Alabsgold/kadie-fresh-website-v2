import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const buyerTypes = [
  "Home cook",
  "Restaurant / hotel",
  "Wholesale distributor",
  "Export buyer",
] as const;

export const frequencies = ["One-off", "Weekly", "Twice weekly", "Monthly"] as const;

export const quoteSchema = z.object({
  name: z.string().trim().min(1, "We need a name to put on the quote."),
  business: z.string().trim().optional().default(""),
  email: z
    .string()
    .trim()
    .min(1, "Add an email so we can send the quote.")
    .regex(EMAIL_RE, "That address does not look right."),
  phone: z.string().trim().min(1, "A phone or WhatsApp number speeds this up a lot."),
  buyerType: z.enum(buyerTypes).default("Restaurant / hotel"),
  items: z
    .array(z.string())
    .min(1, "Pick at least one line, or describe it in the notes on the next step."),
  volume: z.string().trim().min(1, "Give us a rough volume so we can price it."),
  frequency: z.enum(frequencies).default("Weekly"),
  location: z.string().trim().optional().default(""),
  notes: z.string().trim().optional().default(""),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const distributorSchema = z.object({
  company: z.string().trim().min(1, "Tell us the company name."),
  contactEmail: z.string().trim().min(1, "Add an email so we can reply.").regex(EMAIL_RE, "That address does not look right."),
  contactPhone: z.string().trim().min(1, "Add a phone or WhatsApp number."),
  country: z.string().trim().min(1).default("Nigeria"),
  volume: z.string().trim().min(1, "Tell us roughly how much you can move a month."),
  markets: z.string().trim().optional().default(""),
  message: z.string().trim().optional().default(""),
  declaration: z
    .boolean()
    .refine((v) => v === true, "Please confirm the declaration to continue."),
});

export type DistributorInput = z.infer<typeof distributorSchema>;

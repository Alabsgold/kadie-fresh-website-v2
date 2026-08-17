export const SERVICES = [
  {
    slug: "retail",
    name: "Retail packs",
    kicker: "For your home",
    blurb:
      "Sealed 250g–600g packs of prepared fruit and vegetables, cut the way a home kitchen actually uses them.",
    turnaround: "Next-day in Lagos",
    minimum: "20 packs",
    bullets: [
      "Cut, washed and sealed the same morning",
      "Date-coded so you know the seal window",
      "Mixed cases across any lines",
      "WhatsApp reorder in one message",
    ],
  },
  {
    slug: "kitchen",
    name: "Kitchen supply",
    kicker: "For your kitchen",
    blurb:
      "Standing weekly volumes for restaurants, hotels and caterers, cut to your own spec and delivered before service.",
    turnaround: "Before 7am, agreed days",
    minimum: "25kg per drop",
    bullets: [
      "Cut size fixed to your spec sheet",
      "Standing order, one invoice a month",
      "Substitution called before the run, never after",
      "Named contact on the line",
    ],
  },
  {
    slug: "bulk",
    name: "Bulk & distribution",
    kicker: "For distribution",
    blurb:
      "Pallet volumes for supermarkets, distributors and institutional buyers, with batch paperwork on every consignment.",
    turnaround: "48–72 hours",
    minimum: "200kg",
    bullets: [
      "Batch and farm code per pallet",
      "Cold handling to your depot",
      "Volume pricing on standing contracts",
      "Weekly forecast against your order book",
    ],
  },
  {
    slug: "export",
    name: "Export consolidation",
    kicker: "For overseas buyers",
    blurb:
      "Consolidated consignments prepared to buyer spec with the documentation an importer will ask for before it ships.",
    turnaround: "By agreed sailing",
    minimum: "One pallet",
    bullets: [
      "Phytosanitary certification arranged",
      "NAFDAC and NEPC registration on file",
      "Spec sheet signed off before the run",
      "Photographs of the loaded consignment",
    ],
  },
] as const;

export type Service = (typeof SERVICES)[number];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

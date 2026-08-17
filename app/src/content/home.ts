export const HOME_STATS = [
  { value: "4 hrs", label: "wash to seal" },
  { value: "10+", label: "prepared lines" },
  { value: "Batch", label: "date-coded" },
  { value: "6am", label: "first dispatch" },
] as const;

export const HOME_PROOF = [
  { title: "Potable-water wash", detail: "Every batch, every line" },
  { title: "Food-grade sealing", detail: "Packed within 4 hours" },
  { title: "Traceable batches", detail: "Coded to source farm" },
  { title: "HACCP principles", detail: "Applied across the line" },
] as const;

export const HOME_AUDIENCES = [
  {
    title: "For your home",
    description: "Retail packs of prepared fruit and vegetables, ready for the pot.",
    cta: "Explore products",
    href: "/products",
  },
  {
    title: "For your kitchen",
    description: "Standing weekly volumes for restaurants, hotels and caterers.",
    cta: "Request a quote",
    href: "/quote",
  },
  {
    title: "For distribution",
    description: "Bulk supply for supermarkets, distributors and institutional buyers.",
    cta: "Talk to us",
    href: "/contact",
  },
  {
    title: "For export",
    description: "Consolidated consignments with the documentation an importer will ask for.",
    cta: "Export credentials",
    href: "/export-credentials",
  },
] as const;

export const HOME_STEPS = [
  { title: "Wash", detail: "Potable water, graded intake", tone: "green" },
  { title: "Slice", detail: "Cut to spec per order", tone: "green" },
  { title: "Pack", detail: "Food-grade seal, date-coded", tone: "orange" },
  { title: "Deliver", detail: "Cold handling to your door", tone: "orange" },
] as const;

export const SITE_NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services", tooltip: "Retail, kitchen supply, bulk and export" },
  {
    label: "Standards",
    href: "/standards",
    tooltip: "HACCP principles, potable-water wash and batch coding",
    wideTooltip: true,
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const STUDIO_NAV = [
  { label: "Dashboard", href: "/studio" },
  { label: "Site settings", href: "/studio/settings" },
  { label: "Products", href: "/studio/products" },
  { label: "Enquiries", href: "/studio/enquiries" },
  { label: "Testimonials", href: "/studio/testimonials" },
  { label: "Certifications", href: "/studio/certifications" },
  { label: "Blog", href: "/studio/blog" },
  { label: "Gallery", href: "/studio/gallery" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Products", href: "/products" },
      { label: "Services", href: "/services" },
      { label: "Standards", href: "/standards" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "The founder", href: "/about#founder" },
      { label: "Our team", href: "/team" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Buyers",
    links: [
      { label: "Export credentials", href: "/export-credentials" },
      { label: "Download line card", href: "/api/line-card" },
      { label: "Become a distributor", href: "/distributors" },
      { label: "Request a quote", href: "/quote" },
      { label: "FAQ", href: "/faq" },
    ],
  },
] as const;

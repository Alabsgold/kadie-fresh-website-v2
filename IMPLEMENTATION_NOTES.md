# Kadie Fresh — implementation notes for remaining work

Read this before writing any code. It tells you what already exists, what conventions to
follow, and exactly which files you own. **Do not modify any file not explicitly listed as
yours** — other agents are working in this same repo concurrently on other pages.

The full literal content (copy, data tables, design tokens) lives in `/home/claude/repo/DESIGN_SPEC.md`
at the repo root (one level above `app/`). Read the section(s) named in your task before writing
copy — do not invent or paraphrase business content that's already specified there.

All app code lives under `/home/claude/repo/app`. This is Next.js 16 (App Router, Turbopack),
Tailwind CSS v4, TypeScript, Prisma ORM 7 (Postgres, already migrated and seeded).

## Hard rules

- **Do not run** `next dev`, `next build`, `next typegen`, `npm run build`, `prisma generate`,
  `prisma migrate`, or start any server/process. Other agents are working concurrently and these
  commands touch shared state (`.next/`, the Prisma client, migration history, ports). Just
  read/write/edit files. A separate pass will typecheck, lint and build everything once all work
  lands.
- **Do not edit** `prisma/schema.prisma`, `src/app/globals.css`, `src/content/nav.ts`, or any file
  under `src/components/site/`, `src/app/layout.tsx`, `src/app/(public)/layout.tsx`,
  `src/app/studio/(protected)/layout.tsx` — these are finished and shared by every page.
- If you think you need a new Prisma field/model that doesn't exist, don't add one — work within
  the existing schema (see below) and note the limitation in your final report instead.
- Only create the files listed in your specific task. If a task mentions a route, use the exact
  path given.
- Match the existing visual language: rounded-full pill buttons, the `glass-card`/`glass-panel`
  CSS classes, Bricolage Grotesque for headings (`font-display`) / Inter for body (default),
  green-600 (`#16A34A`) as primary, orange-500 (`#F97316`) reserved for conversion CTAs only.
  Look at an already-built page before writing a new one — e.g.
  `src/app/(public)/products/page.tsx`, `src/components/products/ProductsBrowser.tsx`, and
  `src/app/(public)/products/[slug]/page.tsx` are good references for public content pages;
  `src/components/studio/CertificationsManager.tsx` + `src/app/actions/certifications.ts` are the
  reference pattern for a Studio CRUD section.

## Design tokens already available (do not redefine)

- Tailwind custom colors: `forest-800` (#0E3D22), `forest-900` (#0B1F13), `forest-950` (#07200F),
  `forest-975` (#082816). Everything else (green-*, orange-*, gray-*) is Tailwind's default
  palette and matches this design system's hex values exactly (verified — green-600 is the brand
  primary, orange-500 is the CTA orange).
- Fonts: `font-display` (Bricolage Grotesque, headings) and the default sans (Inter, body).
- Custom breakpoint: `wide:` = min-width 1080px (used by the header's nav-collapse; you shouldn't
  need it elsewhere).
- Animation utility classes (from `--animate-*` tokens): `animate-fade-up`, `animate-shake`,
  `animate-spin-slow`, `animate-pulse-ring`, `animate-toast`, `animate-drawer`, `animate-bar`,
  `animate-pop`, `animate-blip`, `animate-drift`. Use these instead of writing new `@keyframes`.
- CSS component classes (in `globals.css`, `@layer components`): `.glass-card`, `.glass-nav`,
  `.glass-panel`, `.btn-cta` (orange gradient pill button), `.btn-outline` (white outline pill
  button). Apply directly as classNames, e.g. `<Link className="btn-cta px-6 py-3">…</Link>`.
- `[data-reveal="1"]` + `.is-visible` drive scroll-reveal — don't hand-roll this, use the
  `<Reveal>` component (below) which sets these for you.
- Tailwind v4 supports arbitrary integer/half-step spacing directly (e.g. `px-6.5`, `w-38`,
  `gap-4.5`) — these aren't typos, the spacing scale is dynamically generated.

## Reusable components (import, don't recreate)

- `import { PageHeader } from "@/components/ui/PageHeader"` — eyebrow + H1 + subcopy block used
  at the top of every content page (see any built page for usage).
- `import { Chip } from "@/components/ui/Chip"` — pill button with an `active` boolean prop, used
  for filters/tabs/multi-selects.
- `import { Reveal } from "@/components/ui/Reveal"` — wraps children, fades up on scroll into
  view. Takes an optional `as` prop (defaults to `div`) and forwards `className`/other props.
- `import { Tooltip } from "@/components/ui/Tooltip"` — wraps a trigger element, shows a small
  dark pill tooltip above it on hover/focus. Prop: `label`.
- `import { useToast } from "@/components/ui/Toast"` — `const { showToast } = useToast()` inside
  a Client Component, then `showToast("message")` to fire a bottom-center toast. Already mounted
  globally in the root layout.
- `import { useCountUp } from "@/hooks/useCountUp"` — animates the leading number in a label
  string once it scrolls into view. See `src/components/ui/CountUpStat.tsx` or
  `src/components/studio/DashboardStatCard.tsx` for usage patterns.
- `import { Logo } from "@/components/site/Logo"` — the green/orange circular brand mark.

## Data access layer (server-only — import only from Server Components or Server Actions)

- `src/lib/data/products.ts` — `listPublishedProducts()`, `listAllProducts()`,
  `getProductBySlug(slug)`, `specRows(product)` (builds the 7-row spec sheet),
  `hasPhotoWarning(product)`.
- `src/lib/data/testimonials.ts` — `listApprovedTestimonials()`, `listAllTestimonials()`.
- `src/lib/data/certifications.ts` — `listCertifications()`, `CERTIFICATION_STATUS_LABEL` map.
- `src/lib/data/blog.ts` — `listPublishedPosts()`, `listAllPosts()`, `getPostBySlug(slug)`,
  `postParagraphs(body)` (splits the stored `\n\n`-joined body back into paragraphs).
- `src/lib/data/gallery.ts` — `listPublishedGalleryImages()`, `listAllGalleryImages()`,
  `GALLERY_CATEGORIES` (`["The line","Product","Dispatch","Facility"]`).
- `src/lib/data/settings.ts` — `getSiteSettings()` (singleton row — has `businessName`, `tagline`,
  `phone`, `whatsappNumber`, `email`, `address`, `hours`, `instagramHandle`, `linkedinPath`,
  `seoTitle`, `seoDescription`, `googleSearchConsoleId`, `guaranteeStatement`,
  `cookieConsentCopy`, `termsContent`, `privacyContent`, `cookieNoticeContent`), plus
  `whatsappLink(number, message)`.
- `src/lib/data/enquiries.ts` — see for the Enquiries/Quote/Distributor data model; you shouldn't
  need this unless your task says so.
- `src/lib/images.ts` — `PRODUCT_PHOTOS`, `FARM_PHOTO`, `MARKET_PHOTO`, `galleryPhotoForIndex(i)`,
  `CATEGORY_SWATCH` (Fruit/Veg CSS gradient fallbacks), `HERO_VIDEO_URL`, `HERO_POSTER_URL`.

## Static content constants (no DB — these things have no Studio CRUD section)

- `src/content/services.ts` — `SERVICES` array, `getServiceBySlug(slug)`.
- `src/content/standards.ts` — `STANDARDS` (6 rows), `EXPORT_PROCESS` (4 steps).
- `src/content/team.ts` — `FOUNDER`, `TEAM` (6 members).
- `src/content/faq.ts` — `FAQS` (8 Q&As).
- `src/content/home.ts` — already used by the Home page, not needed elsewhere.
- `src/content/nav.ts` — `SITE_NAV`, `STUDIO_NAV`, `FOOTER_COLUMNS` (read-only reference, don't edit).

## Server Actions pattern

Actions live in `src/app/actions/*.ts` with `"use server"` at the top of the file. Look at
`src/app/actions/certifications.ts` (Studio CRUD pattern: `requireSession()` guard,
`revalidatePath(...)` after mutation) and `src/app/actions/quote.ts` (public form pattern: zod
`safeParse`, return a discriminated `{ok:true,...} | {ok:false,...}` result rather than throwing).
For Studio mutations, guard with:
```ts
import { getSession } from "@/lib/auth";
const session = await getSession();
if (!session) throw new Error("Not authenticated");
```
(The `studio/(protected)/layout.tsx` already redirects unauthenticated visitors before they reach
any page, so this is a defense-in-depth check, not the primary gate.)

## Routing conventions

- Public pages go under `src/app/(public)/<route>/page.tsx` — the route group layout already
  wraps them with the header, footer, WhatsApp widget, cookie bar and preloader. Don't add your
  own header/footer.
- Studio pages go under `src/app/studio/(protected)/<route>/page.tsx` — already wrapped with the
  authenticated sidebar shell. Don't add your own sidebar/auth check beyond the defense-in-depth
  action guard above.
- Next.js 16: `params` and `searchParams` in `page.tsx` are **Promises** — `await props.params`.
  Use the `PageProps<"/exact/route">` / `LayoutProps<"/exact/route">` global helper types for
  props (see `src/app/(public)/products/[slug]/page.tsx` for an example). Don't worry about these
  types not resolving yet for brand-new routes — that's expected until the final `next typegen`
  pass runs; write the code as if they'll resolve.
- Use `next/image`'s remote patterns are already configured for `images.pexels.com`,
  `videos.pexels.com`, `images.unsplash.com` — but this project mostly uses plain CSS
  `background-image` on styled `<div>`s rather than `next/image` (see ProductsBrowser for the
  pattern) since these are decorative photography, not user-uploaded content needing
  optimization control. Follow that pattern for consistency unless a task says otherwise.
- Metadata: export `export const metadata: Metadata = { title: "…" }` per page (title template
  already appends "· Kadie Fresh" from the root layout).

## Prisma models you'll use (already migrated + seeded — see `prisma/schema.prisma` for exact
fields, don't guess)

`Product`, `Testimonial`, `Certification` (+ `CertificationStatus` enum: VALID/ON_REQUEST/RENEWING),
`BlogPost`, `GalleryImage`, `Enquiry` (+ `EnquiryType`: QUOTE/DISTRIBUTOR/GENERAL, `EnquiryStatus`:
NEW/REPLIED/CLOSED), `SiteSettings`, `AdminUser`. Import types from `@/generated/prisma/client`,
e.g. `import type { BlogPost } from "@/generated/prisma/client"`.

## File uploads (only needed for the Gallery manager task)

`POST /api/upload` (already built) accepts `multipart/form-data` with fields `file` (image) and
`category` (short slug used as a subfolder name), auth-gated, validates type/size, saves to
`public/uploads/<category>/`, and returns `{ url: "/uploads/<category>/<uuid>.<ext>" }` JSON. Call
it with `fetch("/api/upload", { method: "POST", body: formData })` from a Client Component, then
use the returned `url` when creating a `GalleryImage` row via a Server Action.

## Known deliberate deviations from the original prototype (do these, don't reproduce the gaps)

- Terms of Service / Privacy Policy / Cookie Notice now have real authored content in
  `SiteSettings.termsContent` / `.privacyContent` / `.cookieNoticeContent` (plain text,
  paragraphs separated by blank lines) — render them as simple prose pages, don't invent new
  copy or leave them as stubs.
- The Distributor application form now collects **real** `contactEmail`/`contactPhone` fields
  (the prototype fabricated a fake email from the company name — don't reproduce that).
- Dashboard/Studio number-crunching should be real queries, not hardcoded copy (already done in
  `src/lib/data/dashboard.ts` — nothing more to do there).

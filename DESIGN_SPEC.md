# Kadie Fresh — Design & Content Specification

**Purpose of this document.** This is a complete extraction of every piece of literal content, data, styling value, and interaction behavior present in the Claude Design prototype at `project/Kadie Fresh Slice.dc.html` (2,027 lines) and its runtime `project/support.js` (1,911 lines). It is written so an engineering team can rebuild Kadie Fresh as a real Next.js application **without opening the prototype files**. All copy, numbers, and data arrays below are copied verbatim from the prototype's source — they are real production content, not placeholders (except where explicitly marked as a gap). Section 9 lists everything that is prototype-runtime plumbing and must **not** be ported.

**Source files:**
- `project/Kadie Fresh Slice.dc.html` — markup/template + the single `<script data-dc-script>` block containing all data arrays and the `Component extends DCLogic` class (state, computed view-model, event handlers). This is where 100% of the business content lives.
- `project/support.js` — a generated, generic templating runtime (`GENERATED from dc-runtime/src/*.ts — do not edit`). Contains **zero** Kadie Fresh business content — confirmed by full read and by grepping for brand/product/CDN terms (no hits). It exists purely to interpret `<sc-if>`/`<sc-for>`/`{{ }}` template syntax and run the `Component` class through React. See Section 9.

---

## 1. Business info & global constants

| Field | Value |
|---|---|
| Business/brand name | Kadie Fresh |
| Legal entity | Kadie Fresh, RC 1849022 (Nigerian company registration number, from footer copyright line) |
| Tagline (settings default) | "Washed, sliced, ready to cook." |
| Phone (display format) | 0810 542 0458 |
| Phone (tel/wa.me format) | +2348105420458 (tel links) / 2348105420458 (wa.me link, no `+`) |
| Email | info@kadiefresh.com |
| Address / facility | Ikorodu, Lagos |
| Opening hours | Mon–Sat, 6am–6pm |
| WhatsApp studio setting default | `2348105420458` (editable in Studio → Dashboard "Change WhatsApp number") |
| Copyright line | © 2026 Kadie Fresh. RC 1849022. |
| Instagram handle (settings) | kadiefresh → `https://instagram.com/kadiefresh` |
| LinkedIn path (settings) | company/kadiefresh → `https://linkedin.com/company/kadiefresh` |
| Facebook | `https://facebook.com/kadiefresh` |
| X (Twitter) | `https://x.com/kadiefresh` |
| SEO page title (settings default) | "Kadie Fresh — prepared fresh produce, Lagos" |
| SEO meta description (settings default) | "Washed, cut and sealed within four hours. Retail packs, kitchen supply, bulk and export from Ikorodu, Lagos." |
| Google Search Console verification field | empty by default; free-text field, described as "Pasted here, it is written into the site head automatically." |
| Studio demo user | Femi Alabi — role "Owner" (shown in Studio sidebar user chip and Dashboard greeting "Good morning, Femi") |

### Brand colors (hex)

| Token | Hex | Usage |
|---|---|---|
| Primary green | `#16A34A` | Primary brand green — links, active nav underline, icons, primary borders |
| Green (bright/gradient top) | `#22C55E` | Gradient top-stop for "success" green buttons/logo radial |
| Green (deep radial) | `#12833C` | Gradient bottom-stop for logo mark / success icon radial |
| Dark green (surface) | `#0E3D22` | Header/footer/sidebar dark backgrounds, headings-on-dark, tooltip bg |
| Darkest green (near-black) | `#0B1F13` | Primary heading text color, deepest gradient stops |
| Deep green alt | `#07200F` | Gradient bottom-stops (sidebar, login panel, CTA band, export header) |
| Orange accent | `#F97316` | **Reserved for conversion CTAs only** — "Request a quote" buttons, price/orange badges |
| Orange light | `#FB923C` | Gradient top-stop for orange CTA buttons |
| Bright green (indicator) | `#4ADE80` | "Online now" blip dot, toast bullet dot |
| Light green text-on-dark | `#86EFAC` | Small kicker labels on dark backgrounds (Export page eyebrow, footer email link) |
| Background wash 1 | `#E9F1EA` | `<body>` background |
| Background wash 2 | `#F4FAF6` | Page gradient wash |
| Background wash 3 | `#FBFDFB` | Page gradient wash (near white) |
| Green surface tint | `#F0FDF4` | Light green fill for icon chips, badges, highlight boxes, "Valid"/"Published" pills |
| Green pale (selection) | `#DCFCE7` | `::selection` background, quote-mark glyph color, 404 numeral color |
| Orange surface tint | `#FFF1E6` | "Fruit" category tag background, "New" status pill background |
| Orange text | `#C2410C` | "Fruit" tag text, "New"/"Draft" pill text |
| Error red | `#DC2626` | Field error border |
| Error bg | `#FEF2F2` | Login error banner background |
| Error border | `#FECACA` | Login error banner border |
| Error text | `#B91C1C` | Login error banner text |
| Muted gray | `#9CA3AF` | Placeholder text, secondary meta |
| Body gray | `#6B7280` | Secondary/body copy |
| Label gray | `#374151` | Form label text |
| Text dark | `#1F2937` / `#111827` | Blog body copy / base body text |
| Paragraph gray | `#4B5563` | Standard paragraph color |
| Off-white on dark | `#EAF6EE` | Text on dark green surfaces |
| Placeholder image gradient (Veg / generic) | `linear-gradient(135deg,#CDEED8,#8FD3A9)` | Team avatars, About photo block, service illustration block, contact map block |
| Placeholder image gradient (Fruit) | `linear-gradient(135deg,#FFE0C7,#F9A870)` | Fruit-category swatch fallback |
| Progress track | `#EAF3EC` | Dashboard stat-card mini progress bar track |
| Neutral panel | `#F7FAF8` | Reply-body panel bg, FAQ CTA band bg |
| Very light panel | `#FAFDFB` | No-results panel bg, dropzone bg |

### Fonts

- **Display/headings:** `'Bricolage Grotesque', sans-serif` — weights 400, 600, 700, 800, optical size axis `opsz` 12..96.
  - Google Fonts URL: `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap`
- **Body/UI:** `'Inter', system-ui, sans-serif` — weights 400, 500, 600, 700.
- Preconnects: `https://fonts.googleapis.com`, `https://fonts.gstatic.com` (crossorigin).

### Favicon

Inline SVG data URI, two overlapping circles matching the logo mark:
```
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='13' cy='13' r='11' fill='%2316A34A'/%3E%3Ccircle cx='23' cy='23' r='6' fill='%23F97316'/%3E%3C/svg%3E
```
Decoded: green circle (`#16A34A`) centered at (13,13) r=11, orange circle (`#F97316`) centered at (23,23) r=6, on a 32×32 viewBox. This is also the pattern for the in-page logo mark (a green radial-gradient circle with a small orange dot bottom-right, sometimes with a white/dark ring border depending on background).

### Global CSS reset (literal, apply as-is)

```css
body { margin:0; background:#E9F1EA; font-family:'Inter',system-ui,sans-serif; color:#111827; -webkit-font-smoothing:antialiased; }
* { box-sizing:border-box; }
a { color:#16A34A; text-decoration:none; }
a:hover { color:#0E3D22; }
input, textarea, select, button { font-family:inherit; }
input:focus-visible, textarea:focus-visible, button:focus-visible { outline:2px solid #16A34A; outline-offset:2px; }
::selection { background:#DCFCE7; }
```

Typographic details used throughout: headings use `text-wrap:balance`, body paragraphs use `text-wrap:pretty`, negative letter-spacing on display type (`-.02em` to `-.05em` depending on size).

---

## 2. Design tokens

### Border-radius scale
- `999px` — pills: all buttons, chips, tag badges, avatar circles
- `30px` — mobile device-frame corner (prototype-only chrome, see §9) — for production, treat as "large card" radius if needed
- `20px`–`22px` — large panels: quote-wizard card, distributor form card, gallery images, hero image blocks, certifications empty-state box
- `18px` — standard cards: product cards, audience cards, service cards, standards cards, testimonial cards, dashboard stat cards, studio panels
- `16px` — secondary cards: "keep reading" blog cards, thumbnails, cookie bar, spec-sheet panel
- `14px`–`12px` — inputs, guarantee callout box, small panels
- `10px`–`6px` — small chips/swatches, studio input fields (`10px`), photo squares

### Glass surface recipes (glassmorphism)

**Standard card glass** (used for almost every card across the whole site and studio):
```css
border: 1px solid rgba(255,255,255,.72);
border-radius: 18px; /* varies 16–20px by component */
background: rgba(255,255,255,.62);
backdrop-filter: blur(16px) saturate(1.7);
-webkit-backdrop-filter: blur(16px) saturate(1.7);
box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 8px 28px rgba(14,61,34,.09);
```
Hover state (cards that are clickable):
```css
transform: translateY(-4px);
box-shadow: 0 18px 40px rgba(14,61,34,.12); /* magnitude varies 0.10–0.12 by component */
border-color: rgba(22,163,74,.3); /* only on product/service cards */
transition: transform .24s cubic-bezier(.2,.8,.2,1), box-shadow .24s, border-color .24s;
```

**Header glass** (sticky public-site nav bar):
```css
background: rgba(255,255,255,.62);
backdrop-filter: blur(22px) saturate(1.7);
border-bottom: 1px solid rgba(255,255,255,.7);
box-shadow: 0 1px 0 rgba(14,61,34,.06);
```

**Form panel glass** (quote wizard step card, distributor application card):
```css
border: 1px solid rgba(14,61,34,.1);
border-radius: 20px;
background: rgba(255,255,255,.72);
backdrop-filter: blur(22px) saturate(1.7);
box-shadow: 0 18px 44px rgba(14,61,34,.08);
```

**Search pill glass** (products page search box):
```css
background: rgba(255,255,255,.7);
border: 1px solid rgba(14,61,34,.1);
backdrop-filter: blur(18px) saturate(1.7);
border-radius: 999px;
```

**Cookie consent bar glass:**
```css
background: rgba(255,255,255,.78);
backdrop-filter: blur(22px) saturate(1.7);
border: 1px solid rgba(255,255,255,.8);
box-shadow: 0 16px 40px rgba(14,61,34,.16);
border-radius: 16px;
```

**Floating WhatsApp widget glass:**
```css
background: rgba(20,150,70,.9);
backdrop-filter: blur(16px) saturate(1.7);
border: 1px solid rgba(255,255,255,.34);
box-shadow: inset 0 1px 0 rgba(255,255,255,.34), 0 14px 36px rgba(14,61,34,.34);
border-radius: 999px;
```

General glassmorphism rule used site-wide: **`blur(16–22px) saturate(1.6–1.7)`**, semi-transparent white surfaces from **`rgba(255,255,255,.62)`** (cards) to **`rgba(255,255,255,.78)`** (cookie bar) to **`rgba(255,255,255,.96)`** (opaque-feeling dark bars), a **1px white/near-white border highlight**, and an **inset top-edge specular** (`inset 0 1px 0 rgba(255,255,255,.9)`) layered under a soft drop shadow tinted with the dark-green brand color (`rgba(14,61,34,…)`), never plain black. Backgrounds behind glass surfaces always carry a subtle green/orange radial "wash" (see gradients below) so the frost has something to diffract — flat white behind glass reads as plain grey.

### Gradients (literal, exact stops)

- **Orange CTA button:** `linear-gradient(180deg,#FB923C,#F97316)` — shadow `0 6px–10px 18px–30px rgba(249,115,22,.32–.42)` depending on button size/state.
- **Green success/secondary CTA button:** `linear-gradient(180deg,#22C55E,#16A34A)` — shadow `0 6px–8px 18px–22px rgba(22,163,74,.28–.3)`.
- **Hero background base:** `linear-gradient(125deg,#14532D 0%,#166534 40%,#0B1F13 100%)`.
- **Hero animated bloom overlay:** `radial-gradient(70% 60% at 22% 30%,rgba(34,197,94,.5),transparent 62%), radial-gradient(50% 50% at 82% 72%,rgba(249,115,22,.34),transparent 66%)` — animated via `kfDrift` 22s ease-in-out infinite alternate.
- **Hero dark-frost overlay (over video):** three-stop `linear-gradient(180deg,rgba(6,20,12,.72) 0%,rgba(6,20,12,.58) 45%,rgba(6,20,12,.82) 100%)`.
- **Page wash (public pages, light mode):** `radial-gradient(60% 44% at 8% 0%,#E7F6EC 0%,transparent 60%), radial-gradient(48% 38% at 96% 22%,#FFF0E4 0%,transparent 62%), linear-gradient(180deg,#FBFDFB,#F4FAF6)`.
- **Section header wash:** `linear-gradient(170deg,#F4FBF6 0%,#FFFFFF 78%)` (used atop Products, Services, Standards, About, Blog headers).
- **Studio page wash:** `radial-gradient(52% 40% at 78% 0%,#E7F6EC 0%,transparent 62%), linear-gradient(180deg,#FAFDFB,#F1F7F3)`.
- **Dark surfaces (footer, sidebar, login left-panel, export header, CTA band):** `linear-gradient(180deg,#0E3D22,#07200F)` (sidebar/login) or `linear-gradient(160deg,#0E3D22,#0B2E1A)` (export credentials header) or `linear-gradient(120deg,#0E3D22,#07200F)` (home CTA band). Flat footer: `#0E3D22`.
- **Logo mark radial:** `radial-gradient(circle at 32% 30%,#22C55E,#12833C)`.
- **Placeholder photo blocks:** Veg/generic `linear-gradient(135deg,#CDEED8,#8FD3A9)`; Fruit `linear-gradient(135deg,#FFE0C7,#F9A870)`.

### Shadows (literal)
- Card resting: `0 8px 28px rgba(14,61,34,.09)` + inset top specular `inset 0 1px 0 rgba(255,255,255,.9)`
- Card hover: `0 18px 40px rgba(14,61,34,.12)` (range .09–.12 across components)
- Orange CTA idle → hover: `0 6px 18px rgba(249,115,22,.32/.34)` → `0 10px–20px 24px–44px rgba(249,115,22,.4–.5)`
- Green CTA: `0 6px–8px 18px–22px rgba(22,163,74,.28–.3)`
- Dashboard "Change WhatsApp" card border/shadow: `border:1.5px solid #F97316; box-shadow:0 8px 24px rgba(249,115,22,.1)`
- Toast: `0 14px 34px rgba(14,61,34,.34)`
- Tooltip: `0 10px 26px rgba(14,61,34,.32)`
- Cookie bar: `0 16px 40px rgba(14,61,34,.16)`
- WhatsApp widget: `inset 0 1px 0 rgba(255,255,255,.34), 0 14px 36px rgba(14,61,34,.34)` idle → `0 20px 44px rgba(14,61,34,.42)` hover

### Animation keyframes (exact, literal — copy these 1:1)

```css
@keyframes kfShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(5px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(2px)} }
@keyframes kfFadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes kfSpin { to{transform:rotate(360deg)} }
@keyframes kfPulse { 0%{transform:scale(1);opacity:.55} 70%{transform:scale(1.5);opacity:0} 100%{opacity:0} }
@keyframes kfToast { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
@keyframes kfDrawer { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
@keyframes kfBar { from{width:4%} to{width:100%} }
@keyframes kfPop { from{transform:scale(.9);opacity:0} to{transform:scale(1);opacity:1} }
@keyframes kfBlip { 0%{box-shadow:0 0 0 0 rgba(74,222,128,.7)} 70%{box-shadow:0 0 0 9px rgba(74,222,128,0)} 100%{box-shadow:0 0 0 0 rgba(74,222,128,0)} }
@keyframes kfDrift { from{transform:scale(1) translate3d(0,0,0)} to{transform:scale(1.12) translate3d(-2%,-1.5%,0)} }
```

| Keyframe | Duration / easing | Used where |
|---|---|---|
| `kfShake` | `.42s ease both` | Form field wrapper on validation error (quote wizard name/email/phone/items/volume); login error banner |
| `kfFadeUp` | `.3s–.35s ease both` | Step-panel entrance in quote wizard (each of 3 steps), "no results" search panel, distributor confirmation panel, studio empty states, studio detail-panel entrance (product/post editors, enquiry detail) |
| `kfSpin` | `to{rotate 360deg}` | **Defined but unused** in the current markup — no spinner element references it. Decide whether a loading spinner is needed in production; the keyframe is ready but was never wired to an element. |
| `kfPulse` | `1.8s–2.4s ease-out infinite` (ring), `2.2s` (success state) | Preloader logo pulsing ring; quote/distributor confirmation checkmark pulsing ring; WhatsApp widget pulsing ring (2.4s) |
| `kfToast` | `.34s–.4s cubic-bezier(.2,.8,.2,1) both` | Toast notification entrance; cookie consent bar entrance |
| `kfDrawer` | `.32s cubic-bezier(.2,.8,.2,1) both` | Mobile menu full-screen drawer slide/fade-in |
| `kfBar` | `1.25s cubic-bezier(.4,0,.2,1) both` | Preloader progress bar fill (width 4% → 100%) |
| `kfPop` | `.16s–.5s cubic-bezier(.2,1.3,.4,1) both` (or plain `ease`) | Success checkmark pop-in (quote/distributor confirmation, .45–.5s overshoot easing); gallery lightbox open (.22s ease); tooltip appear (.16s ease) |
| `kfBlip` | `2s ease-out infinite` | WhatsApp widget "Online now" green dot ping |
| `kfDrift` | `22s ease-in-out infinite alternate` | Hero background gradient bloom slow zoom/drift (scale 1→1.12, translate) |

**Scroll-reveal system** (not a CSS keyframe — implemented in JS, see §8 for full mechanism): elements marked `data-reveal="1"` fade up via `opacity .5s ease + transform .55s cubic-bezier(.2,.8,.2,1)`, staggered `55ms` per sibling index, triggered by an `IntersectionObserver` at `threshold:.12`, with a hard 1400ms failsafe that forces all reveals visible regardless of scroll position (so content is never permanently hidden if the observer misfires).

### Spacing / layout patterns
- Page horizontal padding: `26px` (mobile-safe) consistently across all sections.
- Card grid gaps: `14px`–`22px` depending on density (dashboard stat cards `14px`, product/audience/service cards `16–18px`, gallery columns `16px`).
- Section vertical rhythm: header block `~44–48px` top padding / `18–30px` bottom, content block `~20–26px` top / `40–56px` bottom.
- Responsive grids: `repeat(auto-fit,minmax(Npx,1fr))` throughout, with `N` tuned per content type (`190px` steps for compact tiles, `210–260px` for cards, `290–320px` for two-pane studio layouts).
- Device-simulated breakpoints used by the prototype's fake "device frame" (see §9 for why this whole mechanism is not real responsive CSS): desktop `1280px`, tablet `834px`, mobile `390px`. The header collapses from full nav to a burger menu when the effective viewport drops under **1080px** — treat this 1080px threshold as the real intended tablet/mobile nav breakpoint for production CSS (a plain `@media (max-width: 1080px)` step), independent of the prototype's specific measurement hack.

---

## 3. Navigation structure

### Public site header nav (desktop, shown ≥1080px effective width)
In order, exactly as coded in `siteNav`:
1. Home → `/`
2. Products → `/products`
3. Services → `/services`
4. Standards → `/standards`
5. About → `/about`
6. Blog → `/blog`
7. Contact → `/contact`

Two of these carry hover tooltips (see §8 tooltip list): **Standards** shows "HACCP principles, potable-water wash and batch coding"; **Services** shows "Retail, kitchen supply, bulk and export" (the tooltip text substitutes for the label text on hover for these two items only, per the prototype's `showTip` logic).

Header right side (desktop): tap-to-call link (`0810 542 0458`, `tel:+2348105420458`, shows tooltip "Tap to call — Mon to Sat, 6am to 6pm"), then the orange **"Request a quote"** button (→ quote wizard step 1), then (below 1080px) the burger icon.

### Mobile/tablet burger drawer (full-screen overlay)
Same 7 nav items as desktop, rendered as large (34px) display-type links, plus at the bottom:
- Button: **"Enquire on WhatsApp"** (orange CTA) — ⚠ see §9, in the prototype this button's `onClick` actually navigates to the internal quote wizard, not to a WhatsApp link; this label/action mismatch needs a deliberate decision in production (either wire it to `wa.me`, or relabel it "Request a quote").
- Text line: `0810 542 0458 · Ikorodu, Lagos · Mon–Sat 6am–6pm`

### Pages that exist but have **no header/footer entry point** in the current prototype
These are fully built with content, but are only reachable in the prototype via its internal dev route-chip bar (see §9) — not from any real in-page link:
- **Testimonials** (`goReviews` function is defined but never wired to any `onClick` in the markup)
- **FAQ** (`goFaq` function is defined but never wired to any `onClick` in the markup)
- **Gallery** — has an inert footer anchor (`href="#gallery"`, not an actual click handler; see below) but no working entry point either.

Recommendation: production IA must add real entry points for Testimonials and FAQ (e.g., footer links, or a "Reviews" teaser on Home, and an FAQ link near Contact) since the current design leaves them orphaned.

### Footer link structure (as coded in `footerCols`)
⚠ **Important:** every footer link in the prototype is a plain `<a href="#anchor">` with no `onClick` handler — none of them actually navigate the single-page app. They are decorative/placeholder anchors representing intended IA, not working links. Build real `<Link>`s to real routes in production.

- **Column 1 (brand):** "Kadie Fresh" wordmark, tagline "Prepared fresh produce, Ikorodu, Lagos. Mon–Sat 6am–6pm.", email link `info@kadiefresh.com`, 4 social icons (labels `f`, `in`, `ig`, `x` — single-letter glyphs, not real icon graphics) linking to Facebook/LinkedIn/Instagram/X.
- **Explore:** Products (`#products`), Services (`#services`), Standards (`#standards`), Gallery (`#gallery`)
- **Company:** About us (`#about`), The founder (`#founder`), Our team (`#team`), Blog (`#blog`)
- **Buyers:** Export credentials (`#export`), Download line card (`#linecard`), Become a distributor (`#distributor`), Request a quote (`#quote`)
- **Bottom bar:** `© 2026 Kadie Fresh. RC 1849022.` on the left; `Terms of service` (`#terms`) and `Privacy` (`#privacy`) on the right — **these two legal pages do not exist as content anywhere in the prototype**; only the label and an inert anchor exist. Studio → Site settings shows "Terms of service: Published" and "Privacy policy: Published" as status pills, but no actual page copy was ever authored. **This is a genuine content gap** — Terms of Service and Privacy Policy copy must be authored fresh, not extracted from the prototype.

### Studio (admin) sidebar nav
Exactly as coded in `studioNav`, in order:
1. Dashboard → `/studio` (or `/studio/dashboard`)
2. Site settings → `/studio/settings`
3. Products → `/studio/products`
4. Enquiries → `/studio/enquiries` (carries a numeric badge = count of enquiries with status "New")
5. Testimonials → `/studio/testimonials`
6. Certifications → `/studio/certifications`
7. Blog → `/studio/blog`
8. Gallery → `/studio/gallery`

Sidebar footer: user chip (avatar circle, "Femi Alabi" / "Owner") + sign-out icon button (⏻, tooltip "Sign out").

### Studio login
Separate screen at `/studio/login` (not nested inside the sidebar layout). "← Back to site" link returns to Products page. "Forgot password" link (`#reset`, inert placeholder — no reset flow built).

### Full literal screen/route inventory (from the prototype's internal `screen` state machine — map each 1:1 to a Next.js route)

Public: `home`, `products`, `product` (dynamic, by product id), `services`, `service` (dynamic, by service id), `standards`, `about`, `team`, `gallery`, `testimonials`, `blog`, `post` (dynamic, by post id), `faq`, `contact`, `export`, `distributor`, `quote`, `done` (quote confirmation), `notfound` (404).

Auth/Studio: `login`, `dash`, `inbox`, `settings`, `products-admin`, `testimonials-admin`, `certifications`, `blog-admin`, `gallery-admin`.

Suggested Next.js route mapping:
```
/                          → home
/products                  → products (catalogue grid)
/products/[slug]           → product detail
/services                  → services list
/services/[slug]           → service detail
/standards                 → standards/trust page
/about                     → about (+ founder)
/team                      → team
/gallery                   → gallery (+ lightbox)
/testimonials              → testimonials
/blog                      → blog list
/blog/[slug]                → blog post detail
/faq                       → FAQ
/contact                   → contact
/export-credentials        → export credentials
/distributors/apply        → distributor application
/quote                     → 3-step quote wizard
/quote/sent                → confirmation (or a wizard step, not a separate route)
/studio/login               → studio login
/studio                     → dashboard
/studio/enquiries           → enquiries inbox
/studio/settings            → site settings
/studio/products             → products admin
/studio/testimonials         → testimonials admin
/studio/certifications        → certifications admin
/studio/blog                 → blog admin
/studio/gallery               → gallery admin
/* (catch-all)              → 404
```

---

## 4. Per-page content (public site)

### 4.1 Home

**Hero (full-bleed, dark, video background):**
- Eyebrow pill: "Ikorodu, Lagos · supplying and exporting since day one"
- H1: **"Welcome to Kadie Fresh."**
- Subcopy: "High-grade fresh produce, washed, sliced and sealed within four hours — supplied to Lagos kitchens and consolidated for export buyers overseas."
- CTA 1 (orange): **"Explore Products"** → Products page
- CTA 2 (glass outline): **"Request a Quote"** → Quote wizard
- Hero video: `src="https://videos.pexels.com/video-files/7456696/7456696-hd_1920_1080_30fps.mp4"`, `poster="https://images.pexels.com/videos/7456696/4k-agricultural-agriculture-batch-7456696.jpeg?auto=compress&cs=tinysrgb&w=1600"`, attributes `muted loop playsinline preload="auto"`, `object-fit:cover`. Underneath the video sits an always-present animated gradient fallback layer (`kfDrift`) plus a 3-stop dark overlay so text stays legible whether or not the video loads.
- Hero stat row (4 items, `homeStats`):
  | Value | Label |
  |---|---|
  | 4 hrs | wash to seal |
  | 10+ | prepared lines |
  | Batch | date-coded |
  | 6am | first dispatch |

**Proof strip** (4 items, `homeProof`, thin cards under hero):
| Title | Detail |
|---|---|
| Potable-water wash | Every batch, every line |
| Food-grade sealing | Packed within 4 hours |
| Traceable batches | Coded to source farm |
| HACCP principles | Applied across the line |

**"Who we supply" section:**
- Eyebrow: "Who we supply"
- H2: **"Four ways to buy"**
- 4 audience cards (`homeAudiences`):
  | Title | Description | CTA label | Target |
  |---|---|---|---|
  | For your home | Retail packs of prepared fruit and vegetables, ready for the pot. | Enquire on WhatsApp | → Products |
  | For your kitchen | Standing weekly volumes for restaurants, hotels and caterers. | Request a quote | → Quote wizard |
  | For distribution | Bulk supply for supermarkets, distributors and institutional buyers. | Talk to us | → Contact |
  | For export | Consolidated consignments with the documentation an importer will ask for. | Export credentials | → Export credentials page |

  Note: CTA labels here don't always match their destination literally (e.g. "Enquire on WhatsApp" routes to Products, not a WhatsApp chat) — decide deliberately in production whether the label or the destination should change.

**"The line" section (process):**
- Eyebrow: "The line"
- H2: **"Four steps, every batch"**
- 4 steps (`homeSteps`), first two dots green, last two orange:
  | Step | Detail |
  |---|---|
  | Wash | Potable water, graded intake |
  | Slice | Cut to spec per order |
  | Pack | Food-grade seal, date-coded |
  | Deliver | Cold handling to your door |

**"Selected lines" section:**
- Eyebrow: "Selected lines"
- H2: **"What we prepare"**
- "All products" button → Products page
- Featured products: **first 3 items of the PRODUCTS array** (Sliced pineapple, Chopped ugu, Prepared pepper mix) as cards (name, pack, category tag, image swatch).

**CTA band (dark green, end of page):**
- H2: **"Tell us what your kitchen needs."**
- Subcopy: "Message us and we will come back with pack sizes and a price."
- Button: **"Request a quote"** → Quote wizard

### 4.2 Products (catalogue)

- Eyebrow: "The catalogue"
- H1: **"Every line we prepare."**
- Subcopy: "Washed, cut and sealed within four hours. Retail packs, kitchen volumes and bulk pallets from the same line — each one date-coded to the batch it came from."
- Filter chips: **All / Fruit / Veg**
- Search box placeholder: "Search lines"
- Button: **"Download line card ↓"** (tooltip: "One-page PDF: every line, pack size, MOQ and shelf life") — triggers a toast "Line card PDF downloaded" in the prototype; production needs a real generated/static PDF download.
- Product card shows: image swatch, category tag, "MOQ {moq}", product name, pack size, "View spec →", shelf life.
- **Empty/no-results state:** icon, heading **"No line matches that"**, copy "We cut to spec on request. Tell us what you need and we will quote it even if it is not listed.", buttons "Clear search" and "Request a quote".

**Full product catalogue data** (8 products, literal, all fields — `id`, `name`, `cat`, `pack`, `grade`, `shelf`, `moq`, `storage`, `origin`, `blurb`):

| id | name | cat | pack | grade | shelf | moq | storage | origin | blurb |
|---|---|---|---|---|---|---|---|---|---|
| pineapple | Sliced pineapple | Fruit | 500g · sealed pack | Grade A, ripe | 4 days chilled | 20 packs | 2–4°C | Ogun State growers | Crown and eyes removed, cored and cut to even rings or chunks. Sealed within four hours of washing, date-coded to the batch and the farm it came from. |
| ugu | Chopped ugu | Veg | 250g · washed & drained | Grade A leaf | 3 days chilled | 30 packs | 2–4°C | Ikorodu belt | Stems stripped, triple-washed in potable water and spun dry so the pack does not sweat. Cut fine for soups or coarse on request. |
| pepper | Prepared pepper mix | Veg | 400g · blended base | Blend, deseeded | 5 days chilled | 24 packs | 2–4°C | Mile 12 intake | Rodo, tatashe and onion blended to a consistent stew base. Deseeded to your heat level and packed without water added. |
| carrots | Sliced carrots | Veg | 500g · pack | Grade A | 6 days chilled | 20 packs | 2–4°C | Jos plateau | Peeled and cut to coin, baton or dice. Sized to spec so the cut is even across the whole batch. |
| watermelon | Diced watermelon | Fruit | 500g · sealed pack | Grade A, seedless | 3 days chilled | 20 packs | 2–4°C | Oyo growers | Rind off, cut to 25mm dice and drained before sealing so the pack stays firm rather than swimming. |
| coconut | Grated coconut | Fruit | 300g · pack | Mature nut | 4 days chilled | 24 packs | 2–4°C | Badagry coast | Shelled, brown skin removed and grated the same morning. No sulphites, no added moisture. |
| onions | Chopped onions | Veg | 400g · pack | Grade A red | 4 days chilled | 30 packs | 2–4°C | Sokoto intake | Peeled and diced under extraction so the cut stays clean. Available fine, medium or ring cut. |
| plantain | Sliced plantain | Fruit | 600g · pack | Firm ripe | 2 days chilled | 20 packs | 2–4°C | Edo growers | Cut on the diagonal to an even 8mm for frying, or thick round for boiling. Sorted by ripeness before the line runs. |

Category → swatch fallback color: Fruit = `linear-gradient(135deg,#FFE0C7,#F9A870)`; Veg = `linear-gradient(135deg,#CDEED8,#8FD3A9)`.

### 4.3 Product detail

Layout: breadcrumb ("Products · {name}"), hero image + 3 thumbnails, category tag, H1 = product name, blurb, a **Spec sheet** panel (7 rows, tooltip on header "i" icon: "Every figure here is held per batch and printed on the pack label"):

| Spec row label | Value source |
|---|---|
| Pack | product.pack |
| Grade | product.grade |
| Shelf life | product.shelf |
| Minimum order | product.moq |
| Storage | product.storage |
| Sourced | product.origin |
| Batch coding | "Date + farm code on every pack" (static, same for every product) |

Buttons: **"Request a quote for this line"** (pre-fills the quote wizard's line-items with this product) and **"Call the line"** (`tel:` link).

Guarantee callout box (green left border), heading **"Our guarantee"**, copy: "If a pack arrives off-spec or past its seal window, we replace the batch or credit it in full. No return required — send the batch code."

### 4.4 Services (list)

- Eyebrow: "Services"
- H1: **"Four services, one line."**
- Subcopy: "The same facility, the same four-hour window. What changes is the pack, the volume and the paperwork that travels with it."

**Full services data** (4 items, literal):

| id | name | kicker | blurb | turnaround | minimum | bullets |
|---|---|---|---|---|---|---|
| retail | Retail packs | For your home | Sealed 250g–600g packs of prepared fruit and vegetables, cut the way a home kitchen actually uses them. | Next-day in Lagos | 20 packs | Cut, washed and sealed the same morning · Date-coded so you know the seal window · Mixed cases across any lines · WhatsApp reorder in one message |
| kitchen | Kitchen supply | For your kitchen | Standing weekly volumes for restaurants, hotels and caterers, cut to your own spec and delivered before service. | Before 7am, agreed days | 25kg per drop | Cut size fixed to your spec sheet · Standing order, one invoice a month · Substitution called before the run, never after · Named contact on the line |
| bulk | Bulk & distribution | For distribution | Pallet volumes for supermarkets, distributors and institutional buyers, with batch paperwork on every consignment. | 48–72 hours | 200kg | Batch and farm code per pallet · Cold handling to your depot · Volume pricing on standing contracts · Weekly forecast against your order book |
| export | Export consolidation | For overseas buyers | Consolidated consignments prepared to buyer spec with the documentation an importer will ask for before it ships. | By agreed sailing | One pallet | Phytosanitary certification arranged · NAFDAC and NEPC registration on file · Spec sheet signed off before the run · Photographs of the loaded consignment |

### 4.5 Service detail

Breadcrumb ("Services · {name}"), kicker, H1 = service name, blurb, checklist of bullets (✓ icons), buttons **"Request a quote"** and **"Talk to us"** (→ Contact). Side panel: illustration block + "At a glance" mini-table (Turnaround, Minimum, and a third static row **"Batch coding: Included"**).

### 4.6 Standards / trust page

- Eyebrow: "Trust & standards"
- H1: **"I'm precise, on the open."**
- Subcopy: "Six things govern how the line runs. Each one is written down, recorded per batch, and available to any buyer who asks."

**6 standards rows (literal):**
| Title | Description |
|---|---|
| Potable-water wash | Three tanks at falling turbidity. Water is tested monthly and logged; the last water produce touches is the cleanest on the floor. |
| Four-hour seal window | The line is laid out backwards from the seal. Intake is graded before washing so nothing spends time it cannot recover. |
| Batch and farm coding | Every pack carries the date it was washed and a code for the farm it came from. That code is how a complaint is traced in minutes. |
| HACCP principles | Hazard points identified at intake, wash, cut, pack and dispatch, with a record kept at each. Audited internally twice a year. |
| Cold handling | 2–4°C from cold room to vehicle to your door. Hotel drops land before 7am so nothing sits on a loading bay. |
| Replacement guarantee | Off-spec or past the seal window, we replace the batch or credit it in full against the code. No return required. |

Bottom callout (green panel): "Exporting? The credentials sit on their own page." / "NAFDAC, NEPC and phytosanitary certification, with the consignment process written out." Button: **"Export credentials →"**.

### 4.7 About

- Eyebrow: "About us"
- H1: **"Prep is the hardest part of a kitchen. We do it first."**
- Subcopy: "Kadie Fresh prepares fresh produce in a controlled facility in Ikorodu and supplies homes, kitchens, distributors and export buyers across and beyond Lagos."
- Photo block + 3 inline stats: **10+** prepared lines · **4 hrs** wash to seal · **Lagos** and export.

**Founder section** (kicker "The founder"):
- Name: **Femi Alabi**
- Role: **Founder & managing director**
- 3 paragraphs (literal):
  1. "Kadie Fresh started with one observation: kitchens in Lagos were paying skilled staff to peel. Every hour a cook spends at a wash tank is an hour not spent cooking, and every kitchen was solving it alone, badly."
  2. "The first year was a rented room in Ikorodu, three lines and a motorcycle. What changed the business was not scale, it was the batch code. Once a buyer could point at a pack and ask which farm, which morning, the conversation moved from price to reliability."
  3. "We now run more than ten prepared lines from a controlled facility, supply hotels and distributors across Lagos, and consolidate for buyers overseas. The four-hour window has not moved."
- Pull-quote (orange left border): "Every hour a cook spends at a wash tank is an hour not spent cooking."
- Button: **"Meet the team →"** → Team page

### 4.8 Team

- Eyebrow: "Our team"
- H1: **"Who handles your produce"**
- Subcopy: "Small team, fixed responsibilities. You will know who to call."

**Full team roster (6 members, literal):**
| Name | Role | Note |
|---|---|---|
| Femi Alabi | Founder & managing director | Runs intake grading personally most mornings. |
| Blessing Eze | Head of production | Owns the four-hour window and the spec sheets. |
| Samuel Oduya | Quality & compliance | HACCP records, batch coding, certification files. |
| Amaka Nwosu | Buyer relationships | Standing orders, quotes and the WhatsApp line. |
| Ibrahim Sule | Logistics | Cold handling, routing and the 7am hotel drops. |
| Chidera Okoro | Sourcing | Farm relationships from Ogun to the Jos plateau. |

Each card is a placeholder avatar circle (gradient, no real photo) + name + role + note.

### 4.9 Gallery (+ lightbox)

- Eyebrow: "Gallery"
- H1: **"See it in the room"**
- Filter chips: **All / The line / Product / Dispatch / Facility**
- Masonry layout (`columns:3 240px`), tile heights alternate 260px/190px.

**Full gallery tile list (9 items, literal label + category):**
| # | Label | Category |
|---|---|---|
| 1 | Intake grading | The line |
| 2 | Wash tanks | The line |
| 3 | Cutting bench | The line |
| 4 | Sealed retail packs | Product |
| 5 | Pepper base | Product |
| 6 | Pallet build | Dispatch |
| 7 | Cold room | Facility |
| 8 | Morning dispatch | Dispatch |
| 9 | Batch labelling | Facility |

Clicking a tile opens a **lightbox**: full-screen dark blurred backdrop, large image, caption label, hint text "Click anywhere to close" (click-anywhere-to-dismiss, no explicit close button).

### 4.10 Testimonials

- Eyebrow: "Testimonials"
- H1: **"What buyers tell us"**
- Only testimonials with `live:true` are shown publicly (3 of the 4 seeded ones — see data table in §7, "Zenith Foods Ltd" is seeded `live:false` and hidden from the public page by default, pending moderation).
- Card layout: large quotation-mark glyph, quote text, avatar placeholder, name, role.

### 4.11 Blog (list)

- Eyebrow: "Blog"
- H1: **"From the line"**
- Subcopy: "Notes on standards, sourcing and what actually keeps prepared produce good."
- Only posts with `published:true` show (first 3 of 4 seeded posts by default — see §7).
- Card shows: image swatch, category (uppercase, green), date, read time, title, excerpt.

### 4.12 Blog post detail

Breadcrumb ("Blog · {category}"), category/date/read-time/author meta row, H1 = title, hero image, body (array of paragraphs), then a green callout box "Buying for a kitchen?" / "We will quote against your own cut spec." + "Request a quote" button, then a "Keep reading" section showing up to 2 other published posts.

**Full blog post data (4 posts, complete literal bodies):**

---
**Post 1 — `cold-chain`**
- Title: **"What four hours actually buys you"**
- Category: Standards · Date: 12 August 2026 · Read: 6 min · Author: Femi Alabi
- Excerpt: "Between washing and sealing, produce loses more than moisture. Here is what happens in that window, and why we close it."
- Body (4 paragraphs):
  1. "Every prepared-produce operation has a number it will not say out loud: the gap between the wash tank and the seal. Ours is four hours, and it is the single figure that governs how the rest of the line is laid out."
  2. "A cut surface is an open wound. Respiration climbs, sugars convert, and the microbial load on that surface starts from whatever the water left behind. Chilling slows all three. It does not reverse any of them."
  3. "So the line runs backwards from the seal. Intake is graded before it is washed, because a fruit that fails grading after washing has already spent water and time. Cutting is batched by line rather than by order, because a knife that changes size every ten minutes is a knife that is idle. Packing sits next to sealing, not across the floor from it."
  4. "The result is not a claim about freshness in the abstract. It is a batch code, printed on the pack, that tells you the morning the produce was washed and the farm it arrived from. If a pack disappoints, that code is how we find out why."

---
**Post 2 — `ugu`**
- Title: **"Why we triple-wash ugu and spin it dry"**
- Category: The line · Date: 29 July 2026 · Read: 4 min · Author: Blessing Eze
- Excerpt: "The difference between a pack that keeps three days and one that keeps one is almost always water left in the leaf."
- Body (3 paragraphs):
  1. "Ugu comes in with field soil in the crease of the stem, and no single wash reaches it. We run three tanks at falling turbidity, so the last water the leaf touches is the cleanest water on the floor."
  2. "Then we spin. A leaf packed wet sweats, and a pack that sweats goes slimy at the bottom long before the top of it turns. Thirty seconds in the spinner is the cheapest shelf life we buy."
  3. "Buyers who receive ugu from us and store it above 4°C still see the three days. Below that, four. The variable is almost never the wash — it is the fridge at the other end."

---
**Post 3 — `export-docs`**
- Title: **"The paperwork an importer asks for first"**
- Category: Export · Date: 14 July 2026 · Read: 8 min · Author: Femi Alabi
- Excerpt: "Phytosanitary, NAFDAC, NEPC, and the certificate of origin. What each one proves, and who issues it."
- Body (4 paragraphs):
  1. "Most first-time exporters discover the documentation after the buyer has already agreed a price. It is the wrong order, and it costs a sailing."
  2. "A phytosanitary certificate is issued by the Nigeria Agricultural Quarantine Service and attests that the consignment was inspected and found free of quarantine pests. It is consignment-specific. It cannot be issued retrospectively."
  3. "NAFDAC registration covers the product and the facility rather than the shipment. NEPC registration covers you as an exporter. The certificate of origin comes from the chamber of commerce and is what the importer files at their end."
  4. "We hold the first three continuously and arrange the fourth per consignment. A buyer asking for all of them is not being difficult — they are being audited by someone else."

---
**Post 4 — `pepper`** *(seeded as unpublished draft by default — `published:false`; content fully exists, it just does not show on the public blog list unless a studio editor publishes it)*
- Title: **"Deseeding to a heat level, not a recipe"**
- Category: The line · Date: 2 July 2026 · Read: 5 min · Author: Blessing Eze
- Excerpt: "Two kitchens ordering the same pepper mix rarely want the same pepper mix. We solved it with a number."
- Body (3 paragraphs):
  1. "Heat in a stew base is a function of the rodo-to-tatashe ratio and how much of the seed and pith survives the blend. Left alone, it varies batch to batch by more than most kitchens will tolerate."
  2. "We index it. One through five, agreed once with the kitchen, held on the spec sheet, checked at the blender. A hotel that orders a two gets a two in January and a two in September."
  3. "It sounds trivial. It is the single thing our kitchen customers mention most when they renew."

---

Blog post hero images: category `Export` uses the "MARKET" image; every other category uses the "FARM" image (see §8 CDN asset list — only 2 distinct hero images are reused across all 4 posts/cards, not one-per-post).

### 4.13 FAQ

- Eyebrow: "FAQ"
- H1: **"Practical answers"**
- Accordion, one open panel at a time (index-based), plus symbol rotates 45° to become a "×" when open.

**Full FAQ data (8 Q&As, literal):**
| Q | A |
|---|---|
| How long does a pack keep? | Between two and six days chilled depending on the line. The exact figure is on the spec sheet and printed on the pack, alongside the date it was washed. |
| Do you deliver outside Lagos? | Yes, on agreed days, for volumes from 200kg. Cold handling is arranged to the depot rather than to individual sites. |
| Can you cut to our own specification? | That is most of what we do. Kitchens agree a cut size once, it goes on the spec sheet, and every batch is checked against it. |
| What is your minimum order? | 20 packs for retail lines, 25kg per drop for kitchen supply, 200kg for bulk. Export starts at one pallet. |
| How do I pay? | Transfer against invoice. Standing orders are invoiced monthly; first orders are settled on delivery. |
| What happens if a pack is off-spec? | Send us the batch code. We replace the batch or credit it in full, and you do not need to return it. |
| Do you supply certification for export? | NAFDAC and NEPC registrations are held continuously. Phytosanitary certification is arranged per consignment. |
| Can I visit the facility? | Yes, by appointment, Monday to Thursday. Buyers placing standing orders are encouraged to. |

Bottom callout: "Still not answered? Message the line directly." + button **"Contact us"**.

### 4.14 Contact

- Eyebrow: "Contact"
- H1: **"Message the line."**
- Subcopy: "WhatsApp is fastest — it is the number the whole team watches. Email suits documentation and standing-order paperwork."
- Contact rows: Tap to call → `0810 542 0458`; Email → `info@kadiefresh.com`; Opening hours → `Mon–Sat, 6am–6pm`; Facility → `Ikorodu, Lagos`.
- Right column: a decorative "map" block (gradient placeholder with a pulsing orange pin — **not a real embedded map**, no lat/long/Maps API present anywhere in the prototype) + a card: "Need a price?" / "The quote form captures cut spec, volume and frequency in three steps — it gets you an answer faster than a message." + **"Request a quote"** button. There is **no actual contact form** (no name/email/message inputs) on this page — Contact is link-based only, funneling to phone/email/quote wizard.

### 4.15 Export credentials

- Dark green header. Eyebrow: "Export credentials"
- H1: **"The paperwork, before you ask for it."**
- Subcopy: "Registrations held continuously, certification arranged per consignment, and a process an importer can audit."
- Buttons: **"Download line card ↓"** and **"Become a distributor"** (→ Distributor application)

**"What we hold" table** — reuses the same 4-item certifications data as Studio → Certifications (see §7 for full CERTS table): NAFDAC facility registration, NEPC exporter registration, Phytosanitary — standing inspection, HACCP principles — internal audit. Each row shows name, issuer, ref, "Valid to {expires}", and a status pill (Valid / On request / Renewing).

**"How a consignment runs" — 4 steps (literal):**
| # | Title | Description |
|---|---|---|
| 1 | Spec agreed | Cut, pack, grade and volume signed off in writing before a run is scheduled. |
| 2 | Run and inspection | Consignment prepared and presented for quarantine inspection at the facility. |
| 3 | Documentation | Phytosanitary certificate, certificate of origin, NAFDAC and NEPC references issued with the consignment. |
| 4 | Load and photograph | Loaded consignment photographed and shared before it leaves. Nothing ships unseen. |

### 4.16 404 (Not Found)

- Large "404" numeral (pale green).
- H1: **"That page is not on the line."**
- Copy: "It may have been moved. The catalogue and the quote form are both one tap away."
- Buttons: **"Back home"**, **"See the catalogue"**.

---

## 5. Quote wizard (3 steps)

Entry points: header "Request a quote" button, hero "Request a Quote" CTA, product-detail "Request a quote for this line" (pre-fills line item), home CTA band, FAQ/Contact/Standards callouts.

**Header:** Eyebrow "Request a quote", H1 **"Tell us what your kitchen needs."**, then a 3-dot **stepper** with titles:
1. **"Who you are"**
2. **"What you need"**
3. **"Review & send"**

Stepper visuals: numbered circular dots (green when current/completed, pale green-gray when future), connecting bars fill green as steps complete, labels darken when active. Footer of the card always shows a step hint on the left (`"Step 1 of 3"`, `"Step 2 of 3"`, or `"Nothing is sent until you press below"` on step 3), a "Back" button (hidden on step 1), and the primary action button, labeled **"Continue"** (steps 1–2) or **"Send quote request"** (step 3) — becomes **"Sending…"** while submitting.

### Step 1 — Who you are
| Field | Type | Placeholder | Required | Error copy |
|---|---|---|---|---|
| Your name | text | Femi Alabi | Yes | "We need a name to put on the quote." |
| Business (optional) | text | Harbour Hotel | No | — |
| Email | text | you@company.com | Yes | "Add an email so we can send the quote." (or, if present but malformed against `^[^\s@]+@[^\s@]+\.[^\s@]+$`) "That address does not look right." |
| Phone / WhatsApp | text | 0810 542 0458 | Yes | "A phone or WhatsApp number speeds this up a lot." |
| What kind of buyer are you? | chip-select, one active | — | not enforced by validation | — |

**Buyer type options** (`buyerTypes`, default selected = "Restaurant / hotel"): Home cook · Restaurant / hotel · Wholesale distributor · Export buyer

### Step 2 — What you need
| Field | Type | Placeholder | Required | Error copy |
|---|---|---|---|---|
| Which lines? (multi-select chips of all 8 product names) | chip multi-select | — | at least 1, else error | "Pick at least one line, or describe it in the notes on the next step." |
| Estimated volume | text | e.g. 40kg per week | Yes | "Give us a rough volume so we can price it." |
| How often? | chip-select, one active, default "Weekly" | — | not enforced | — |
| Delivery location | text | Ikeja, Lagos | No | — |

**Frequency options** (`frequencies`): One-off · Weekly · Twice weekly · Monthly

**Line-item picker options:** exactly the 8 product names from §4.2 (Sliced pineapple, Chopped ugu, Prepared pepper mix, Sliced carrots, Diced watermelon, Grated coconut, Chopped onions, Sliced plantain).

### Step 3 — Review & send
- Heading: "Check it over"
- Read-only summary table (`summary`), rows: Name, Business, Email, Phone, Buyer type, Lines (comma-joined or "To be described" if empty), Volume (`"{volume} · {frequency}"`), Deliver to.
- Textarea: "Anything else we should know?" placeholder "Cut size, packaging preference, delivery window…"
- Micro-copy under textarea: "We reply within one working day. Mon–Sat, 6am–6pm."

### Validation rules (exact, from `validate()`)
- Step 1: name required (trimmed non-empty); email required + regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`; phone required (trimmed non-empty).
- Step 2: at least one line item selected; volume required (trimmed non-empty).
- Step 3: no validation — always submittable.
- On error: the offending field wrapper plays the `kfShake` animation and shows red-bordered input + red error text below it.

### Submission & confirmation
- On step-3 submit: 900ms simulated delay ("Sending…" state), then a reference number is generated as: **`'KF-' + String(1200 + enquiries.length * 7)`** (e.g., with 5 seed enquiries already in the inbox, the first live submission produces `KF-1235`). Default fallback reference shown if the confirmation screen is reached without submitting: **`KF-1200`**.
- The new entry is prepended to the Enquiries list with: `status:'New'`, `when:'Just now'`, `meta: "{buyerType} · {firstLineItem or 'custom cut'} · {location or 'Lagos'}"`, and a `body` string built as:
  ```
  Quote request {ref}
  Lines: {comma-joined items, or "described in notes"}
  Volume: {volume} · {frequency}
  Deliver to: {location or "—"}

  {notes, if any}
  ```
- **Confirmation screen** ("Sent"): pulsing green checkmark badge, H1 **"Quote request sent."**, copy: `"Reference {ref}. We will come back with pack sizes and a price within one working day."`, buttons **"Back to products"** and **"See it arrive in the studio →"** (→ Studio login, demonstrating the enquiry now sits in the inbox).

---

## 6. Distributor / wholesale application form

Route: Distributor page (reached from Export Credentials "Become a distributor" button, or footer inert anchor).

- Eyebrow: "Partner with us"
- H1: **"Become a distributor"**
- Subcopy: "We appoint a limited number of distributors per market. Tell us where you sell and what you can move, and we will come back within three working days."

**Fields (all in one panel, no multi-step):**
| Field | Type | Placeholder | Default |
|---|---|---|---|
| Company | text | Zenith Foods Ltd | "" |
| Country of operation | text | (none) | "Nigeria" |
| Monthly volume you can move | text | e.g. 4 pallets | "" |
| Markets or channels served | text | Retail chains, food service | "" |
| Anything else | textarea (4 rows) | Existing lines you carry, cold-chain capacity, target start date… | "" |

Below the fields, a required checkbox-style declaration: "I confirm the company holds the cold-chain capacity to handle prepared produce, and I accept the distributor terms." (custom checkbox, not a native `<input type=checkbox>`).

Footer: hint text "We reply within three working days." + button **"Submit application"** (→ "Sending…" while submitting).

### Validation
Client-side gate before submit fires: `company` non-empty, `volume` non-empty, and the declaration checkbox must be checked — otherwise a toast fires: **"Company, volume and the declaration are required"** (no per-field inline errors on this form, unlike the quote wizard).

### Submission behavior
900ms simulated delay, then creates an enquiry entry:
- `meta`: `"Distributor application · {country}"`
- `status`: "New", `when`: "Just now"
- `email` (synthesized, not user-entered!): `"partners@" + company.toLowerCase().replace(/[^a-z]/g,'') + ".com"` — ⚠ this is a prototype placeholder that fabricates a contact email from the company name rather than collecting a real one; **production must add a real "Your email" / "Your phone" field to this form**, since as designed the studio would have no way to actually reach the applicant.
- `phone`: `"—"` (also never actually collected — same gap)
- `body`: `"Distributor application\nMarkets: {markets or '—'}\nVolume: {volume}" + (optional "\n\n{message}")`

### Confirmation state
Green checkmark badge, H1 **"Application received"**, copy: "It is in the studio inbox now. Expect a reply within three working days, with the line card and volume pricing attached." Buttons: **"Submit another"** (resets form) and **"See it in the studio →"** (→ Studio Enquiries inbox).

---

## 7. Studio (admin) — per-section data models

General studio chrome: dark green sidebar (see §3 for nav order), content area on a light tinted wash. Every list/detail screen follows the same two-pane pattern: list/table on the left, detail/editor panel on the right with its own empty state ("Pick a … to …").

### 7.1 Login

- Split-screen layout. Left panel (dark green, gradient blob decoration): logo, H1 **"The control panel for the whole site."**, copy: "Products, enquiries, testimonials, certifications, blog and gallery — edited here, live on the site in seconds.", footer note: "Staff access only · sessions expire after 12 hours".
- Right panel: H1 **"Sign in"**, subcopy "Use the address the account was set up with.", Email field (placeholder `femi@kadiefresh.com`), Password field (masked), button **"Sign in"** (→ "Checking…" while submitting), links "Forgot password" (`#reset`, inert) and "← Back to site" (→ Products page).
- Error state copy (shown if either field is blank on submit): "Enter both your email and password to continue." (red banner, shake animation).
- Literal prototype disclaimer text rendered on the page (must NOT ship to production): "Prototype: press Sign in with anything filled, or leave blank to see the error state."
- Auth model in the prototype: **there is no real authentication** — any non-empty email+password combination succeeds after an 850ms delay and navigates to the Dashboard. No password hashing, no session, no backend call exists. Production needs real auth (e.g. NextAuth/Clerk + a real user table).

### 7.2 Dashboard

- H1: **"Good morning, Femi"** (hardcoded first name, not derived from any settings/user field — production should interpolate the logged-in user's real name and probably a time-of-day-aware greeting).
- Subcopy: "Here is how the website is doing this week."
- Status pill: **"All systems normal"**

**Stat cards (4, literal labels + seed values):**
| Label | Seed value | Delta copy | Progress bar % |
|---|---|---|---|
| WhatsApp taps | 38 | +12 on last week | 76% |
| Form enquiries | enquiries.length + 2 (seed = 7) | +2 on last week | 54% |
| Quote requests | 3 | Same as last week | 32% |
| Visitors | 412 | +64 on last week | 88% |

Each card count-up-animates from 0 to its target over ~900ms (cubic ease-out) whenever the Dashboard is navigated to.

**"Recent enquiries" panel:** top 4 enquiries (name, meta, status pill), "Open inbox →" link to full Enquiries screen.

**"Change WhatsApp number" card** (orange-bordered, stands out from the rest): copy "This is the number every WhatsApp button on your website opens.", editable text input seeded to `2348105420458`, button **"Save change"** (→ "Saving…" then toast "WhatsApp number updated across the site").

**"Needs your attention" card** — 3 static bullet lines (not dynamically computed from the actual data, see §9): "2 products missing photographs" (this one does coincidentally match the seed data — onions & plantain are seeded with 0 photos), "No certifications added yet" (⚠ inconsistent with seed data — 4 certifications exist by default), "Last blog post 41 days ago" (⚠ not computed from any real post date).

### 7.3 Enquiries inbox

- H1: **"Enquiries"**, subtitle: `"{newCount} unread · {total} total"`.
- Filter tabs: **All / New / Replied**.
- List rows: unread dot (orange if New, transparent if Replied), name, status pill, relative time, meta line below.
- **Empty state** (when filtered view has 0 rows): icon, "Nothing in this view", copy "When a buyer sends a quote request it lands here, with their contact details attached."
- Detail panel (right): name, meta + time, status pill, quick-action chips (mailto link showing the email, tel link showing the phone), full message body (`white-space:pre-line`), a **Reply** textarea (placeholder "Thanks for reaching out — here is what we can do…"), buttons **"Send reply"** (→ "Sending…", then flips status to **"Replied"**, clears the textarea, shows toast `"Reply sent to {name}"`) and **"Mark unread"** (flips status back to "New").
- No-selection empty state: "Pick an enquiry to read and reply".
- **This inbox is the single landing spot for both Quote Requests and Distributor Applications** — they are the same underlying "enquiry" data model, distinguished only by their `meta`/`body` text pattern.

**Data model fields** (`Enquiry`): `id`, `name`, `meta` (free-text summary line), `status` (`'New' | 'Replied'`), `when` (relative-time string — should become a real timestamp in production, with relative-time formatting computed at render), `email`, `phone`, `body` (free text, `\n`-separated).

**Full seed data (5 rows, literal):**
| id | name | meta | status | when | email | phone | body |
|---|---|---|---|---|---|---|---|
| 1 | Tunde Bakare | Bulk · pepper mix · Ikeja | New | 2h ago | tunde@bakarefoods.ng | 0803 221 7745 | "We run three kitchens in Ikeja and go through roughly 60kg of pepper base a week. Can you hold a standing Tuesday and Friday delivery? Need the heat mild for the hotel side." |
| 2 | Grace Okonkwo | General · storage question | Replied | Yesterday | grace.o@gmail.com | 0812 004 9911 | "How long does the chopped ugu keep once I open the pack? I buy for the family and would rather not waste it." |
| 3 | Harbour Hotel | Quote · weekly standing order | New | Yesterday | procurement@harbourhotel.ng | 0700 442 8890 | "Requesting pricing on a weekly standing order: sliced pineapple 40 packs, diced watermelon 30 packs, sliced carrots 25 packs. Delivery to Victoria Island before 7am." |
| 4 | Zenith Foods Ltd | Export · phytosanitary docs | New | 2 days ago | exports@zenithfoods.com | 0906 118 2200 | "We consolidate for a buyer in Dubai. Before we go further — can you supply phytosanitary certification and NAFDAC registration numbers with each consignment?" |
| 5 | Ada Mensah | Retail · home pack | Replied | 4 days ago | ada.mensah@outlook.com | 0705 663 1042 | "Do you deliver to Yaba on Saturdays? Interested in the 500g fruit packs." |

### 7.4 Site settings

- H1: **"Site settings"**, subcopy "Details that appear across the whole website.", button **"Save changes"** (dims to "Saved" and becomes inert once there are no unsaved edits).

**"Business details" panel — fields (label / seed value):**
| Field key | Label | Seed value |
|---|---|---|
| business | Business name | Kadie Fresh |
| tagline | Tagline | Washed, sliced, ready to cook. |
| email | Contact email | info@kadiefresh.com |
| phone | Phone / WhatsApp | 0810 542 0458 |
| address | Address | Ikorodu, Lagos |
| hours | Opening hours | Mon–Sat, 6am–6pm |
| instagram | Instagram handle | kadiefresh |
| linkedin | LinkedIn path | company/kadiefresh |

**"Search & discovery" panel:**
| Field | Seed value |
|---|---|
| Page title | Kadie Fresh — prepared fresh produce, Lagos |
| Meta description | Washed, cut and sealed within four hours. Retail packs, kitchen supply, bulk and export from Ikorodu, Lagos. |
| Google Search Console verification | (empty), placeholder `google-site-verification=…`, helper text "Pasted here, it is written into the site head automatically." |

**"Legal pages" panel** — 3 static rows with status pills (not editable in the prototype, just status display):
| Page | Status |
|---|---|
| Terms of service | Published |
| Privacy policy | Published |
| Cookie notice | Draft |

(As noted in §3, no actual Terms/Privacy/Cookie page content exists anywhere in the prototype despite these "Published" pills — a genuine content gap to fill in production.)

### 7.5 Products admin

- H1: **"Products"**, subcopy "Click a line to edit it. Hidden lines stay off the public catalogue.", button **"Add product"**.
- List rows: name, category tag, pack + MOQ line, optional warning line "⚠ No photographs" (shown when `photos === 0`) or "⚠ {n} photographs" is only shown as warning when `photoWarn` is true i.e. when photos is 0 — otherwise no warning line is rendered. Right-aligned Live/Hidden toggle pill (click to flip).
- **Seed state:** all 8 catalogue products start `live:true`; `photos:3` for every product **except** `onions` and `plantain`, which seed with `photos:0` (and therefore show the "No photographs" warning by default).
- Editor panel fields: Name, Pack, MOQ, Shelf life (3-across grid), Description (textarea), "Photographs" (2 static placeholder swatches + a "+" add-photo tile — clicking "+" just fires a toast "Photograph uploaded to this line", no real upload UI). Buttons **"Save product"** (→ "Saving…", toast "Product updated on the site") and **"Cancel"**.
- "Add product" creates a new draft row: `name:'New line'`, `cat:'Veg'`, `pack:'—'`, `moq:'20 packs'`, `shelf:'—'`, `blurb:''`, `live:false`, `photos:0`, opens it immediately in the editor, and shows toast "Draft line created — hidden until you publish it".
- No-selection empty state: "Pick a line to edit its spec and photographs".

**Data model** (`ProductAdmin`): all Product fields (id, name, cat, pack, grade, shelf, moq, storage, origin, blurb) **plus** `live: boolean` and `photos: number` (photo count used purely to drive the "missing photographs" warning — there's no real photo-array/upload model here).

### 7.6 Testimonials (moderation)

- H1: **"Testimonials"**, subtitle: `"{pendingCount} awaiting review · {liveCount} live"`.
- Cards show: live/pending status pill ("Published" green / "Pending" orange), quote text, avatar-less name+role footer, **"Delete"** button and a toggle button labeled **"Publish"**/**"Unpublish"** depending on current state.
- All 4 seeded testimonials are shown here (unlike the public page, which filters to `live:true` only).

**Data model** (`Testimonial`): `id`, `quote`, `name`, `role`, `live: boolean`.

**Full seed data (4, literal):**
| Quote | Name | Role | Live (public) by default? |
|---|---|---|---|
| "We stopped prepping vegetables in-house eleven months ago. Two kitchen staff went back to cooking, which is what we hired them for." | Ngozi Adeyemi | Executive chef, Harbour Hotel | Yes |
| "The batch code matters more than people realise. When a supplier can tell you which farm a pack came from, the conversation about quality changes completely." | Tunde Bakare | Owner, Bakare Foods | Yes |
| "They called me before the run to say the tatashe was short and asked how I wanted to handle it. Nobody else does that." | Grace Okonkwo | Caterer, Lekki | Yes |
| "Documentation was ready before we asked. That is unusual enough here that it decided the contract." | Zenith Foods Ltd | Export consolidator | **No** (pending moderation) |

### 7.7 Certifications

- H1: **"Certifications"**, subcopy "These appear on the export credentials page in the order listed.", buttons **"Preview empty state"** / **"Show populated state"** (a manual dev-only toggle — see §9, do not build this literal toggle button into production; it exists purely so the design demo could show both states on demand) and **"Upload certificate"** (adds a blank draft cert: name "New certification", issuer "Issuer", ref "—", expires "—", status "Renewing").
- Populated-state rows: small document-icon swatch, name, issuer + ref, "Expires {date}", status pill, "×" remove button.
- **Empty state** (0 certifications): icon, H2 **"No certifications added yet"**, copy "Export buyers check this first. Upload NAFDAC and NEPC registrations to switch the credentials page on.", button **"Upload the first one"**.

**Data model** (`Certification`): `id`, `name`, `issuer`, `ref`, `expires`, `status` (`'Valid' | 'On request' | 'Renewing'`).

**Full seed data (4, literal — also reused verbatim on the public Export Credentials page):**
| Name | Issuer | Ref | Expires | Status |
|---|---|---|---|---|
| NAFDAC facility registration | NAFDAC | A1-9920L | March 2027 | Valid |
| NEPC exporter registration | Nigerian Export Promotion Council | NEPC/0084221 | January 2027 | Valid |
| Phytosanitary — standing inspection | Nigeria Agricultural Quarantine Service | Per consignment | Per consignment | On request |
| HACCP principles — internal audit | Independent auditor | KF-HA-26 | September 2026 | Renewing |

### 7.8 Blog admin

- H1: **"Blog"**, subcopy "Drafts stay off the public blog until published.", button **"New post"**.
- List rows: title, category + date, status pill (Published/Draft).
- Editor fields: Title (placeholder "A working title"), Excerpt (2-row textarea), Body (9-row textarea, helper label "Body — one blank line between paragraphs" — i.e. paragraphs are stored/edited as one string joined with `\n\n` and split back into an array on save), a custom "Publish to the public blog" checkbox, buttons **"Save post"** (→ "Saving…", toast "Post saved") and **"Preview site"** (→ public Blog list).
- No-selection empty state: "Pick a post to edit, or start a new one".
- "New post" opens a blank draft (`editingPost:'new'`) with empty title/excerpt/body and `published:false`.

**Data model** (`Post`): `id`, `title`, `excerpt`, `body: string[]` (paragraphs), `cat`, `date`, `read`, `author`, `published: boolean`.

Seed publish state: posts 1–3 (`cold-chain`, `ugu`, `export-docs`) are `published:true`; post 4 (`pepper`) is `published:false` (draft). See full content in §4.12.

### 7.9 Gallery admin

- H1: **"Gallery"**, subcopy "Hidden photographs stay in the library but off the public gallery."
- Grid of tiles: a "Drop photographs" dropzone tile (dashed border, up-arrow icon, "JPG or PNG, up to 8MB", hover/drag state highlights border+bg) + one tile per gallery image (thumbnail, label, category, Hide/Show toggle button).
- Dropzone click (`addTile`) in the prototype just appends a fake tile: `label:'Untitled photograph', cat:'Facility', live:false` and shows toast "Photograph added as hidden — publish when captioned". No real file upload exists — production needs actual image upload/storage (e.g. S3/Cloudinary/Vercel Blob).

**Data model** (`GalleryImage`): `id`, `label`, `cat`, `live: boolean`.

Seed live state: first 7 of the 9 seeded gallery images are `live:true`; the last 2 (`Cold room` / Facility, `Morning dispatch` / Dispatch) are `live:false` by default — hidden from the public Gallery page until toggled on. Full list in §4.9.

---

## 8. Shared components — behavior spec

### Header (public site)
- Sticky (`position:sticky;top:0`), glass surface (see §2), z-index above page content.
- Logo mark: green radial circle with small orange dot bottom-right + wordmark "Kadie Fresh" (Bricolage Grotesque 700, `-.02em` tracking), clickable → Home.
- Desktop (≥1080px effective width): full nav + tap-to-call + orange "Request a quote" button.
- <1080px: nav and tap-to-call collapse away, only logo + "Request a quote" + burger icon (☰) remain, all `white-space:nowrap`/`flex:none` so nothing clips.
- Burger opens a full-screen dark-green drawer overlay (`kfDrawer` animation) with large nav links, WhatsApp/quote CTA, and contact line. "×" closes it.
- **Production breakpoint takeaway:** collapse to the mobile/tablet nav pattern under ~1080px viewport width; the prototype's specific `Math.min(deviceWidth, window.innerWidth-36)` calculation exists only to work around its fake device-preview frame (see §9) and should be replaced with a normal CSS media query.

### Footer
Dark green (`#0E3D22`) full-width band. 4-column responsive grid (brand + 3 link columns, see §3), bottom bar with copyright + legal links. All footer links are currently non-functional anchors in the prototype (§3) — must become real `<Link>`s.

### Floating WhatsApp widget
- `position:fixed`, bottom-right (`right:26px;bottom:26px`), z-index 66, shown on all **public** pages only (not in Studio/Login).
- Pill shape, green glass background, icon bubble with a pulsing ring (`kfPulse`, 2.4s) around a phone/chat glyph, label stack: **"Chat on WhatsApp"** + a small "Online now" line with a blipping green dot (`kfBlip`, 2s infinite).
- Link target: `https://wa.me/2348105420458?text=Hello%20Kadie%20Fresh%2C%20I%20would%20like%20to%20enquire%20about%20your%20prepared%20produce.` (opens in new tab, `target="_blank" rel="noopener"`). Decoded prefilled message: *"Hello Kadie Fresh, I would like to enquire about your prepared produce."*
- Hover: lifts `translateY(-3px)` with a deeper shadow; active: scales down slightly.

### Cookie consent bar
- Sticky to bottom of the page flow (not truly fixed — scrolls with content in the prototype), glass card, entrance via `kfToast`.
- Copy: "We use a small number of cookies to see which pages buyers read. Nothing is sold on."
- Buttons: **"Only essentials"** (decline — just dismisses) and **"Accept"** (green gradient — dismisses + shows toast "Preferences saved"). Shown by default on load (`cookies:true` initial state); no persistence (localStorage) implemented in the prototype — production should persist the choice.

### Preloader / loading screen
Sequence (from `componentDidMount`):
1. Page loads with `loading:true`, full-screen overlay (`z-index:80`) covering everything: soft white→green gradient background, centered logo mark with a pulsing ring (`kfPulse`, 1.8s) behind a solid gradient circle + small orange dot, wordmark "Kadie Fresh", and a 170px progress bar track that fills via `kfBar` over 1.25s (green→orange gradient fill).
2. At **1150ms**, `fading:true` is set, triggering the overlay's `opacity` to transition to 0 over **550ms** (`transition:opacity .55s ease`).
3. At **1750ms**, `loading:false` unmounts the overlay entirely.
Total sequence: ~1.75s from page load to fully interactive, with the visual fade completing at 1.15s+0.55s=1.7s.

### Toast notifications
- Bottom-center pill (`position:absolute` inside the page frame in the prototype — should be `position:fixed` relative to viewport in production), dark green background, small green dot + message text, entrance via `kfToast` (.34s).
- Auto-dismisses after **2400ms** (`this._t = setTimeout(...,2400)`), single toast at a time (new toast replaces old).
- Triggered by: line-card download, WhatsApp number save, settings save (well, settings save text is separate flash), product save, testimonial publish/unpublish/delete, certification add/remove, gallery add, reply sent, cookie accept, distributor-form validation failure, etc. — essentially every "successful mutation" in Studio and a few public-site actions.

### Count-up stat animation
Used for the Dashboard's 4 stat cards. On navigating to Dashboard, all 4 counters reset to 0 then animate up to their targets (`[38, enquiries.length+2, 3, 412]`) over **900ms** using `requestAnimationFrame` and a cubic ease-out (`1 - (1-k)^3`). Also fires once on initial page load's first Dashboard visit, and every subsequent re-visit (not just once-ever).

### Scroll-reveal-on-view animation
Any element tagged `data-reveal="1"` in the markup (used extensively: product cards, audience cards, service cards, standards cards, team cards, testimonial cards, gallery/export/blog content blocks, dashboard stat cards, etc.):
1. On each page navigation, all `[data-reveal]` nodes are immediately set to `opacity:0; transform:translateY(18px)` with a per-node staggered transition delay of `index * 55ms` (`opacity .5s ease {delay}, transform .55s cubic-bezier(.2,.8,.2,1) {delay}`).
2. An `IntersectionObserver` (`threshold:0.12`) watches all of them; when a node enters the viewport it's set to `opacity:1; transform:none` and unobserved.
3. **Failsafe:** after 1400ms, every remaining reveal node is forced to `opacity:1; transform:none` regardless of visibility — guarantees nothing stays permanently invisible if the observer fails to fire (e.g., very short pages, or already-in-view elements at slow layout).

### Tooltips
Custom-positioned tooltip (not native `title=`), dark-green pill, appears on hover, follows the trigger element's bounding rect (`x = center, y = top - 10`, i.e. positioned above the trigger), `kfPop` entrance (.16s), max-width 210px (or 260px for "wide" tooltips), dismissed on `onMouseLeave`.

**Full literal tooltip text inventory:**
| Trigger | Tooltip text | Wide? |
|---|---|---|
| Header nav item "Standards" | "HACCP principles, potable-water wash and batch coding" | Yes |
| Header nav item "Services" | "Retail, kitchen supply, bulk and export" | No |
| Header nav item (all others) | same as the label itself (i.e. effectively no extra info) | No |
| Tap-to-call link | "Tap to call — Mon to Sat, 6am to 6pm" | No |
| "Download line card ↓" button | "One-page PDF: every line, pack size, MOQ and shelf life" | Yes |
| Spec-sheet "i" info icon (product detail) | "Every figure here is held per batch and printed on the pack label" | Yes |
| Studio sidebar sign-out icon | "Sign out" | No |

### Page transitions
Every internal navigation (`nav(screen, extra)`) does: set `paging:true` (page content fades to `opacity:0` + `translateY(10px)` over `.2s ease` / `.3s cubic-bezier(.2,.8,.2,1)`), waits **190ms**, then swaps `screen` state, re-runs the scroll-reveal setup, and (if landing on `dash`) re-triggers the count-up, or (if landing on `home`) re-primes the hero video. No real URL change occurs (single in-memory state machine) — production must use real Next.js route transitions (e.g. via `next/navigation` + optional view-transitions API) to reproduce the fade/slide feel.

### Form field error shake
Any invalid field wrapper gets `animation:kfShake .42s ease both` plus a red (`#DC2626`) border on the input and red (`#DC2626`) helper text beneath it. Applies in the Quote wizard (name/email/phone/items/volume) and the Login form (whole-form error banner, not a per-field shake).

### Deduplicated CDN media asset inventory

**Video (Pexels):**
| URL | Used for |
|---|---|
| `https://videos.pexels.com/video-files/7456696/7456696-hd_1920_1080_30fps.mp4` | Home hero background video (muted/loop/playsinline/autoplay) |
| `https://images.pexels.com/videos/7456696/4k-agricultural-agriculture-batch-7456696.jpeg?auto=compress&cs=tinysrgb&w=1600` | Home hero `poster` (still-frame fallback for the video element) |

**Images (Unsplash), all with query string `?auto=format&fit=crop&w=900&q=72`:**
| Photo ID (URL) | Used for |
|---|---|
| `photo-1518977676601-b53f82aba655` | Sliced pineapple product image; also appears in the general Gallery pool |
| `photo-1523348837708-15d4a09cfac2` | Chopped ugu product image; **also** the `MARKET` constant used for the "Export" category blog hero/card image; also in Gallery pool |
| `photo-1441057206919-63d19fac2369` | Prepared pepper mix product image; also in Gallery pool |
| `photo-1571771894821-ce9b6c11b08e` | Sliced carrots product image; also in Gallery pool |
| `photo-1587049352846-4a222e784d38` | Diced watermelon product image; also in Gallery pool |
| `photo-1560493676-04071c5f467b` | Grated coconut product image; also in Gallery pool |
| `photo-1518843875459-f738682238a6` | Chopped onions product image; also in Gallery pool |
| `photo-1603833665858-e61d17a86224` | Sliced plantain product image; also in Gallery pool |
| `photo-1500937386664-56d1dfef3854` | The `FARM` constant — used as: fallback image for any product without a specific match, the hero/card image for every non-"Export"-category blog post, and included in the Gallery pool |

**Important caveat:** the 9 Gallery tiles (Intake grading, Wash tanks, etc.) do **not** have individually meaningful photos — they cycle through the same 9-image Unsplash pool above by index (`i % 9`), so e.g. "Intake grading" happens to render whatever the `FARM` photo is, "Cold room" renders whichever produce photo lands at that index, etc. **None of the gallery images are actually photos of intake grading, wash tanks, cold rooms, etc.** — they're all repurposed produce stock photography. Real photography (or at least topically-correct stock) should replace these before production launch. Likewise, Team member avatars, the About founder photo, and Service-detail illustration blocks are plain CSS gradient blocks (`linear-gradient(135deg,#CDEED8,#8FD3A9)`) with **no photography at all** — these need real assets.

---

## 9. Known prototype-only quirks — DO NOT PORT

The following are artifacts of the bespoke "dc" (Design Chat) templating runtime used to build this clickable prototype (`support.js`, generated from an internal `dc-runtime` package — the file header literally says `GENERATED from dc-runtime/src/*.ts — do not edit`). They exist to make a single static HTML file behave like a stateful app inside Claude's preview sandbox, and have no bearing on how a real Next.js app should be built. Flagging each so implementers don't waste time reverse-engineering or recreating them:

1. **The entire `<x-dc>` / `sc-if` / `sc-for` / `{{ expr }}` templating system.** `support.js` implements a hand-rolled expression parser (`resolve`/`resolvePath`), a control-flow walker that turns `<sc-if value="{{ cond }}">`/`<sc-for list="{{ arr }}" as="x">` custom elements into conditional/mapped React trees, and a text-interpolation pass for `{{ }}` mustache-style bindings. **None of this should be reimplemented.** In Next.js/React this is just: real conditional rendering (`{cond && <X/>}`), real `.map()`, and real JSX prop/children interpolation — the entire template compiler in `support.js` is obsolete the moment you have real React components and TypeScript.

2. **`hint-placeholder-count` / `hint-placeholder-val` attributes.** These exist purely to give the prototype's streaming/skeleton-loading system a guess at how many placeholder rows or which boolean branch to render before the real data arrives (used for the shimmering skeleton effect during the design tool's own live-editing/streaming). They are meaningless in a normal SSR/CSR Next.js app with real data — do not port; use real loading states (`Suspense`/skeletons) if desired, but design them independently.

3. **`class Component extends DCLogic { state = {...}; renderVals() {...} }`.** This is the prototype's makeshift "component" pattern: one giant class holding *all* state for the *entire* multi-page app (public site + studio) and one `renderVals()` method that computes a flat object of hundreds of pre-formatted values, inline style strings, and closures, which the template then binds against. This is not an architecture to replicate — in Next.js this should be decomposed into real page components, real route-based code-splitting, a real global store or React Query/server components for data, and component-local state instead of one monolithic state bag.

4. **Inline CSS built as JS string concatenation** (`chip()`, `cta()`, `field()`, `pill()`, `tag()` helper methods that return CSS-text strings, and hundreds of literal `style="…"` attributes throughout the markup). This was necessary because the prototype template engine has no CSS-class/module system. Production should use real CSS (Tailwind, CSS Modules, styled-components, vanilla-extract, whatever the team prefers) with the *design tokens* extracted in §2 — not string-built inline styles.

5. **`style-hover="…"` / `style-active="…"` custom attributes.** The runtime turns these into dynamically-injected `:hover`/`:active` CSS rules via a generated `<style>` sheet with auto-generated class names (`createPseudoSheet` in `support.js`), because inline `style=` cannot express pseudo-classes. This is a workaround for the templating engine's lack of a stylesheet — use real CSS `:hover`/`:active` selectors (or Tailwind's `hover:`/`active:` variants) in production.

6. **The top demo/QA bar ("Kadie Fresh · vertical slice" + route chips + device chips) and the whole "device-frame" preview mechanism.** The literal outermost markup renders a fixed dark bar with buttons for every single screen name (`routeChips`) plus Desktop/Tablet/Mobile toggle buttons (`deviceChips`), and wraps the *entire app* in a fake "frame" div sized to a hardcoded pixel width (1280/834/390) with rounded corners and a drop shadow, simulating a device viewport inside the browser tab. **None of this is real product UI** — it's scaffolding so a designer could click through every screen and preview 3 device widths without a real URL bar or real responsive browser resizing. Do not build a "device chip" switcher or a "route chip" debug bar into the shipped site.

7. **The header's nav-collapse math (`Math.min(deviceWidth, window.innerWidth - 36) < 1080`) and the `winW` state kept via a manual `window.addEventListener('resize', …)`.** This exists only because the fake device-frame (see #6) decouples "the width the page thinks it is" from "the actual browser viewport," so the prototype had to manually reconcile the two with JS. A real responsive site has no such split — just use a plain CSS media query at the ~1080px breakpoint (see §2/§8) and drop all of this JS.

8. **`componentDidMount`-driven video priming (`primeVideo()`), the `data-hero="1"` selector-based video lookup, and the commented history in the chat transcript about `muted`/`playsInline`/`loop` needing to be set as DOM **properties** rather than HTML attributes, and the `play()` promise needing to be manually caught.** This entire dance (`document.querySelector('video[data-hero]')`, `v.muted = true; v.defaultMuted = true;`, catching the rejected `play()` promise, an `error` listener toggling a `videoFailed` state) is a workaround for the specific templating runtime's inability to bind media-element event handlers or boolean attributes declaratively. In real React/Next.js, `<video muted autoPlay loop playsInline poster={...} onError={...}>` works natively — none of the manual DOM-priming choreography is needed. Just keep the *behavior* (silent autoplay, loop, graceful fallback to the gradient/poster on error) — not the mechanism.

9. **The dead `componentDidUpdate` lifecycle hook** mentioned in the chat transcript (deleted during the build because "the runtime passes no prevState, so it throws on every commit") — a symptom of the custom runtime's non-standard lifecycle contract. Irrelevant to React/Next.js, which has correct lifecycle semantics (or hooks) out of the box.

10. **`ResizeObserver`-avoidance.** The chat transcript documents that a `ref`-based `ResizeObserver` approach was tried and abandoned because "the template `ref` attribute never reaches React" in this runtime, forcing a fallback to `window.innerWidth` math instead. This is purely a limitation of the bespoke template compiler's attribute handling — real React `ref`s and `ResizeObserver` work fine and should be used normally if any runtime element-measurement is ever needed in production.

11. **No real backend, no persistence, no real auth, anywhere.** Every "save," "publish," "submit," "sign in," and "reply" action in the prototype is a `setTimeout`-simulated delay (700–900ms) that mutates in-memory React state and shows a toast — nothing is persisted, there is no API layer, no database, no file storage, and "sign in" accepts any non-empty credentials. **This is the single most important thing to not port as-is**: production needs a real database (products, enquiries, testimonials, certifications, posts, gallery images, site settings), real file/image upload & storage, a real auth system protecting `/studio/*`, and real email/WhatsApp integration for notifications — none of which exists in the prototype beyond its UI shell.

12. **The Certifications "Preview empty state" / "Show populated state" toggle button** (§7.7) is a demo-only affordance so a reviewer could see both states without needing zero real certifications. In production, the empty state should simply render automatically whenever the certifications table has zero rows — there should be no manual toggle button in the shipped Studio UI.

13. **Client-only, in-memory "screens" instead of real URLs.** The entire app is one HTML page with a `screen: string` state field switched via `nav()`; there is no real routing, no deep-linkable URLs, no browser back/forward support, and no server rendering. Section 3 already gives a suggested real Next.js route map — treat the prototype's `screen` names only as an inventory of *what pages must exist*, not as a routing implementation to mirror.

14. **Duplicate/roundabout `<head>` handling via a custom `<helmet>`/`<sc-helmet>` tag** (`support.js`'s `createHelmetManager`) that rewrites `<helmet>` into `<sc-helmet>` and manages injecting favicon/meta/font-preconnect/style tags into the real document `<head>` at runtime. This is purely how the prototype's runtime simulates page-level `<head>` control inside its single-file sandbox. In Next.js, use the App Router's `metadata`/`generateMetadata` exports (or `next/head` if on Pages Router) — do not build a custom helmet-rewriting mechanism.

15. **The mobile drawer's "Enquire on WhatsApp" button actually calls `goQuote()`** (navigates to the internal quote wizard), not a WhatsApp deep link — a label/action mismatch worth a deliberate product decision in production rather than a silent carry-over.

16. **Footer links, and the `goFaq`/`goReviews`/`goGallery` handlers being unused**, are prototype incompleteness rather than intentional IA — see §3's callouts. Don't assume the missing wiring was a deliberate design choice to hide those pages; it reads as build-order leftovers (the pages were added in a later pass per the chat transcript and never got linked in).

17. **Dashboard's "Needs your attention" bullet list is static copy, not computed from live data** (§7.2) — "No certifications added yet" contradicts the seeded 4 certifications, and "Last blog post 41 days ago" isn't derived from any real post date. Production should compute these three signals for real (missing product photos, zero certifications, days since last published post) rather than hardcode display strings.

18. **`kfSpin` keyframe is defined in the stylesheet but never used** anywhere in the markup — there is no wired-up loading spinner in the prototype. If production wants a spinner treatment, it needs to be designed fresh (the keyframe itself — a plain 360° rotation — is trivial to recreate if wanted).

---

## Summary of content coverage

Every public page and every Studio section named in the brief has real, literal content in the prototype and is captured above in full. The only genuine content gaps found (i.e., referenced/implied but not actually authored anywhere in the prototype) are:

- **Terms of Service** and **Privacy Policy** page copy (only linked as inert footer anchors + a "Published" status pill in Studio settings — no body copy exists).
- **Cookie notice** page copy (status shown as "Draft" in Studio settings; no page exists at all, not even a stub).
- A **"Forgot password" / reset-password flow** on the Studio login screen (link present, `#reset`, but no destination page or flow was built).
- Real photography for the Gallery, Team avatars, About founder photo, and Service-detail illustration — all are currently gradient placeholders or (for Gallery) repurposed produce stock photos with mismatched captions (§8).
- A real embedded map on the Contact page (only a decorative gradient block with a static pin glyph exists — no Maps API/lat-long anywhere in the source).
- Real "your email / your phone" fields on the Distributor Application form — the prototype fabricates a fake contact email from the company name instead of collecting one (§6).

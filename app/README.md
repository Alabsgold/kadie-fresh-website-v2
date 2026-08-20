# Kadie Fresh

The Kadie Fresh marketing site and Studio admin panel: Next.js 16 (App Router, Turbopack),
Tailwind CSS v4, TypeScript, and Prisma ORM 7 on Postgres.

`../DESIGN_SPEC.md` is the full content/design specification this app was built from —
read it before making content or visual changes.

## Prerequisites

- Node.js 20.9+
- A Postgres database

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env` and point `DATABASE_URL` at your Postgres instance (a local example is already
   filled in). Also set `SESSION_SECRET` to a real random value in any non-local environment —
   it signs the Studio login session cookie.

3. Run migrations and seed the database (products, blog posts, testimonials, certifications,
   gallery, sample enquiries, site settings, and a Studio admin user):

   ```bash
   npx prisma migrate deploy   # or `npx prisma migrate dev` in local development
   npx prisma db seed
   ```

   The seed reads `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` from `.env` (defaults to
   `femi@kadiefreshh.com` / `KadieFresh2026!`) to create the first Studio login — **change this
   password in production**.

4. Start the app:

   ```bash
   npm run dev     # development
   # or
   npm run build && npm start   # production
   ```

   Public site: [http://localhost:3000](http://localhost:3000)
   Studio admin: [http://localhost:3000/studio/login](http://localhost:3000/studio/login)

## Project structure

- `src/app/(public)/*` — public marketing site, wrapped by `(public)/layout.tsx` (header,
  footer, WhatsApp widget, cookie bar, preloader).
- `src/app/studio/login` + `src/app/studio/(protected)/*` — Studio admin, gated by
  `studio/(protected)/layout.tsx` reading the session cookie set in `src/lib/auth.ts`.
- `src/app/actions/*` — Server Actions (form submissions + Studio CRUD mutations).
- `src/app/api/*` — Route Handlers: `line-card` (generates the downloadable PDF), `upload`
  (Studio image uploads to `public/uploads/`).
- `src/lib/data/*` — the Prisma data-access layer; import these from Server Components/Actions
  only (files are marked `server-only`).
- `src/content/*` — static copy with no Studio CRUD section (services, standards, team/founder,
  FAQ, home page copy, nav structure).
- `prisma/schema.prisma` / `prisma/seed.ts` — data model and seed data.

## Notes

- Product/gallery photography and the home hero video are hotlinked from Pexels/Unsplash CDNs
  (see `src/lib/images.ts`) rather than self-hosted, per the source design's asset strategy.
- Studio-uploaded gallery images are stored on local disk under `public/uploads/` via
  `POST /api/upload` — for a multi-instance/serverless deployment, swap this for object storage
  (S3, Vercel Blob, etc.).

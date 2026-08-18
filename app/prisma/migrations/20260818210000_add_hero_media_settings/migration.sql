-- Additive only: safe to apply to the live database. The running app keeps
-- selecting the columns it knows about; new columns get their defaults.
ALTER TABLE "SiteSettings"
  ADD COLUMN "heroVideoUrl" TEXT NOT NULL DEFAULT '/hero-video.mp4',
  ADD COLUMN "heroPosterUrl" TEXT NOT NULL DEFAULT '';

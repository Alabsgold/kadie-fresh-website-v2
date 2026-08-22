-- Additive only: safe to apply to the live database.
ALTER TABLE "Certification"
  ADD COLUMN "fileUrl" TEXT;

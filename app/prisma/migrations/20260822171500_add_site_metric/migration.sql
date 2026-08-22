-- Additive only: safe to apply to the live database.
CREATE TABLE "SiteMetric" (
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteMetric_pkey" PRIMARY KEY ("key")
);

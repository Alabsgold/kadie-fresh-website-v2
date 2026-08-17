-- CreateEnum
CREATE TYPE "EnquiryType" AS ENUM ('QUOTE', 'DISTRIBUTOR');

-- CreateEnum
CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'REPLIED', 'CLOSED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pack" TEXT NOT NULL,
    "moq" TEXT NOT NULL,
    "shelfLife" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "heroImageUrl" TEXT NOT NULL,
    "thumbImageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "spec" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "photoWarning" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "kicker" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "turnaround" TEXT NOT NULL,
    "minimum" TEXT NOT NULL,
    "bullets" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "imageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photoUrl" TEXT,
    "isFounder" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT,
    "authorCompany" TEXT,
    "quote" TEXT NOT NULL,
    "photoUrl" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "issuedOn" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "coverImageUrl" TEXT,
    "author" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "type" "EnquiryType" NOT NULL,
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "name" TEXT NOT NULL,
    "business" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "buyerType" TEXT,
    "items" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "volume" TEXT,
    "frequency" TEXT,
    "location" TEXT,
    "notes" TEXT,
    "details" JSONB,
    "replyMessage" TEXT,
    "repliedAt" TIMESTAMP(3),
    "repliedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "businessName" TEXT NOT NULL DEFAULT 'Kadie Fresh',
    "phone" TEXT NOT NULL DEFAULT '0810 542 0458',
    "whatsappNumber" TEXT NOT NULL DEFAULT '2348105420458',
    "email" TEXT NOT NULL DEFAULT 'hello@kadiefresh.com',
    "address" TEXT NOT NULL DEFAULT 'Ikorodu, Lagos',
    "hours" TEXT NOT NULL DEFAULT 'Mon–Sat 6am–6pm',
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "twitterUrl" TEXT,
    "linkedinUrl" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "googleSearchConsoleId" TEXT,
    "guaranteeStatement" TEXT,
    "cookieConsentCopy" TEXT,
    "termsContent" TEXT,
    "privacyContent" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Enquiry_reference_key" ON "Enquiry"("reference");

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_repliedById_fkey" FOREIGN KEY ("repliedById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

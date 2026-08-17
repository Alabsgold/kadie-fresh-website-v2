/*
  Warnings:

  - You are about to drop the column `description` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `issuedOn` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `GalleryImage` table. All the data in the column will be lost.
  - You are about to drop the column `photoWarning` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `spec` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `facebookUrl` on the `SiteSettings` table. All the data in the column will be lost.
  - You are about to drop the column `instagramUrl` on the `SiteSettings` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `SiteSettings` table. All the data in the column will be lost.
  - You are about to drop the column `twitterUrl` on the `SiteSettings` table. All the data in the column will be lost.
  - You are about to drop the column `authorCompany` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readTime` to the `BlogPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ref` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `GalleryImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `GalleryImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storage` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookieNoticeContent` to the `SiteSettings` table without a default value. This is not possible if the table is not empty.
  - Made the column `seoTitle` on table `SiteSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seoDescription` on table `SiteSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `guaranteeStatement` on table `SiteSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cookieConsentCopy` on table `SiteSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `termsContent` on table `SiteSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `privacyContent` on table `SiteSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorRole` on table `Testimonial` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CertificationStatus" AS ENUM ('VALID', 'ON_REQUEST', 'RENEWING');

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "readTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "issuedOn",
ADD COLUMN     "expires" TEXT NOT NULL,
ADD COLUMN     "ref" TEXT NOT NULL,
ADD COLUMN     "status" "CertificationStatus" NOT NULL DEFAULT 'RENEWING';

-- AlterTable
ALTER TABLE "GalleryImage" DROP COLUMN "caption",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "photoWarning",
DROP COLUMN "spec",
ADD COLUMN     "grade" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL,
ADD COLUMN     "storage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SiteSettings" DROP COLUMN "facebookUrl",
DROP COLUMN "instagramUrl",
DROP COLUMN "linkedinUrl",
DROP COLUMN "twitterUrl",
ADD COLUMN     "cookieNoticeContent" TEXT NOT NULL,
ADD COLUMN     "instagramHandle" TEXT NOT NULL DEFAULT 'kadiefresh',
ADD COLUMN     "linkedinPath" TEXT NOT NULL DEFAULT 'company/kadiefresh',
ADD COLUMN     "tagline" TEXT NOT NULL DEFAULT 'Washed, sliced, ready to cook.',
ALTER COLUMN "email" SET DEFAULT 'info@kadiefresh.com',
ALTER COLUMN "seoTitle" SET NOT NULL,
ALTER COLUMN "seoTitle" SET DEFAULT 'Kadie Fresh — prepared fresh produce, Lagos',
ALTER COLUMN "seoDescription" SET NOT NULL,
ALTER COLUMN "seoDescription" SET DEFAULT 'Washed, cut and sealed within four hours. Retail packs, kitchen supply, bulk and export from Ikorodu, Lagos.',
ALTER COLUMN "guaranteeStatement" SET NOT NULL,
ALTER COLUMN "guaranteeStatement" SET DEFAULT 'If a pack arrives off-spec or past its seal window, we replace the batch or credit it in full. No return required — send the batch code.',
ALTER COLUMN "cookieConsentCopy" SET NOT NULL,
ALTER COLUMN "cookieConsentCopy" SET DEFAULT 'We use a small number of cookies to see which pages buyers read. Nothing is sold on.',
ALTER COLUMN "termsContent" SET NOT NULL,
ALTER COLUMN "privacyContent" SET NOT NULL;

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "authorCompany",
DROP COLUMN "featured",
ALTER COLUMN "authorRole" SET NOT NULL;

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "TeamMember";

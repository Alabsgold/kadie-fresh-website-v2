/*
  Warnings:

  - Added the required column `meta` to the `Enquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "EnquiryType" ADD VALUE 'GENERAL';

-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN     "meta" TEXT NOT NULL;

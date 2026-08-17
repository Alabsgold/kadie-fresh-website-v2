"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { replyToEnquiry, markEnquiryUnread } from "@/lib/data/enquiries";

export async function sendReply(enquiryId: string, message: string) {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  const enquiry = await replyToEnquiry(enquiryId, message, session.sub);
  revalidatePath("/studio/enquiries");
  revalidatePath("/studio");
  return enquiry;
}

export async function markUnread(enquiryId: string) {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  const enquiry = await markEnquiryUnread(enquiryId);
  revalidatePath("/studio/enquiries");
  revalidatePath("/studio");
  return enquiry;
}

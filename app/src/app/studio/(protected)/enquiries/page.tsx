import type { Metadata } from "next";
import { listEnquiries, enquiryBody } from "@/lib/data/enquiries";
import { EnquiriesInbox } from "@/components/studio/EnquiriesInbox";

export const metadata: Metadata = { title: "Enquiries" };

export default async function StudioEnquiriesPage() {
  const enquiries = await listEnquiries("all");
  const withBody = enquiries.map((e) => ({ ...e, body: enquiryBody(e) }));
  return <EnquiriesInbox initialEnquiries={withBody} />;
}

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { countNewEnquiries } from "@/lib/data/enquiries";
import { Sidebar } from "@/components/studio/Sidebar";

export default async function StudioProtectedLayout({ children }: LayoutProps<"/">) {
  const session = await getSession();
  if (!session) redirect("/studio/login");

  const newEnquiryCount = await countNewEnquiries();

  return (
    <div className="flex min-h-screen bg-[radial-gradient(52%_40%_at_78%_0%,#E7F6EC_0%,transparent_62%),linear-gradient(180deg,#FAFDFB,#F1F7F3)]">
      <Sidebar name={session.name} newEnquiryCount={newEnquiryCount} />
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}

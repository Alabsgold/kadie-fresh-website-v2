import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DistributorForm } from "@/components/distributor/DistributorForm";

export const metadata: Metadata = {
  title: "Become a distributor",
  description:
    "We appoint a limited number of distributors per market. Tell us where you sell and what you can move, and we will come back within three working days.",
};

export default function DistributorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partner with us"
        title="Become a distributor"
        subcopy="We appoint a limited number of distributors per market. Tell us where you sell and what you can move, and we will come back within three working days."
      />
      <DistributorForm />
    </>
  );
}

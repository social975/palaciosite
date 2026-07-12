import PagePlaceholder from "@/components/PagePlaceholder";

export default function PortalInvoicesPage() {
  return (
    <PagePlaceholder
      title="Invoices"
      phase={4}
      description="Stripe-backed billing history, invoice management, and plan changes."
      bullets={["Billing history","Invoice downloads","Upgrade / downgrade / cancel"]}
    />
  );
}

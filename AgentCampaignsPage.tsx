import PagePlaceholder from "@/components/PagePlaceholder";

export default function AgentCampaignsPage() {
  return (
    <PagePlaceholder
      title="Campaign Management"
      phase={2}
      description="Create, edit, approve, pause, and launch campaigns across every client."
      bullets={["Campaign creation & editing","Approve / pause / launch controls","Cross-client performance"]}
    />
  );
}

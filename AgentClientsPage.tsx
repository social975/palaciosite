import PagePlaceholder from "@/components/PagePlaceholder";

export default function AgentClientsPage() {
  return (
    <PagePlaceholder
      title="Client Management"
      phase={2}
      description="Search, view, and manage every client account, plan, and permission level."
      bullets={["Client search & directory","Account & permission management"]}
    />
  );
}

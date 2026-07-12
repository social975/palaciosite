import PagePlaceholder from "@/components/PagePlaceholder";

export default function AgentNotesPage() {
  return (
    <PagePlaceholder
      title="Internal Notes"
      phase={2}
      description="Internal notes attached to clients and projects — never visible to clients."
      bullets={["Client-linked notes","Project-linked notes"]}
    />
  );
}

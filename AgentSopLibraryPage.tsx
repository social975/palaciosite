import PagePlaceholder from "@/components/PagePlaceholder";

export default function AgentSopLibraryPage() {
  return (
    <PagePlaceholder
      title="SOP Library"
      phase={2}
      description="Standard operating procedures for every Palacio service line."
      bullets={["Audit SOPs","Build SOPs","Membership execution SOPs"]}
    />
  );
}

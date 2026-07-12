import PagePlaceholder from "@/components/PagePlaceholder";

export default function AgentUsersPage() {
  return (
    <PagePlaceholder
      title="User Management"
      phase={2}
      description="Manage internal team accounts and role-based permissions."
      bullets={["Team accounts","Role-based access control"]}
    />
  );
}

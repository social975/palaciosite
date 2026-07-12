import PagePlaceholder from "@/components/PagePlaceholder";

export default function AgentTasksPage() {
  return (
    <PagePlaceholder
      title="Task Assignment"
      phase={2}
      description="Assign and route tasks across the internal team."
      bullets={["Task routing","Priority assignment"]}
    />
  );
}

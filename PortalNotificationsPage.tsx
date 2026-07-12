import PagePlaceholder from "@/components/PagePlaceholder";

export default function PortalNotificationsPage() {
  return (
    <PagePlaceholder
      title="Notifications"
      phase={2}
      description="Approval requests, campaign updates, and system notifications."
      bullets={["Approval request alerts","Campaign update notifications"]}
    />
  );
}

import PagePlaceholder from "@/components/PagePlaceholder";

export default function PortalSettingsPage() {
  return (
    <PagePlaceholder
      title="Account Settings"
      phase={2}
      description="Profile, notification preferences, and account security."
      bullets={["Profile details","Notification preferences","Security settings"]}
    />
  );
}

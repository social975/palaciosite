import PagePlaceholder from "@/components/PagePlaceholder";

export default function PortalAnalyticsPage() {
  return (
    <PagePlaceholder
      title="Analytics"
      phase={2}
      description="Traffic, leads, revenue, engagement, conversion rate, campaign performance, ROAS, CAC, and LTV."
      bullets={["Traffic & leads","Revenue & ROAS","Conversion rate, CAC, LTV"]}
    />
  );
}

import PagePlaceholder from "@/components/PagePlaceholder";

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="About"
      phase={2}
      description="Founder story, mission, vision, and why Palacio exists."
      bullets={["Founder story","Mission & vision","Team"]}
    />
  );
}
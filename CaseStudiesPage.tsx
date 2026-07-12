import PagePlaceholder from "@/components/PagePlaceholder";

export default function CaseStudiesPage() {
  return (
    <PagePlaceholder
      title="Case Studies"
      phase={2}
      description="Client engagements documented like consulting case studies, filterable by industry, service, and company size."
      bullets={["Covet & Mane — luxury hair extensions","Sitting Pretty — wellness","Filters: industry / service / size"]}
    />
  );
}

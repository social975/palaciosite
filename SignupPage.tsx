import PagePlaceholder from "@/components/PagePlaceholder";

export default function SignupPage() {
  return (
    <PagePlaceholder
      title="Create Account"
      phase={3}
      description="Account creation, tied to the client intake flow."
      bullets={["Account creation","Links to the multi-step intake survey"]}
    />
  );
}

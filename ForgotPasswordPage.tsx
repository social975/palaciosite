import PagePlaceholder from "@/components/PagePlaceholder";

export default function ForgotPasswordPage() {
  return (
    <PagePlaceholder
      title="Reset Password"
      phase={3}
      description="Supabase password reset flow."
      bullets={["Reset email request","New password confirmation"]}
    />
  );
}

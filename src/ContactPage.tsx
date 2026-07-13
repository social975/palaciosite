import { useState, type FormEvent } from "react";
import { ExternalLink } from "lucide-react";

const INTAKE_URL = "https://majestic-trifle-e269a4.netlify.app";
const OPERATOR_INBOX = "hello@palaciostudio.com";

export default function ContactPage() {
  const [form, setForm] = useState({ brand: "", email: "", category: "", bottleneck: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: OPERATOR_INBOX,
          subject: `New inquiry: ${form.brand || "Unnamed brand"}`,
          message: `Brand: ${form.brand}\nEmail: ${form.email}\nCategory: ${form.category}\nBiggest bottleneck: ${form.bottleneck}`,
          type: "contact_inquiry",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong sending that."
      );
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-2 text-xs font-bold tracking-[0.16em] text-brown uppercase">Contact</div>
      <h1 className="font-display text-3xl text-wine">Tell us about your brand.</h1>
      <p className="mt-3 max-w-xl text-[15px] text-ink-soft">
        A short qualifying form, so the first call already has context. We respond within one
        business day.
      </p>

      <div className="card mt-10 grid gap-10 p-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl text-wine">Prefer the full intake form?</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Our multi-step onboarding survey covers company info, current channels, goals, and
            desired deliverables in one pass.
          </p>
          <a href={INTAKE_URL} target="_blank" rel="noreferrer" className="btn-primary mt-5 inline-flex">
            Start Full Onboarding <ExternalLink size={14} />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            required
            placeholder="Brand name"
            value={form.brand}
            onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
            className="rounded border border-line bg-beige px-4 py-2.5 text-sm outline-none focus:border-cornflower"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="rounded border border-line bg-beige px-4 py-2.5 text-sm outline-none focus:border-cornflower"
          />
          <input
            placeholder="Category (beauty, fashion, wellness, creator)"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="rounded border border-line bg-beige px-4 py-2.5 text-sm outline-none focus:border-cornflower"
          />
          <textarea
            placeholder="Biggest bottleneck right now"
            value={form.bottleneck}
            onChange={(e) => setForm((f) => ({ ...f, bottleneck: e.target.value }))}
            rows={3}
            className="rounded border border-line bg-beige px-4 py-2.5 text-sm outline-none focus:border-cornflower"
          />

          <button type="submit" disabled={status === "sending"} className="btn-secondary mt-1">
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent — thank you" : "Submit Application"}
          </button>

          {status === "sent" && (
            <p className="text-xs text-[#3F6B44]">
              Delivered via Resend. We'll follow up within one business day.
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-wine">
              {errorMessage}
              {errorMessage?.includes("RESEND_API_KEY") ? "" : " — check the Resend function logs in Netlify."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
import { Link } from "react-router";
import { CheckCircle2 } from "lucide-react";

const PHASES = [
  { n: 1, label: "Architecture + folder structure", done: true },
  { n: 2, label: "Frontend pages/components", done: false },
  { n: 3, label: "Supabase backend", done: false },
  { n: 4, label: "Stripe + Resend", done: false },
  { n: 5, label: "Netlify deployment files", done: false },
  { n: 6, label: "Final repository audit", done: false },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <span className="mb-4 inline-flex rounded-full bg-cornflower-soft px-3 py-1 text-xs font-bold text-cornflower-deep">
        Phase 1 scaffold — live
      </span>
      <h1 className="font-display text-4xl leading-tight text-wine">
        Build a marketing department without hiring one.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        This is the real Vite + React 19 + TypeScript + Tailwind v4 toolchain running — routing,
        layouts, protected routes, and brand tokens are all wired up. Every other page in the
        sitemap is reachable from the nav and shows what ships in which phase.
      </p>
      <div className="mt-10 grid gap-3 text-left">
        {PHASES.map((p) => (
          <div
            key={p.n}
            className="card flex items-center justify-between px-5 py-3.5"
          >
            <span className="text-sm font-medium text-ink">
              Phase {p.n} — {p.label}
            </span>
            {p.done ? (
              <CheckCircle2 size={18} className="text-cornflower" />
            ) : (
              <span className="text-xs font-semibold text-muted">Pending</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center gap-3">
        <Link to="/services" className="btn-secondary">
          Browse the sitemap
        </Link>
        <Link to="/portal" className="btn-primary">
          Preview Client Portal
        </Link>
      </div>
    </div>
  );
}

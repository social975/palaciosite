import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Automation {
  name: string;
  status: "Live" | "In progress";
  progress: number;
  summary: string;
  whyItMatters: string;
}

const AUTOMATIONS: Automation[] = [
  {
    name: "Welcome email flow",
    status: "Live",
    progress: 100,
    summary: "Sends a 3-part welcome sequence the moment someone joins the list.",
    whyItMatters: "First impressions convert — brands that automate this see meaningfully higher early engagement than a single welcome email.",
  },
  {
    name: "Abandoned cart sequence",
    status: "Live",
    progress: 100,
    summary: "Follows up automatically when a cart is left without checkout.",
    whyItMatters: "Recovers revenue that would otherwise require someone to notice and follow up manually.",
  },
  {
    name: "Influencer outreach queue",
    status: "In progress",
    progress: 60,
    summary: "Routes new creator applications through scoring, briefing, and contract steps.",
    whyItMatters: "Keeps outreach moving even when no one on the team is actively watching the inbox.",
  },
  {
    name: "Content approval routing",
    status: "Live",
    progress: 100,
    summary: "Sends drafted content to the right approver and tracks sign-off.",
    whyItMatters: "Removes the 'who approves this' bottleneck that stalls most in-house content calendars.",
  },
];

function AutomationRow({ a }: { a: Automation }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">{a.name}</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                a.status === "Live" ? "bg-[#E4EDE3] text-[#3F6B44]" : "bg-cornflower-soft text-cornflower-deep"
              }`}
            >
              {a.status}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-limestone">
            <div className="h-full rounded-full bg-cornflower" style={{ width: `${a.progress}%` }} />
          </div>
        </div>
        <ChevronDown size={16} className={`shrink-0 text-brown transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-line px-5 py-4">
          <p className="text-sm text-ink-soft">{a.summary}</p>
          <p className="mt-2 text-xs text-muted">
            <span className="font-semibold text-brown">Why it matters: </span>
            {a.whyItMatters}
          </p>
        </div>
      )}
    </div>
  );
}

export default function PortalMarketingOSPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl text-wine">Marketing OS</h1>
        <p className="text-xs text-muted">Live workflow &amp; automation health</p>
      </div>
      <div className="grid gap-3">
        {AUTOMATIONS.map((a) => (
          <AutomationRow key={a.name} a={a} />
        ))}
      </div>
    </div>
  );
}

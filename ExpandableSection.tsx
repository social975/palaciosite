import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableSectionProps {
  label: string;
  value: string;
  /** Plain-language summary of what this number means. */
  summary: string;
  /** Why this data point matters — shown alongside the summary when expanded. */
  whyItMatters: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function ExpandableSection({
  label,
  value,
  summary,
  whyItMatters,
  icon,
  children,
  defaultOpen = false,
}: ExpandableSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-limestone text-wine">
            {icon}
          </span>
          <div>
            <div className="text-xs font-bold tracking-wide text-muted uppercase">{label}</div>
            <div className="font-display text-2xl text-ink">{value}</div>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-brown transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-line px-5 py-4">
          <p className="text-sm text-ink-soft">{summary}</p>
          <p className="mt-2 text-xs text-muted">
            <span className="font-semibold text-brown">Why it matters: </span>
            {whyItMatters}
          </p>
          <div className="mt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

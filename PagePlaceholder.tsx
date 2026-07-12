interface PagePlaceholderProps {
  title: string;
  phase: number;
  description: string;
  bullets?: string[];
}

/**
 * Phase 1 ships the full route map and layout shells for every page in the spec,
 * but not every page's real content yet — that's Phase 2 (frontend pages/components)
 * onward. This component stands in for a not-yet-built page so navigation, layouts,
 * and protected routes can all be demonstrated and clicked through today.
 */
export default function PagePlaceholder({
  title,
  phase,
  description,
  bullets,
}: PagePlaceholderProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="badge-blue mb-4 inline-flex rounded-full bg-cornflower-soft px-3 py-1 text-xs font-bold text-cornflower-deep">
        Ships in Phase {phase}
      </span>
      <h1 className="font-display text-3xl text-wine">{title}</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{description}</p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-6 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-ink-soft">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cornflower" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

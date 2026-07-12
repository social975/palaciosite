import { GraduationCap, Download } from "lucide-react";

const COURSES = [
  { name: "AI Marketing Foundations", level: "Beginner", lessons: 4 },
  { name: "Prompt Engineering", level: "Beginner", lessons: 5 },
  { name: "Marketing Automation", level: "Intermediate", lessons: 6 },
  { name: "AI Operations Management", level: "Intermediate", lessons: 4 },
  { name: "Client Success Systems", level: "Advanced", lessons: 5 },
  { name: "Palacio Certification", level: "Advanced", lessons: 8 },
];

export default function PressPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-2 text-xs font-bold tracking-[0.16em] text-brown uppercase">
        Palacio Press
      </div>
      <h1 className="font-display text-3xl text-wine">The education division.</h1>
      <p className="mt-3 max-w-xl text-[15px] text-ink-soft">
        A textbook and a training academy for teams who want to run marketing operations
        themselves.
      </p>

      <div className="card mt-10 grid gap-8 p-8 md:grid-cols-3 md:items-center">
        <div className="md:col-span-2">
          <span className="inline-flex rounded-full bg-wine-soft px-3 py-1 text-xs font-bold text-wine">
            Textbook
          </span>
          <h2 className="mt-3 font-display text-2xl text-wine">The AI Marketing OS Textbook</h2>
          <p className="mt-2 text-sm text-ink-soft">
            The full Palacio methodology in one volume — audit frameworks, automation design, and
            the documentation standard used for every client handoff. Available in EPUB and PDF.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="btn-primary" disabled>
            <Download size={15} /> Buy PDF — $49
          </button>
          <button className="btn-secondary" disabled>
            <Download size={15} /> Buy EPUB — $49
          </button>
          <p className="text-xs text-muted">Checkout wires up in Phase 4 (Stripe).</p>
        </div>
      </div>

      <h2 className="mt-14 mb-6 font-display text-2xl text-wine">Training Academy</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {COURSES.map((c) => (
          <div key={c.name} className="card p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-limestone text-wine">
                <GraduationCap size={18} />
              </span>
              <span className="rounded-full bg-cornflower-soft px-2.5 py-1 text-xs font-bold text-cornflower-deep">
                {c.level}
              </span>
            </div>
            <h3 className="font-display text-lg text-wine">{c.name}</h3>
            <p className="mt-1 text-xs text-muted">{c.lessons} lessons · Certificate on completion</p>
            <button className="btn-secondary mt-4 text-xs" disabled>
              Enroll (Phase 4)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

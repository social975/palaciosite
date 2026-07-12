import { useState } from "react";
import { LayoutDashboard, Clock, ListChecks, ChevronRight, Check, X } from "lucide-react";
import ExpandableSection from "@/components/ExpandableSection";
import { MOCK_PROJECTS, MOCK_TASKS } from "@/lib/mock-data";
import type { Task, TaskStatus } from "@/types";

const STATUS_LABEL: Record<TaskStatus, string> = {
  pending_approval: "Awaiting approval",
  in_progress: "In progress",
  completed: "Completed",
  rejected: "Rejected",
};

const STATUS_TONE: Record<TaskStatus, string> = {
  pending_approval: "bg-cornflower-soft text-cornflower-deep",
  in_progress: "bg-cornflower-soft text-cornflower-deep",
  completed: "bg-[#E4EDE3] text-[#3F6B44]",
  rejected: "bg-wine-soft text-wine",
};

const ASSIGNEE_LABEL = {
  ai: "AI · Execution Engine",
  client: "Client",
  palacio: "Palacio Studio",
};

function ProjectDetail({ project }: { project: (typeof MOCK_PROJECTS)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line py-3 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <div className="text-sm font-semibold text-ink">{project.name}</div>
          <div className="text-xs text-muted">{project.clientName}</div>
        </div>
        <ChevronRight
          size={16}
          className={`text-brown transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-3 rounded border border-line bg-beige p-4">
          <p className="text-xs text-ink-soft">
            <span className="font-semibold text-brown">Needs: </span>
            {project.needs}
          </p>
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-brown">Project audit OS</span>
              <span className="text-muted">{project.auditProgress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-limestone">
              <div
                className="h-full rounded-full bg-cornflower"
                style={{ width: `${project.auditProgress}%` }}
              />
            </div>
            <ul className="mt-3 space-y-1.5">
              {project.auditSteps.map((step) => (
                <li key={step.label} className="flex items-center gap-2 text-xs">
                  {step.done ? (
                    <Check size={13} className="text-cornflower" />
                  ) : (
                    <span className="h-3 w-3 rounded-full border border-muted" />
                  )}
                  <span className={step.done ? "text-ink-soft" : "text-muted"}>{step.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);
  const showHistory = task.status === "completed" || task.status === "rejected";
  return (
    <div className="border-b border-line py-3 last:border-0">
      <button
        onClick={() => showHistory && setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-3 text-left ${
          showHistory ? "" : "cursor-default"
        }`}
      >
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-ink">{task.title}</div>
          <div className="text-xs text-muted">
            {task.clientName} · {ASSIGNEE_LABEL[task.assignee.type]}
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_TONE[task.status]}`}
        >
          {STATUS_LABEL[task.status]}
        </span>
      </button>
      {open && showHistory && (
        <div className="mt-2 rounded border border-line bg-beige p-3">
          <div className="mb-1 text-xs font-semibold text-brown">Documentation & audit trail</div>
          <ul className="space-y-1">
            {task.history.map((h) => (
              <li key={h.timestamp} className="text-xs text-ink-soft">
                <span className="text-muted">
                  {new Date(h.timestamp).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>{" "}
                — {h.event}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function PortalDashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  function decide(taskId: string, decision: "completed" | "rejected") {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: decision,
              history: [
                ...t.history,
                {
                  timestamp: new Date().toISOString(),
                  event: decision === "completed" ? "Approved" : "Rejected",
                },
              ],
            }
          : t
      )
    );
  }

  const pending = tasks.filter((t) => t.status === "pending_approval");

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl text-wine">Overview</h1>
        <p className="text-xs text-muted">Covet &amp; Mane · Membership</p>
      </div>

      <div className="mb-3 rounded border border-cornflower-soft bg-cornflower-soft/40 px-4 py-2 text-xs text-cornflower-deep">
        Approvals here update this screen live, but nothing is saved to a database yet — that
        connects once Supabase (Phase 3) is wired in.
      </div>

      <div className="grid gap-4">
        <ExpandableSection
          label="Active Projects"
          value={String(MOCK_PROJECTS.length)}
          summary="Every engagement currently being audited, built, or run for a client."
          whyItMatters="This is the fastest way to see what's in flight and what each project is blocked on, without opening each client's file individually."
          icon={<LayoutDashboard size={16} />}
          defaultOpen
        >
          {MOCK_PROJECTS.map((p) => (
            <ProjectDetail key={p.id} project={p} />
          ))}
        </ExpandableSection>

        <ExpandableSection
          label="Awaiting Approval"
          value={String(pending.length)}
          summary="AI-drafted work and client-requested items that need a yes/no before they move forward."
          whyItMatters="Nothing the Execution Engine drafts goes live without a human — client or Palacio — signing off first."
          icon={<Clock size={16} />}
        >
          {pending.length === 0 && (
            <p className="text-xs text-muted">Nothing waiting on approval right now.</p>
          )}
          {pending.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-0"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-ink">{t.title}</div>
                <div className="text-xs text-muted">
                  {t.clientName} · {ASSIGNEE_LABEL[t.assignee.type]}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => decide(t.id, "completed")}
                  className="flex h-8 w-8 items-center justify-center rounded bg-[#E4EDE3] text-[#3F6B44]"
                  aria-label="Approve"
                >
                  <Check size={15} />
                </button>
                <button
                  onClick={() => decide(t.id, "rejected")}
                  className="flex h-8 w-8 items-center justify-center rounded bg-wine-soft text-wine"
                  aria-label="Reject"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          ))}
        </ExpandableSection>

        <ExpandableSection
          label="Total Tasks"
          value={String(tasks.length)}
          summary="Every task across every client, whoever it's assigned to."
          whyItMatters="Assignee shows who's actually responsible — the Execution Engine, a specific client, or Palacio — so nothing stalls from unclear ownership."
          icon={<ListChecks size={16} />}
        >
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </ExpandableSection>
      </div>
    </div>
  );
}

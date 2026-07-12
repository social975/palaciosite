import type { Project, Task } from "@/types";

/**
 * TEMPORARY MOCK DATA.
 * Every shape here matches what the real Supabase tables will hold (see
 * supabase/README.md), so swapping this file's contents for real
 * `supabase.from(...).select()` calls in Phase 3 shouldn't require touching
 * any component that consumes it.
 */

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj_covet_build",
    name: "Marketing OS Build",
    clientName: "Covet & Mane",
    status: "in_progress",
    needs: "Final sign-off on the influencer outreach automation before it goes live.",
    auditProgress: 80,
    auditSteps: [
      { label: "Channel & content audit", done: true },
      { label: "Workflow design", done: true },
      { label: "Automation build", done: true },
      { label: "Client sign-off", done: false },
      { label: "Documented handoff", done: false },
    ],
  },
  {
    id: "proj_sitting_membership",
    name: "Studio Membership — Month 2",
    clientName: "Sitting Pretty",
    status: "on_track",
    needs: "Nothing right now — next report is due in 4 days.",
    auditProgress: 100,
    auditSteps: [
      { label: "Content calendar", done: true },
      { label: "Approval lane", done: true },
      { label: "Monthly report", done: true },
    ],
  },
  {
    id: "proj_marlowe_audit",
    name: "Marketing OS Audit",
    clientName: "Marlowe & Finch",
    status: "needs_input",
    needs: "Waiting on ad account access to finish the paid-channel section of the audit.",
    auditProgress: 45,
    auditSteps: [
      { label: "Kickoff call", done: true },
      { label: "Channel access granted", done: false },
      { label: "10-point audit", done: false },
      { label: "Findings summary", done: false },
    ],
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: "task_1",
    title: "Approve autumn restock email sequence",
    assignee: { type: "ai", name: "Execution Engine" },
    status: "pending_approval",
    clientName: "Covet & Mane",
    history: [{ timestamp: "2026-07-10T14:20:00Z", event: "Drafted by Execution Engine" }],
  },
  {
    id: "task_2",
    title: "Review influencer outreach batch #2",
    assignee: { type: "ai", name: "Execution Engine" },
    status: "pending_approval",
    clientName: "Sitting Pretty",
    history: [{ timestamp: "2026-07-11T09:05:00Z", event: "Queued for review" }],
  },
  {
    id: "task_3",
    title: "Confirm ad account access",
    assignee: { type: "client", name: "Marlowe & Finch" },
    status: "pending_approval",
    clientName: "Marlowe & Finch",
    history: [{ timestamp: "2026-07-09T11:00:00Z", event: "Requested from client" }],
  },
  {
    id: "task_4",
    title: "Publish May performance report",
    assignee: { type: "palacio", name: "Palacio Studio" },
    status: "completed",
    clientName: "Covet & Mane",
    history: [
      { timestamp: "2026-06-28T10:00:00Z", event: "Report drafted" },
      { timestamp: "2026-06-30T16:40:00Z", event: "Reviewed and sent to client" },
      { timestamp: "2026-06-30T16:41:00Z", event: "Marked complete" },
    ],
  },
  {
    id: "task_5",
    title: "Set up welcome email flow",
    assignee: { type: "ai", name: "Execution Engine" },
    status: "completed",
    clientName: "Lumen Studio",
    history: [
      { timestamp: "2026-06-20T08:00:00Z", event: "Automation generated" },
      { timestamp: "2026-06-21T13:00:00Z", event: "Approved by Palacio Studio" },
      { timestamp: "2026-06-21T13:02:00Z", event: "Deployed live" },
    ],
  },
  {
    id: "task_6",
    title: "Increase creator outreach cadence",
    assignee: { type: "ai", name: "Execution Engine" },
    status: "rejected",
    clientName: "Sitting Pretty",
    history: [
      { timestamp: "2026-06-15T09:00:00Z", event: "Recommendation generated" },
      { timestamp: "2026-06-15T17:30:00Z", event: "Rejected — budget constraints this quarter" },
    ],
  },
];

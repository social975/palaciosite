export type ServiceTier = "audit" | "build" | "membership";

export interface Client {
  id: string;
  name: string;
  sector: string;
  plan: ServiceTier | "enterprise";
  healthStatus: "on_track" | "needs_input" | "at_risk";
}

export interface Campaign {
  id: string;
  name: string;
  clientId: string;
  channel: string;
  status: "draft" | "live" | "paused" | "completed";
}

export type AssigneeType = "ai" | "client" | "palacio";

export interface Assignee {
  type: AssigneeType;
  /** Display name — the client's name if type is "client", "Palacio Studio" if type is "palacio". */
  name: string;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  status: "in_progress" | "on_track" | "needs_input";
  /** What this project still needs from the client or from Palacio to move forward. */
  needs: string;
  /** 0-100 progress against this project's own audit/build checklist. */
  auditProgress: number;
  auditSteps: { label: string; done: boolean }[];
}

export type TaskStatus = "pending_approval" | "in_progress" | "completed" | "rejected";

export interface Task {
  id: string;
  title: string;
  assignee: Assignee;
  status: TaskStatus;
  clientName: string;
  /** Populated once status is "completed" or "rejected" — the audit trail. */
  history: { timestamp: string; event: string }[];
}


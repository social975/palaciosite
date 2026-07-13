import {
  Users,
  Megaphone,
  UserCog,
  ListChecks,
  BarChart3,
  StickyNote,
  BookOpen,
  Library,
  Sparkles,
} from "lucide-react";
import DashboardShell, { type DashboardNavItem } from "@/components/DashboardShell";

const AGENT_NAV: DashboardNavItem[] = [
  { to: "/agent", label: "Client Management", icon: Users, end: true },
  { to: "/agent/campaigns", label: "Campaign Management", icon: Megaphone },
  { to: "/agent/users", label: "User Management", icon: UserCog },
  { to: "/agent/tasks", label: "Task Assignment", icon: ListChecks },
  { to: "/agent/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/agent/notes", label: "Internal Notes", icon: StickyNote },
  { to: "/agent/sop-library", label: "SOP Library", icon: BookOpen },
  { to: "/agent/knowledge-base", label: "Knowledge Base", icon: Library },
  { to: "/agent/ai-executive", label: "AI Executive Console", icon: Sparkles },
];

export default function AgentLayout() {
  return <DashboardShell navItems={AGENT_NAV} sectionLabel="Palacio Agent · Internal" />;
}
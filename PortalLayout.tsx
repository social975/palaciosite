import {
  LayoutDashboard,
  Workflow,
  Bot,
  BarChart3,
  FolderOpen,
  Megaphone,
  Receipt,
  Bell,
  Settings,
} from "lucide-react";
import DashboardShell, { type DashboardNavItem } from "@/components/DashboardShell";

const PORTAL_NAV: DashboardNavItem[] = [
  { to: "/portal", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/portal/marketing-os", label: "Marketing OS", icon: Workflow },
  { to: "/portal/execution-engine", label: "Execution Engine", icon: Bot },
  { to: "/portal/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/portal/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/portal/deliverables", label: "Deliverables", icon: FolderOpen },
  { to: "/portal/invoices", label: "Invoices", icon: Receipt },
  { to: "/portal/notifications", label: "Notifications", icon: Bell },
  { to: "/portal/settings", label: "Account Settings", icon: Settings },
];

export default function PortalLayout() {
  return <DashboardShell navItems={PORTAL_NAV} sectionLabel="Client Portal" />;
}

import { NavLink, Outlet, Link } from "react-router";
import type { LucideIcon } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export interface DashboardNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

interface DashboardShellProps {
  navItems: DashboardNavItem[];
  sectionLabel: string;
}

export default function DashboardShell({ navItems, sectionLabel }: DashboardShellProps) {
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <div className="flex min-h-screen bg-beige">
      <aside className="flex w-64 shrink-0 flex-col bg-wine-deep">
        <div className="flex h-16 items-center gap-2.5 px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-white font-display text-wine">
            P
          </span>
          <span className="font-display text-lg text-white">Palacio</span>
        </div>
        <div className="px-6 pb-3 text-[11px] font-bold tracking-[0.13em] text-wine-soft/70 uppercase">
          {sectionLabel}
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-white text-wine" : "text-white/80 hover:bg-white/10"
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <button
            onClick={signOut}
            className="text-xs font-medium text-white/60 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <div className="flex h-16 items-center justify-between border-b border-line px-8">
          <Link to="/" className="text-xs font-medium text-brown hover:text-wine">
            ← Back to marketing site
          </Link>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
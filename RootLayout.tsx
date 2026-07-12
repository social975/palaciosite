import { Link, NavLink, Outlet } from "react-router";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/palacio-run", label: "Palacio Run" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/press", label: "Palacio Press" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-[3px] w-full bg-wine" />
      <header className="sticky top-0 z-40 border-b border-line bg-beige/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-wine font-display text-white">
              P
            </span>
            <span className="font-display text-lg text-wine">Palacio</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? "text-wine" : "text-ink-soft hover:text-wine"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden text-sm font-medium text-ink-soft sm:inline">
              Sign in
            </Link>
            <Link to="/book-a-call" className="btn-primary">
              Book a Consultation
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted">
          © {new Date().getFullYear()} Palacio Studio. Marketing operations, built to run without
          us.
        </div>
      </footer>
    </div>
  );
}

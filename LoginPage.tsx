import { useState, type FormEvent } from "react";
import { useNavigate, useLocation, Link, type Location } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * TEMPORARY GATE — not real authentication.
 *
 * There's exactly one hardcoded operator credential right now because there's
 * no Supabase project with real client accounts yet (that's Phase 3). This
 * check runs entirely in the browser, which means:
 *   - It offers no real protection against anyone who opens dev tools and
 *     reads the bundled JS.
 *   - It cannot tell two different clients apart, so it must not be used to
 *     gate real client data.
 * Treat it as a soft "not open to the public yet" deterrent, not a security
 * boundary. Real per-client access control arrives with Supabase + RLS.
 */
const OPERATOR_LOGIN = "hello.palaciostudio.com";
const OPERATOR_PASSWORD = "StudioPalacio";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (identifier.trim() === OPERATOR_LOGIN && password === OPERATOR_PASSWORD) {
      setSession("operator-temp-id", "admin");
      const redirectTo =
        (location.state as { from?: Location } | null)?.from?.pathname ?? "/agent";
      navigate(redirectTo, { replace: true });
      return;
    }

    setError(
      "No account matches that yet — real client sign-in ships with Supabase auth in Phase 3."
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-wine">Sign in</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Client Portal and Palacio Agent both live behind this one sign-in.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-brown">Email or login</label>
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full rounded border border-line bg-beige px-4 py-2.5 text-sm outline-none focus:border-cornflower"
            placeholder="you@yourbrand.com"
            autoComplete="username"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-brown">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-line bg-beige px-4 py-2.5 text-sm outline-none focus:border-cornflower"
            autoComplete="current-password"
          />
        </div>

        {error && <p className="text-xs text-wine">{error}</p>}

        <button type="submit" className="btn-primary mt-2 w-full">
          Sign in
        </button>
      </form>

      <div className="mt-5 flex justify-between text-xs text-muted">
        <Link to="/forgot-password" className="hover:text-wine">
          Forgot password?
        </Link>
        <Link to="/signup" className="hover:text-wine">
          Apply as a client
        </Link>
      </div>
    </div>
  );
}

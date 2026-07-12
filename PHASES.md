# Build Phases

Tracking doc for the Palacio Studio platform rebuild. Updated as each phase ships.

| Phase | Scope | Status |
|---|---|---|
| 1 | Architecture + folder structure | ✅ Done |
| 2 | Frontend pages/components | 🟡 In progress — Dashboard, Marketing OS, Contact, Login, Press, Execution Engine are real; the rest are labeled placeholders |
| 3 | Supabase backend (auth, schema, RLS) | ⬜ Not started |
| 4 | Stripe + Resend | 🟡 Resend sending is wired (`send-email.mts`); Stripe not started |
| 5 | Netlify deployment files | 🟡 Base `netlify.toml` + 3 real functions (`health`, `send-email`, `ai-agent`) |
| 6 | Final repository audit | ⬜ Not started |

## Since Phase 1

- Removed the floating section-switcher pattern entirely — it doesn't exist in this
  app (it was only ever in the earlier static-HTML version). Portal and Agent are
  reached exclusively through `/login`, never linked from the public nav or footer.
- One shared operator credential (`hello.palaciostudio.com` / `StudioPalacio`) gates
  `/portal` and `/agent` for now. **This is not real security** — it's a client-side
  check, readable by anyone who opens dev tools. It exists only because there are no
  real client accounts yet. Real per-client access control is still Phase 3.
- Corner radius reduced sitewide (buttons ~4px, cards ~6px) for a sharper, less
  "soft lifestyle brand" look.
- Portal Dashboard's Active Projects / Awaiting Approval / Total Tasks are now real,
  interactive, expandable components — backed by `src/lib/mock-data.ts`, clearly
  labeled as temporary. Approve/reject actually updates the screen live; it does not
  persist anywhere yet (no database exists until Phase 3).
- Marketing OS automations are now expandable, each with a plain-language summary
  and a "why it matters" explanation.
- `netlify/functions/send-email.mts` calls the real Resend API. The Contact page's
  form actually calls it. Needs `RESEND_API_KEY` (and a verified sending domain) in
  Netlify's environment variables to actually send.
- `netlify/functions/ai-agent.mts` calls OpenAI (explicitly not Anthropic/Claude, per
  request) and powers the Execution Engine chat for real. It's structured to pull
  real context from Supabase once Phase 3 exists — right now it's told plainly that
  no live data is connected, and instructed not to invent specifics. Needs
  `OPENAI_API_KEY` to respond at all.

## What "done" means for Phase 1

- `npm install && npm run dev` boots a real app — not a mockup — with working
  client-side routing, protected-route redirects, and the full brand design
  system (Tailwind v4 `@theme` tokens matching the static site).
- Every page named across the spec has a real file and a real route. Pages not
  yet built show a labeled placeholder stating which phase implements them,
  rather than 404ing or silently missing from the nav.
- One real, deployable Netlify Function (`health.mts`) proves the Functions
  wiring end-to-end. The other six (`chat`, `intake`, `campaign`, `analytics`,
  `billing`, the Stripe/Resend webhooks) are Phase 4/5, once there are real
  Supabase/Stripe/Resend credentials for them to call.
- No fake data layer: the Supabase client, auth store, and protected routes
  are wired to real (empty) state rather than hardcoded mock "logged in"
  behavior, so Phase 3 is a drop-in of real logic, not a rewrite.

## What Phase 1 deliberately does not include

- Tailwind's legacy `tailwind.config.js` / `postcss.config.js` — Tailwind v4's
  Vite plugin doesn't use them; the design system lives in `src/index.css`.
- `package-lock.json` — generate this yourself with the first `npm install`,
  since it wasn't possible to run that command in the environment this was
  built in (see root README for why).
- Real Supabase/Stripe/Resend accounts — those need your credentials, not code.

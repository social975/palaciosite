# Palacio Studio

Marketing operations platform for founder-led brands — public site, client portal,
and internal Palacio Agent console, built as one Vite + React 19 + TypeScript app.

This is **Phase 1 of 6**: architecture, folder structure, and a fully routable,
fully styled scaffold. See `docs/PHASES.md` for the full plan and what ships in
each phase.

## Before you run this

**I could not run `npm install` while building this** — the sandbox this was
generated in has no network access to the npm registry, so nothing here has
been installed or executed by me. Everything is written against verified
current APIs (checked via web search while building, not just training
knowledge), but you will be the first one to actually install and run it.
If something doesn't compile, that's real, useful information — please tell me
and I'll fix it.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL. You should see a real homepage with working
navigation — not a static mockup. Click into `/services`, `/portal`, `/agent`,
etc. Pages not yet built (most of them — that's Phase 2+) show a labeled
placeholder rather than a 404.

```bash
npm run build      # production build to dist/
npm run lint        # ESLint 9 flat config
npm run typecheck    # tsc -b --noEmit
```

## Stack notes (things that changed since late 2025)

- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/index.css`.
  There's no `tailwind.config.js` or `postcss.config.js` on purpose; v4's
  `@tailwindcss/vite` plugin doesn't use them. If you specifically need v3's
  JS config for a legacy reason, say so and I'll switch it.
- **React Router v8** — `react-router-dom` no longer exists as a package.
  DOM-specific APIs (`RouterProvider`) import from `react-router/dom`;
  everything else (`createBrowserRouter`, `Link`, `useNavigate`, ...) imports
  from `react-router`. Routing here uses Data Mode (`createBrowserRouter`).
- **Netlify Functions** use the current default-export `(req: Request, context)
  => Response` signature in `.mts` files, not the older `exports.handler`
  Lambda-style signature. See `netlify/functions/health.mts`.
- **TypeScript 5.8+** — `tsconfig.app.json` enables `erasableSyntaxOnly` +
  `verbatimModuleSyntax`, which keeps the codebase compatible with running
  `.ts` files directly under Node's native type-stripping if you ever want to.

## What's real vs. what's scaffolded

| Piece | State |
|---|---|
| Routing, layouts, protected-route redirects | Real, working |
| Design system (`@theme` tokens, `.btn`/`.card` components) | Real, sharpened corners per latest feedback |
| Sign-in (`/login`) | Real for one operator credential (see below) — not real multi-user auth |
| Portal Dashboard (Active Projects / Awaiting Approval / Total Tasks) | Real, interactive, expandable — backed by clearly-labeled mock data, not a database |
| Marketing OS automations | Real, expandable, with "why it matters" explanations |
| Contact page | Real — actually sends via Resend through `netlify/functions/send-email.mts` |
| Execution Engine chat | Real — actually calls OpenAI through `netlify/functions/ai-agent.mts` |
| Zustand auth store | Real shape, no real session until Phase 3 |
| Supabase client (`src/lib/supabase.ts`) | Real client instantiation, warns instead of crashing with no env vars set |
| All other pages (Services, Pricing, Case Studies, Signup, the rest of Agent) | Labeled placeholders — see the badge on each page for which phase implements it |

### The one hardcoded login

`hello.palaciostudio.com` / `StudioPalacio` signs in as the operator (admin) and lands
in `/agent`. This is a client-side string comparison — **not security**. It doesn't
protect real client data (there isn't any yet) and it can't tell one client from
another. Treat it as a "not open to the public" gate, not a login system. Real
per-client accounts arrive with Supabase auth in Phase 3.

### Credentials this phase actually needs to do something

- `OPENAI_API_KEY` — powers the Execution Engine chat. Without it, that page's
  requests fail with a clear error rather than a fake reply.
- `RESEND_API_KEY` + a verified sending domain — powers the Contact form. Without
  it, submissions fail with a clear error rather than silently doing nothing.

Both are safe to leave empty while developing; you'll just see the real error
messages instead of a working feature.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values as each phase needs
them. The app boots fine with all of them empty — you'll just see console
warnings instead of crashes.

## Deploying to Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- Add every variable from `.env.example` in Site settings → Environment
  variables before you rely on anything past Phase 1.

## Folder structure

```
src/
  components/   shared UI (PagePlaceholder, ProtectedRoute, DashboardShell)
  layouts/      RootLayout, AuthLayout, PortalLayout, AgentLayout
  pages/        one file per route
  routes/       central router config
  store/        Zustand stores
  lib/          low-level client setup (Supabase, later Stripe)
  hooks/ services/ types/ utils/ assets/ contexts/ features/   (empty, Phase 2+)
netlify/functions/   Netlify Functions (one example today)
supabase/            migrations + RLS (Phase 3)
docs/PHASES.md       the living build-phase tracker
```

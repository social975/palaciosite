import type { Context } from "@netlify/functions";

/**
 * Health check — proves the netlify/functions wiring end-to-end once deployed.
 * Visit /.netlify/functions/health (or /api/health once the redirect in
 * netlify.toml is in place) to confirm.
 *
 * Real functions (chat, intake, campaign, analytics, billing, and the Stripe/
 * Resend webhooks) land in Phase 4/5 once Supabase, Stripe, and Resend
 * credentials exist to wire them to.
 */
export default async (req: Request, context: Context): Promise<Response> => {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      status: "ok",
      service: "palacio-studio",
      region: context.geo?.country?.name ?? "unknown",
      timestamp: new Date().toISOString(),
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

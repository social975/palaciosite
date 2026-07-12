import type { Context } from "@netlify/functions";
import { Resend } from "resend";

interface SendEmailBody {
  to: string;
  subject: string;
  /** Plain-language body — kept simple on purpose; swap in a real template component per email type in Phase 4. */
  message: string;
  /** Which template this logically is, for your own tracking — not yet used to pick real HTML templates. */
  type?: "contact_inquiry" | "welcome" | "intake_confirmation" | "invoice_paid" | "password_reset";
}

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "Palacio Studio <hello@palaciostudio.com>";

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "RESEND_API_KEY is not set in this environment's variables. Add it in Netlify → Site settings → Environment variables, then redeploy.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: SendEmailBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Body must be valid JSON." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!body.to || !body.subject || !body.message) {
    return new Response(
      JSON.stringify({ error: "Fields required: to, subject, message." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: body.to,
      subject: body.subject,
      html: `<div style="font-family: Georgia, serif; color:#2B241F; line-height:1.6;">
        <p style="white-space: pre-wrap;">${escapeHtml(body.message)}</p>
        <p style="color:#9A8F80; font-size:12px; margin-top:24px;">Palacio Studio</p>
      </div>`,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ id: data?.id, status: "sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error sending email." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

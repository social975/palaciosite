import type { Context } from "@netlify/functions";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AgentRequestBody {
  messages: ChatMessage[];
  /** Which surface is calling this — lets one function serve both the client-facing
   * Execution Engine and the internal AI Executive Console with different framing. */
  surface?: "execution_engine" | "ai_executive";
}

const OPENAI_MODEL = "gpt-4o-mini";

/**
 * Explicitly OpenAI, not Anthropic — Palacio doesn't want this feature running
 * on Claude. Swap the model/provider here if that changes; the rest of the
 * function (context assembly, request handling) doesn't care which provider
 * answers as long as it speaks the OpenAI-compatible chat completions shape.
 */
async function callOpenAI(messages: ChatMessage[], systemPrompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it in Netlify → Site settings → Environment variables."
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${errBody}`);
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;
  if (!reply) throw new Error("OpenAI returned no message content.");
  return reply;
}

/**
 * TODO (Phase 3): replace this with a real Supabase query — pull the
 * signed-in client's active projects, recent tasks, and relevant SOP library
 * entries, and fold them into the system prompt below. Until Supabase has
 * real data, the honest thing to do is tell the model (and the user) that
 * clearly, rather than let it improvise specifics that sound plausible but
 * aren't real.
 */
async function assembleContext(_surface: string): Promise<string> {
  return (
    "No live Palacio data is connected yet (Supabase backend is Phase 3). " +
    "Do not invent specific numbers, client names, or task statuses. If asked " +
    "something that requires real account data, say plainly that live data " +
    "isn't connected yet, rather than guessing."
  );
}

export default async (req: Request, _context: Context): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: AgentRequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Body must be valid JSON." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response(JSON.stringify({ error: "Field required: messages (non-empty array)." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const surface = body.surface ?? "execution_engine";
  const liveContext = await assembleContext(surface);

  const roleFraming =
    surface === "ai_executive"
      ? "You are the Palacio AI Executive — an internal command-center assistant for the Palacio Studio team (not clients)."
      : "You are the Palacio Execution Engine — a client-facing assistant that helps a founder-led brand understand the status of their marketing operation.";

  const systemPrompt = `${roleFraming} Speak calmly, precisely, and without hype or AI buzzwords — Palacio's voice is 70% executive assistant, 20% strategic consultant, 10% luxury hospitality. ${liveContext}`;

  try {
    const reply = await callOpenAI(body.messages, systemPrompt);
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown agent error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

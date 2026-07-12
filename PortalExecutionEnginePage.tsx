import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const INITIAL: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "I'm the Execution Engine. Live Palacio data isn't connected yet (that's Phase 3), so I won't invent specifics about your account — but ask me anything else and I'll do my best.",
  },
];

export default function PortalExecutionEnginePage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/ai-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, surface: "execution_engine" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't reach the Execution Engine. Check the function logs in Netlify."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-xl text-wine">Execution Engine</h1>
        <p className="text-xs text-muted">
          Real OpenAI-backed function — needs OPENAI_API_KEY set in Netlify to respond.
        </p>
      </div>

      <div className="card flex h-[520px] max-w-2xl flex-col">
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user" ? "bg-cornflower text-white" : "bg-limestone text-ink"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="max-w-[78%] rounded-2xl bg-limestone px-4 py-2.5 text-sm text-muted">
                Thinking…
              </div>
            </div>
          )}
        </div>
        {error && <div className="border-t border-line px-5 py-2 text-xs text-wine">{error}</div>}
        <div className="flex gap-2 border-t border-line p-3.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about a campaign, report, or deliverable…"
            className="flex-1 rounded border border-line px-4 py-2.5 text-sm outline-none focus:border-cornflower"
          />
          <button
            onClick={send}
            disabled={sending}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-wine text-white disabled:opacity-50"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

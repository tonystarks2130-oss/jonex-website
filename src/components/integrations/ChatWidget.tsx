"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MessageSquare, X, Send, Smile } from "lucide-react";
import { CHAT_ENDPOINT, CHAT_FALLBACK_EMAIL } from "@/lib/integrations";

/**
 * Verbatim wire port of the live n8n chat widget (was index.html lines
 * 696-880). The HTTP behavior is the contract and is preserved exactly:
 *   POST CHAT_ENDPOINT, body { message, history: history.slice(-10) },
 *   roles "user"/"assistant", same fallback copy.
 * Bot replies go through stripMarkdown, then renderBotNodes turns URL matches
 * into real <a> React elements (http(s) allowlisted via new URL()) while the
 * rest renders as plain text — React escapes everything, so there is no HTML
 * string and no dangerouslySetInnerHTML (fixes the original site's attribute-
 * breakout XSS). User input renders as plain text. Per the emoji ruling: the picker
 * stays (user utility); JoNeX-authored greeting/teaser copy is emoji-free.
 */

type Msg = { role: "user" | "assistant"; text: string };

const EMOJIS = ["😊", "😄", "😍", "👍", "🙏", "🔥", "✅", "🎉", "🚀", "👀", "🤝", "💯"];

const TEASERS = [
  "Curious how AI can help your business?",
  "Save hours — automate your workflows.",
  "What would you automate first?",
  "Never miss a lead again.",
  "Your business, running 24/7 on autopilot.",
];

function stripMarkdown(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, ""))
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/—/g, ",")
    .replace(/--/g, ",");
}

const URL_RE = /(https?:\/\/[^\s]+|(?:www\.|cal\.com\/)[^\s]+)/g;

/**
 * Render a bot reply as React nodes — links become real <a> elements so React
 * escapes the href/text (no HTML-string interpolation, no dangerouslySetInnerHTML).
 * Only http(s) URLs become links (new URL() protocol allowlist); anything else
 * renders as plain text. This replaces the original site's escapeHtml+linkify,
 * which left quotes unescaped and allowed attribute-breakout XSS.
 */
function renderBotNodes(raw: string): ReactNode[] {
  const clean = stripMarkdown(raw);
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  URL_RE.lastIndex = 0;
  while ((m = URL_RE.exec(clean)) !== null) {
    if (m.index > last) nodes.push(clean.slice(last, m.index));
    const matched = m[0];
    const display = matched.replace(/[.,!?)]+$/, "");
    const trailing = matched.slice(display.length);
    const raw_href = display.startsWith("http") ? display : "https://" + display;
    let safe = false;
    try {
      const u = new URL(raw_href);
      safe = u.protocol === "http:" || u.protocol === "https:";
    } catch {
      safe = false;
    }
    if (safe) {
      nodes.push(
        <a
          key={key++}
          href={raw_href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-accent break-all"
        >
          {display}
        </a>,
      );
    } else {
      nodes.push(display);
    }
    if (trailing) nodes.push(trailing);
    last = m.index + matched.length;
  }
  if (last < clean.length) nodes.push(clean.slice(last));
  return nodes;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [teaser, setTeaser] = useState<string | null>(null);

  const greeted = useRef(false);
  const historyRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, open]);

  // Teaser bubble rotation — interval with full cleanup (Strict-Mode safe).
  useEffect(() => {
    if (open) {
      setTeaser(null);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      setTeaser(TEASERS[i % TEASERS.length]);
      i++;
      window.setTimeout(() => setTeaser(null), 4000);
    }, 9000);
    return () => window.clearInterval(id);
  }, [open]);

  function pushGreetingOnce() {
    if (greeted.current) return;
    greeted.current = true;
    const text =
      "Hi! I'm JoNeX AI. Ask me about our services, pricing, or how to book a call. How can I help?";
    setMessages((m) => [...m, { role: "assistant", text }]);
  }

  function openChat() {
    setOpen(true);
    setTeaser(null);
    pushGreetingOnce();
    window.setTimeout(() => inputRef.current?.focus(), 50);
  }

  const sendMsg = useCallback(async () => {
    const text = draft.trim();
    if (!text || sending) return;
    setDraft("");
    setShowEmoji(false);
    setMessages((m) => [...m, { role: "user", text }]);
    historyRef.current.push({ role: "user", content: text });
    setSending(true);
    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyRef.current.slice(-10),
        }),
      });
      const data = await res.json();
      const reply =
        data && data.reply
          ? (data.reply as string)
          : `Sorry, I'm having trouble connecting. Email us at ${CHAT_FALLBACK_EMAIL} and we'll get right back to you.`;
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      historyRef.current.push({ role: "assistant", content: reply });
    } catch {
      const reply = `Connection issue. Email us at ${CHAT_FALLBACK_EMAIL} and we'll reply shortly.`;
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } finally {
      setSending(false);
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [draft, sending]);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {!open && teaser && (
        <button
          type="button"
          onClick={openChat}
          className="max-w-[15rem] rounded-2xl rounded-br-sm border border-border bg-surface px-4 py-2 text-left text-sm text-fg shadow-lg"
        >
          {teaser}
        </button>
      )}

      {open && (
        <div className="flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-bg-raised shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <span className="font-display text-sm font-semibold">JoNeX AI</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-fg-muted hover:text-fg"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div
                  key={i}
                  className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-sm text-accent-contrast"
                >
                  {m.text}
                </div>
              ) : (
                <div
                  key={i}
                  className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-border bg-surface px-3 py-2 text-sm text-fg"
                >
                  {renderBotNodes(m.text)}
                </div>
              ),
            )}
            {sending && (
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-surface px-3 py-2 text-sm text-fg-muted">
                …
              </div>
            )}
          </div>

          {showEmoji && (
            <div className="flex flex-wrap gap-1 border-t border-border bg-surface px-3 py-2">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => {
                    setDraft((d) => d + e);
                    inputRef.current?.focus();
                  }}
                  className="rounded p-1 text-lg hover:bg-bg-raised"
                >
                  {e}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-border bg-surface px-3 py-2">
            <button
              type="button"
              onClick={() => setShowEmoji((s) => !s)}
              aria-label="Emoji"
              className="text-fg-muted hover:text-accent"
            >
              <Smile className="h-5 w-5" aria-hidden="true" />
            </button>
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMsg();
                }
              }}
              placeholder="Ask about our services…"
              className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-muted"
            />
            <button
              type="button"
              onClick={sendMsg}
              disabled={sending}
              aria-label="Send"
              className="text-accent disabled:opacity-40"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? "Close chat" : "Open chat"}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-lg transition-transform hover:scale-105"
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageSquare className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

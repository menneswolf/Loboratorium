"use client";

/* =============================================================================
 *  SUPPORT CHAT WIDGET
 *  ---------------------------------------------------------------------------
 *  Floating AI assistant (Gemini-powered) that answers customer questions,
 *  grounded in the live catalogue + shipping + FAQ (see /api/chat). Only
 *  appears when the server reports chat is enabled (a Gemini key is set).
 * ========================================================================== */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";

type Msg = { role: "user" | "model"; text: string };

const STR = {
  en: {
    title: "Ask us anything",
    subtitle: "AI assistant · replies instantly",
    placeholder: "Type your question…",
    welcome:
      "Hi! I can help with products, materials, shipping and custom orders. What are you looking for?",
    error: "Sorry, I couldn't answer that just now. Try the quote form or email us.",
  },
  nl: {
    title: "Stel gerust je vraag",
    subtitle: "AI-assistent · antwoordt meteen",
    placeholder: "Typ je vraag…",
    welcome:
      "Hoi! Ik help je graag met producten, materialen, verzending en maatwerk. Waar ben je naar op zoek?",
    error: "Sorry, dat lukte even niet. Probeer het offerteformulier of mail ons.",
  },
  fr: {
    title: "Posez-nous vos questions",
    subtitle: "Assistant IA · réponse immédiate",
    placeholder: "Écrivez votre question…",
    welcome:
      "Bonjour ! Je peux vous aider sur les produits, matériaux, livraison et commandes sur mesure. Que cherchez-vous ?",
    error: "Désolé, je n'ai pas pu répondre. Essayez le formulaire de devis ou écrivez-nous.",
  },
};

export function ChatWidget() {
  const { locale } = useT();
  const t = STR[locale] ?? STR.en;

  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Only show the launcher if the server has chat enabled.
  useEffect(() => {
    fetch("/api/store-config")
      .then((r) => r.json())
      .then((d) => d?.ok && setEnabled(Boolean(d.config.chatEnabled)))
      .catch(() => {});
  }, []);

  // Seed the welcome message the first time it opens.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "model", text: t.welcome }]);
    }
  }, [open, messages.length, t.welcome]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", text } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Skip the display-only welcome message (index 0).
        body: JSON.stringify({ locale, messages: next.slice(1) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "model", text: data.ok ? data.reply : t.error }]);
    } catch {
      setMessages((m) => [...m, { role: "model", text: t.error }]);
    } finally {
      setLoading(false);
    }
  };

  if (!enabled) return null;

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={t.title}
        className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-brand-accent text-primary-foreground shadow-[0_10px_30px_-8px_var(--brand-accent)] transition-transform hover:scale-105 active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="size-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            // position:fixed set inline because the .glass class forces
            // position:relative, which would otherwise win over the `fixed` class.
            style={{ position: "fixed" }}
            className="glass bottom-24 right-5 z-40 flex h-[70vh] max-h-[560px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-card/60 px-4 py-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
                <Sparkles className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-semibold text-foreground">{t.title}</p>
                <p className="truncate text-xs text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-brand-accent px-3.5 py-2 text-sm text-primary-foreground"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-background/60 px-3.5 py-2 text-sm text-foreground"
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-background/60 px-3.5 py-2.5">
                    <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-border bg-card/60 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), send())}
                placeholder={t.placeholder}
                className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-brand-accent/60"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-accent text-primary-foreground transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="size-1.5 rounded-full bg-muted-foreground"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}

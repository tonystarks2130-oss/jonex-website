"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Mail, Check } from "lucide-react";
import { TelegramIcon, JonexMarkIcon } from "@/components/ui/BrandIcons";

type CopyContact = { label: "Email" | "Telegram"; value: string };

// The company email (@jonex.site) gets the JoNex robot mark; personal email gets a
// plain envelope, so the two are tellable apart at a glance.
function iconFor({ label, value }: CopyContact) {
  if (label === "Telegram") return TelegramIcon;
  if (label === "Email" && value.toLowerCase().endsWith("@jonex.site")) return JonexMarkIcon;
  return Mail;
}

export function CopyContacts({ contacts, name }: { contacts: CopyContact[]; name: string }) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      if (timeout.current) clearTimeout(timeout.current);
      setCopied(true);
      timeout.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable; nothing to do
    }
  }

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        {contacts.map((contact) => {
          const Icon = iconFor(contact);
          return (
            <div key={contact.value} className="group relative">
              <button
                type="button"
                onClick={() => void copy(contact.value)}
                aria-label={`Copy ${name}'s ${contact.label.toLowerCase()}: ${contact.value}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </button>
              <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-fg px-2 py-1 text-xs font-medium text-bg opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
                Click to copy
              </span>
            </div>
          );
        })}
      </div>

      {mounted &&
        createPortal(
          <div
            aria-live="polite"
            className={`fixed bottom-5 left-5 z-[70] inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-surface px-4 py-2.5 text-sm font-semibold text-accent shadow-lg transition-all duration-200 ${
              copied ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
            }`}
          >
            <Check className="h-4 w-4" />
            Copied!
          </div>,
          document.body,
        )}
    </>
  );
}

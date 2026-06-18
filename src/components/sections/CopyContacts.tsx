"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { TelegramIcon, JonexMarkIcon } from "@/components/ui/BrandIcons";

type CopyContact = { label: "Email" | "Telegram"; value: string };

// Company email (@jonex.site) gets the JoNeX badge; personal email gets the plain
// envelope — so the two are tellable apart at a glance.
function iconFor({ label, value }: CopyContact) {
  if (label === "Telegram") return TelegramIcon;
  if (label === "Email" && value.toLowerCase().endsWith("@jonex.site")) return JonexMarkIcon;
  return Mail;
}

export function CopyContacts({ contacts, name }: { contacts: CopyContact[]; name: string }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [resetTimeout] = useState<{ current: ReturnType<typeof setTimeout> | null }>({ current: null });

  async function copyContact(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
      setCopied(value);
      resetTimeout.current = setTimeout(() => {
        setCopied(null);
        resetTimeout.current = null;
      }, 1500);
    } catch {}
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2.5">
      {contacts.map((contact) => {
        const { label, value } = contact;
        const isCopied = copied === value;
        const Icon = isCopied ? Check : iconFor(contact);
        const labelText = label.toLowerCase();

        return (
          <button
            key={value}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-fg-muted transition-colors hover:border-accent hover:text-accent"
            title={`Copy ${labelText}: ${value}`}
            aria-label={isCopied ? `Copied ${labelText} for ${name}: ${value}` : `Copy ${labelText} for ${name}: ${value}`}
            onClick={() => void copyContact(value)}
          >
            <Icon className={isCopied ? "h-3.5 w-3.5 text-accent" : "h-3.5 w-3.5"} />
            <span>{isCopied ? "Copied" : value}</span>
          </button>
        );
      })}
    </div>
  );
}

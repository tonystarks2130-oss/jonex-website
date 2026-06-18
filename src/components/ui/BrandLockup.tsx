import Image from "next/image";

import { BRAND } from "@/lib/content";

type BrandLockupProps = {
  href?: string;
  tagline?: "responsive" | "always";
};

const outerClassName =
  "inline-flex items-center gap-2.5 font-display tracking-tight";

export function BrandLockup({
  href,
  tagline = "responsive",
}: BrandLockupProps) {
  const dividerClassName =
    tagline === "always"
      ? "inline text-lg font-light text-fg-muted/40"
      : "hidden text-lg font-light text-fg-muted/40 xl:inline";
  const taglineClassName =
    tagline === "always"
      ? "inline whitespace-nowrap text-sm font-medium text-fg-muted"
      : "hidden whitespace-nowrap text-sm font-medium text-fg-muted xl:inline";
  const lockup = (
    <>
      <Image
        src="/brand/jonex-icon.png"
        alt="JoNex"
        width={44}
        height={44}
        className="h-[42px] w-[42px] shrink-0 rounded-full ring-1 ring-border"
        priority
      />
      <span className="flex items-baseline gap-2 whitespace-nowrap">
        <span className="text-lg font-bold">{BRAND.short}</span>
        <span className={dividerClassName} aria-hidden="true">
          |
        </span>
        <span className={taglineClassName}>
          AI Technology & Consulting
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={outerClassName}
        aria-label="JoNex: AI Technology & Consulting"
      >
        {lockup}
      </a>
    );
  }

  return <div className={outerClassName}>{lockup}</div>;
}

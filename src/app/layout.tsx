import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { ChatWidget } from "@/components/integrations/ChatWidget";
import { CalProvider } from "@/components/integrations/CalProvider";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { JsonLd } from "@/components/seo/JsonLd";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_DESC =
  "JoNex engineers AI business systems you own: AI voice receptionists, agentic AI, intelligent automation, and custom software, with healthcare-grade depth. Not a no-code template shop.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jonex.site"),
  title: {
    default: "JoNex AI: Technology Consulting",
    template: "%s · JoNex AI",
  },
  description: SITE_DESC,
  applicationName: "JoNex AI Technology Consulting",
  keywords: [
    "AI voice receptionist",
    "agentic AI",
    "intelligent automation",
    "custom software development",
    "healthcare revenue cycle automation",
    "AI technology consulting",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "JoNex AI Technology Consulting",
    url: "https://jonex.site",
    title: "JoNex AI: Technology Consulting",
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "JoNex AI: Technology Consulting",
    description: SITE_DESC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-bg font-body text-fg antialiased">
        <ThemeScript />
        <JsonLd />
        {children}
        <RevealObserver />
        <ChatWidget />
        <CalProvider />
      </body>
    </html>
  );
}

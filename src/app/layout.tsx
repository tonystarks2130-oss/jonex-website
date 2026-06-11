import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/theme/ThemeScript";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://jonex.site"),
  title: {
    default: "JoNeX AI — Technology Consulting",
    template: "%s · JoNeX AI",
  },
  description:
    "We build AI-powered business systems that eliminate operational bottlenecks, automate workflows, and help organizations scale faster.",
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
        {children}
      </body>
    </html>
  );
}

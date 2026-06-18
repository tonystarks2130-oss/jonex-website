/**
 * No-flash theme script (DESIGN_CONTRACT §Theme toggle spec, anti-slop
 * "no hard theme-flash"). Runs synchronously before first paint as the first
 * child of <body>, so [data-theme] is set on <html> before any themed pixel
 * renders. <html> ships with data-theme="dark"; this may flip it to light
 * before hydration, hence suppressHydrationWarning on <html> in layout.tsx.
 */
const SCRIPT = `(function(){try{var t=localStorage.getItem('jonex-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}

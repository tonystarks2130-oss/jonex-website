import { BrandLockup } from '@/components/ui/BrandLockup';
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
  TelegramIcon,
} from '@/components/ui/BrandIcons';
import { Container } from '@/components/ui/primitives';
import { Mail } from 'lucide-react';
import { FOOTER_COPY } from '@/lib/content';
import { CONTACT } from '@/lib/integrations';

// Social profile URLs supplied by James (2026-06-13). Instagram = brand handle
// jonex_ai; Facebook = brand page JoNex122025; LinkedIn = Jeremy's personal
// profile "for now" (interim until a JoNex company page exists. Swap in place).
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jeremy-jay-suva-5b9471369',
    Icon: LinkedInIcon,
  },
  { label: 'Instagram', href: 'https://www.instagram.com/jonex_ai/', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/JoNe\u0058122025', Icon: FacebookIcon },
] as const;

// Contact channels, icon next to the number/handle. WhatsApp number formatted
// from CONTACT.whatsapp.number (639569871934 -> +63 956 987 1934); links use
// the verified wire URLs in CONTACT (unchanged).
const CONTACT_CHANNELS = [
  { label: '+63 956 987 1934', href: CONTACT.whatsapp.url, Icon: WhatsAppIcon },
  { label: CONTACT.email.address, href: CONTACT.email.url, Icon: Mail },
  { label: CONTACT.telegram.handle, href: CONTACT.telegram.url, Icon: TelegramIcon },
] as const;

const SOLUTIONS_LINKS: { label: string; href: string }[] = [
  { label: 'Agentic AI', href: '#solutions' },
  { label: 'AI Voice Agents', href: '#solutions' },
  { label: 'Intelligent Automation', href: '#solutions' },
  { label: 'Custom Software', href: '#solutions' },
];

const COMPANY_LINKS: { label: string; href: string }[] = [
  { label: 'Industries', href: '#industries' },
  { label: 'Our Work', href: '#work' },
  { label: 'Hear the AI', href: '#hear-the-ai' },
  { label: 'Behind JoNex', href: '#behind' },
  { label: 'About', href: '#about' },
];

const columnHeadingClassName =
  'text-xs font-semibold uppercase tracking-wider text-fg-muted';
const footerLinkClassName =
  'text-sm text-fg-muted transition-colors hover:text-fg';

/**
 * Footer with four-column navigation and legal bar.
 */
export function Footer() {
  return (
    <footer id='contact' className='border-t border-border bg-bg-raised/40'>
      <Container className='grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12 lg:py-20'>
        <div className='space-y-5'>
          <BrandLockup tagline='always' />
          <p className='max-w-sm text-sm leading-relaxed text-fg-muted'>
            {FOOTER_COPY.blurb}
          </p>
          <div className='flex items-center gap-3'>
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-fg-muted transition-colors hover:text-accent'
              >
                <Icon className='h-4 w-4' />
              </a>
            ))}
          </div>
        </div>

        <div className='space-y-4'>
          <p className={columnHeadingClassName}>Solutions</p>
          <nav aria-label='Solutions' className='flex flex-col gap-3'>
            {SOLUTIONS_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={footerLinkClassName}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className='space-y-4'>
          <p className={columnHeadingClassName}>Company</p>
          <nav aria-label='Company' className='flex flex-col gap-3'>
            {COMPANY_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={footerLinkClassName}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className='space-y-4'>
          <p className={columnHeadingClassName}>Contact</p>
          <div className='flex flex-col gap-3'>
            {CONTACT_CHANNELS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-flex items-center gap-2.5 ${footerLinkClassName}`}
              >
                <Icon className='h-4 w-4 shrink-0' />
                {label}
              </a>
            ))}
            <p className='text-sm text-fg-muted'>
              Serving clients nationwide &amp; internationally
            </p>
          </div>
        </div>
      </Container>

      <div className='border-t border-border'>
        <Container className='flex flex-col items-center gap-3 py-6 text-center md:flex-row md:justify-between md:text-left'>
          <div className='flex flex-col items-center gap-2 sm:flex-row sm:gap-3'>
            <p className='text-xs text-fg-muted'>
              © {new Date().getFullYear()} {FOOTER_COPY.name}. All rights
              reserved.
            </p>
            <span aria-hidden='true' className='hidden text-xs text-fg-muted sm:inline'>
              |
            </span>
            <span className='text-xs text-fg-muted'>
              🇵🇭 Proudly Philippine-Made
            </span>
          </div>
          <nav aria-label='Legal' className='flex gap-5'>
            <a
              href='/privacy'
              className='text-xs text-fg-muted transition-colors hover:text-fg'
            >
              Privacy
            </a>
            <a
              href='/terms'
              className='text-xs text-fg-muted transition-colors hover:text-fg'
            >
              Terms
            </a>
            <a
              href='/data-deletion'
              className='text-xs text-fg-muted transition-colors hover:text-fg'
            >
              Data Deletion
            </a>
          </nav>
        </Container>
      </div>
    </footer>
  );
}

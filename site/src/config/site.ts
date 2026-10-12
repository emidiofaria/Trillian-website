/**
 * Central site configuration. Product facts here must match USER_MANUAL.md (see AGENTS.md).
 */

const rawDownload = (import.meta.env.PUBLIC_DOWNLOAD_URL ?? '').trim();

/** Only accept an absolute https URL; anything else falls back to the honest "coming soon" state. */
function verifiedUrl(value: string): string | null {
  if (!value) return null;
  try {
    const u = new URL(value);
    return u.protocol === 'https:' ? u.toString() : null;
  } catch {
    return null;
  }
}

export const siteConfig = {
  name: 'Trillian',
  fullName: 'Trillian — Driving Coach',
  tagline: 'Know your laps. Understand your pace.',
  subheadline:
    'A GPS lap timer and post-session driving coach for Android. Record your track sessions, compare laps, and uncover useful insights — completely free.',
  freeStatement: '100% free. No subscription. No premium tier.',
  minAndroid: '8.0',
  contactEmail: 'trillian.app.contact@proton.me',
  /** null until the owner supplies a real, verified distribution URL. */
  downloadUrl: verifiedUrl(rawDownload),
  /** Date of the last review of the privacy statement against the shipped release. */
  privacyLastUpdated: '2026-10-12',
  manualVersion: '1.1',
} as const;

export const nav = [
  { href: '/features/', label: 'Features' },
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/guide/', label: 'User guide' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/about/', label: 'About' },
] as const;

export const footerNav = [
  { href: '/', label: 'Home' },
  ...nav.slice(0, 2),
  { href: '/download/', label: 'Download' },
  ...nav.slice(2),
] as const;

# AGENTS.md — Trillian website

Guidance for anyone (human or AI agent) changing this repository.

## What this is
A static, 8-page marketing + documentation site for **Trillian — Driving Coach**, a free Android
GPS lap timer and **post-session** driving coach. Code lives in `site/` (Astro 4 + TypeScript, plain CSS).

## Sources of truth — never edit them from website work
Project inputs live in `00_inputs/` and are read-only:
- `00_inputs/USER_MANUAL.md` (v1.1) — every public claim must be traceable to it.
- `00_inputs/DrivingCoach_SRS_v1.md` — context only. Do **not** publish SRS-only/back-end/V2 features.
- `00_inputs/Trillian_Copilot_CLI_Implementation_Plan.md` — original brief; the adopted plan is `docs/WEBSITE_IMPLEMENTATION_PLAN.md`.
- `01_pictures/` — originals. Run `npm run assets` to regenerate optimised copies in `site/src/assets` and `site/public`.
- When adding or changing a claim, update `docs/CONTENT_FACT_CHECK.md`.

## Product facts (use exactly)
- Android **8.0+** with GPS; optimised for phones, tablets work. **Not available on iPhone/iOS.**
- Pricing: **“100% free — no subscription or premium tier.”** Never write “free forever”.
- Offline-first: no account, no server, no analytics, no tracking, no INTERNET permission; works in flight mode.
- Location permission “While using the app”, only during sessions you start (visible notification). Notifications optional. No Physical Activity permission.
- Coaching = insights computed **on the phone after the session** (7 cards, shown only when data supports them). Not live, not audio.
- Sectors = three **equal thirds by distance** — not official circuit sectors.
- Contact: `trillian.app.contact@proton.me` (from `siteConfig`).
- Planned items may only be described as the manual does: sign-in/accounts and cloud backup “planned for a future version”.

## Forbidden content (enforced by `npm test` → `scripts/check-claims.mjs`)
Download links/QR codes/store badges that don't exist (Google Play, App Store) · iOS availability ·
testimonials, ratings, download/user counts · “±0.2 s” accuracy (awaiting owner confirmation) ·
live/real-time/audio coaching · “AI looks for late braking…” · server detection (manual §5.1) ·
“updates live if connected” · diagnostic export / long-press Share (manual §6.1.1) · leaderboards/social ·
Driving Academy · backend vendors (Anthropic, Firebase) · specific circuit names.

## Engineering rules
- Download CTA always via `CtaDownload` / `siteConfig.downloadUrl`; never hard-code a link. Null ⇒ honest “coming soon” + installation guide.
- Every internal link through `url()` from `src/lib/url.ts` (GitHub Pages `BASE_PATH`).
- Images via `astro:assets` `<Image>` with meaningful `alt`; decorative images `alt=""`.
- Accessibility: one `<h1>` per page, landmarks, visible `:focus-visible`, ≥ 4.5:1 text contrast, keyboard-operable menu, `prefers-reduced-motion` respected, features work without JS.
- No cookies, analytics, external fonts or third-party scripts.
- Design tokens in `src/styles/tokens.css` (dark charcoal-navy, electric-blue accent, sector colours blue/purple/amber, gold for best lap, monospace tabular numerals).

## Commands (in `site/`)
`npm run dev` · `npm run build` · `npm run check` · `npm run format` / `format:check` · `npm test` (after build).
Before finishing a change: `npm run format:check && npm run check && npm run build && npm test`.

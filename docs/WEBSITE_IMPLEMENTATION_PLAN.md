# Trillian — Driving Coach Website: Step-by-Step Implementation Plan

Source plan: `Trillian_Copilot_CLI_Implementation_Plan.md` (phases 0–7).
Sources of truth: `USER_MANUAL.md` (v1.1, public claims), `DrivingCoach_SRS_v1.md` (context only).
Root: `Trillian-website/` (git repo, remote `emidiofaria/Trillian-website`)

## 1. Problem & approach
The folder has no website code. It contains the plan, the manual, the SRS and `01_pictures/`.
We will build a static, 8-page, responsive and accessible marketing site using **Astro + TypeScript**
with plain CSS design tokens. We will build it phase by phase, and every claim must be traceable to the manual.

## 2. Owner decisions (resolved)
| Decision | Answer | Effect |
|---|---|---|
| Stack | Astro + TS, static output, plain CSS | `npm create astro` (minimal), no UI framework |
| Download URL | **None yet** | `siteConfig.downloadUrl = null` → show the honest "Download link coming soon" state and the "View installation guide" CTA |
| Privacy | **Confirmed**: local-only, no INTERNET permission, no analytics, no backend | Privacy page can state this plainly (still scoped to "current version") |
| Domain | Not yet | No canonical/`og:url`; sitemap/robots only emit absolute URLs once `site` is set. Keep it config-driven |
| Contact | `trillian.app.contact@proton.me` | Used on the Privacy, About and Guide "Need help" sections and in the footer |
| Pricing wording | "100% free — no subscription or premium tier" | Never use "free forever" |
| Images | Helmet emblem + 4 app screenshots | The `paper_1` illustration is **excluded** |
| Diagnostic export | **Not** documented publicly | Leave out manual §6.1.1 and the long-press gesture |
| Deploy | GitHub Pages | Add `.github/workflows/deploy.yml` and the `base`/`site` config. **No git init** for now; document how to push |

## 3. Claim-matrix rules (manual inconsistencies to handle)
These items are in the manual but must be **excluded** from the site, or rephrased, and logged in `docs/CONTENT_FACT_CHECK.md`:
- Manual §5.1 "Local vs Server Detection" → OUT OF SCOPE. It conflicts with the local-only V1.
- FAQ "±0.2 s accuracy" → NEEDS OWNER CONFIRMATION. Say "GPS-based; not a professional timing system" instead.
- FAQ "AI looks for late braking, inconsistent corner entry, speed scrubbing" → do not repeat it. Describe only the 7 real coaching cards plus the Analysis tab (braking zones, corners).
- Wording such as "AI coaching" → use "post-session coaching insights computed on your phone".
- Manual "Contact support with: your email address" → just use the supplied contact email.
- Manual §4.1 "updates live if connected" → omit.
- SRS backend, Anthropic, Firebase, upload and account sections → OUT OF SCOPE (V2/future). They can only be mentioned as "planned: accounts / cloud backup" if the wording matches the manual exactly (§2.5).
- Never claim: iOS, store badges, QR codes, leaderboards, social, real-time/audio coaching, official sectors, testimonials, stats or ratings.
- The "Driving Academy" placeholder (SRS OOS-09) → do not mention it.

## 4. Target structure
```
/ (repo root = existing folder; source docs stay untouched)
├─ AGENTS.md
├─ docs/WEBSITE_IMPLEMENTATION_PLAN.md   (copy of this plan, project-facing)
├─ docs/CONTENT_FACT_CHECK.md
├─ docs/QA_CHECKLIST.md
├─ README.md                              (run/build/deploy)
├─ .github/workflows/deploy.yml           (GitHub Pages)
└─ site/                                  (Astro project)
   ├─ astro.config.mjs  (site/base from env; sitemap integration only if SITE_URL set)
   ├─ public/ favicon.svg/png, apple-touch-icon, og-image.png, robots.txt
   └─ src/
      ├─ config/site.ts        (name, tagline, downloadUrl=null, contactEmail, minAndroid="8.0", nav)
      ├─ styles/tokens.css, global.css
      ├─ assets/ helmet.png, screens/*.png  (optimised via astro:assets → webp/avif)
      ├─ layouts/BaseLayout.astro (head/meta/OG, skip-link, header, main, footer)
      ├─ components/ Header, MobileNav, Footer, Button, CtaDownload, Section, SectionHeading,
      │              FeatureCard, Callout, FaqItem (details/summary), StepList, PhoneFrame,
      │              LapTableMock, SectorDiagram (SVG), FreeBanner, Toc
      ├─ content/  guide/*.md, faq.ts   (manual-derived, curated)
      └─ pages/ index, features, how-it-works, download, guide, faq, privacy, about, 404
```
Decision: put Astro in `site/` so the source docs and pictures at the root stay untouched.
Images get copied from `01_pictures/` into `site/src/assets/` and renamed (fixing the "analisys" typo).

## 5. Step-by-step phases

### Phase 0 — Audit (DONE in planning)
- Repo audit: empty, Node and npm available, no git.
- Produce `docs/CONTENT_FACT_CHECK.md`. Each claim gets VERIFIED / NEEDS OWNER CONFIRMATION / OUT OF SCOPE, with a manual § reference.

### Phase 1 — Foundation & design system
1. Scaffold `site/` with `npm create astro@latest site -- --template minimal --typescript strict --no-install --no-git`, then `npm install`.
2. Add dev dependencies: `@astrojs/check`, `typescript`, `prettier` and `prettier-plugin-astro`. Optionally add `@astrojs/sitemap` (enabled only when `SITE_URL` is set).
3. Add these scripts: `dev`, `build`, `preview`, `check` (astro check), `format`, `format:check`, `test` (link check, see Phase 7).
4. `tokens.css`:
   - Colours: bg `#0B0F17`/`#111827` (charcoal-navy), surface `#161D2B`, text `#F5F7FA`, muted `#9AA4B2`, accent electric blue `#2F80FF`, purple `#8B5CF6` (sector 2), amber `#F5A524` (sector 3), gold `#D4AF37` (best lap, from the screenshot), focus ring.
   - Type scale, spacing scale, radii, borders, `--font-mono` for numerals.
   - Fonts are system stacks (no external font CDN → privacy-consistent). Use `font-variant-numeric: tabular-nums`.
5. `global.css`: reset, container, grid utilities, `:focus-visible`, and `prefers-reduced-motion` handling.
6. `site.ts` holds the central config. Add the `CtaDownload` component: if `downloadUrl` is null, it renders "View installation guide" → `/download#install` and never a dead link.
7. `BaseLayout` provides: per-page `title`/`description` props, OG tags (no `og:url` until a domain exists), favicon, a skip link, and `<header>/<main>/<footer>` landmarks.
8. Header: logo (helmet + TRILLIAN wordmark), nav links to the 8 pages, and an accessible mobile menu (button with `aria-expanded`, Esc to close, focus management, works without JS via `<details>` fallback).
9. Footer: links to all pages, the contact email, the "100% free" line, "Android 8.0+", and a non-affiliation note if needed.
10. Favicon: crop the helmet to a square → 32/180/512 PNG, plus `favicon.ico`, using a one-off `sharp` script (dev dependency) or a manual export.
11. Write `AGENTS.md`: product facts, forbidden claims (§3), pricing wording, design direction, commands, a11y/testing rules, and "do not modify USER_MANUAL/SRS".
12. Copy this plan to `docs/WEBSITE_IMPLEMENTATION_PLAN.md`.
- **Accept**: `npm run build` and `npm run check` pass. The shell works at 360px and 1440px, and the nav works by keyboard.

### Phase 2 — Homepage (`/`)
Sections, in order:
1. FreeBanner: "100% free. No subscription. No premium tier."
2. Hero: H1 "Know your laps. Understand your pace." plus the subheadline. Primary CTA (CtaDownload, honest state) and secondary CTA "Explore the features". Visual: helmet emblem + the Main page screenshot in a PhoneFrame.
3. Feature overview cards (6): automatic lap detection, circuit library, lap and sector comparison, speed traces and track maps, post-session coaching, offline-first.
4. Lap timing showcase: an SVG/HTML `LapTableMock` (Lap/Time/S1/S2/S3/Delta/★) in mono numerals, clearly labelled "Illustrative example" and using the manual's 1:12.4 / 1:10.9 Dream Lap example. Alongside it, the Analysis screenshot.
5. Coaching showcase: the Coach screenshot plus a list of the 7 cards and the note "cards appear only when your data supports them".
6. How it works: 4 steps (prepare GPS → choose/capture circuit → record → review).
7. Offline & privacy: works in flight mode, data stays on the phone, no account, no INTERNET permission (confirmed).
8. Android compatibility + setup note (8.0+, mount, power, battery saver off).
9. FAQ preview (4 items) → link to `/faq`.
10. Final CTA.
- **Accept**: free status and value proposition are visible above the fold at 375×667. No fake download, testimonials or stats.

### Phase 3 — `/features` and `/how-it-works`
- Features: one section per capability:
  - Lap detection: rules include a 20 s minimum and 50 m away from the line.
  - Circuit library: SELECT TRACK vs NEW CIRCUIT, built-in circuits are surveyed, saved circuits can be renamed or deleted. Don't list circuit names.
  - Laps tab: time, sectors, delta, best-lap star.
  - SectorDiagram SVG in blue/purple/orange with a gold S/F dot, and the caption "three equal thirds by distance, not official sectors".
  - Chart tab: speed vs distance, Fast/Detailed.
  - Analysis tab: distance, duration, max/avg speed, speed-coloured map, corners/apex speed, braking zones with GPS-derived g. Use the detailed-turn screenshot here.
  - Coaching cards table (7, with conditions), Dream Lap explanation and its safeguards.
  - Session history and profile stats, share cards (best lap, date/track, name), offline-first.
- How it works: 5 steps from manual §3–5:
  - Open the app early. The first fix takes 30–60 s, and you need a clear sky.
  - Choose a circuit or capture points A/B at < 5 m accuracy, then save the circuit.
  - Mount the phone: secure, no cup holder, keep it powered.
  - Record: the screen can be off, the notification shows status, GPS colours.
  - Stop and review, then use the insights. Add a "Coaching is after the session, not live" callout.
- **Accept**: wording matches the manual, there is no live-coaching implication, and the sector definition appears on both pages.

### Phase 4 — `/download`
- Requirements: Android 8.0+, GPS, phone recommended (tablets work), Location permission ("While using the app"), Notifications optional, and roughly 10–15% battery per hour.
- Status block: "Download link coming soon". There is no button-like element that links to nothing. The `downloadUrl` config switches it to a real CTA later.
- `#install` steps follow manual §2.1. The sideloading note covers "Allow from this source" for that installer only, never disabling protections globally, and installing only from a source you trust.
- First-launch notes: the loading screen, permissions, and driver name (2–100 characters).
- **Accept**: no dead or invented links, and the install guide is reachable without a download link.

### Phase 5 — `/guide`, `/faq`, `/privacy`, `/about`
- Guide: curated Markdown/MDX in `src/content/guide/` with these sections:
  - Getting Started
  - GPS & Permissions
  - Circuit Setup
  - Phone Mounting
  - Recording
  - Reviewing Results (Laps/Coach/Chart/Analysis)
  - Profile & Sharing (share cards, rename, About screen, Clear User Data warning)
  - Troubleshooting (all manual §7 entries)

  Add a sticky/inline table of contents with anchor links, plus an optional progressive-enhancement filter input that shows and hides sections. It needs a label and an `aria-live` result count, and the page must work without JS. Exclude the diagnostic export, "Server Detection" and "live if connected".
- FAQ: grouped native `<details>` items covering General, Accuracy & sectors, Coaching & Dream Lap, Data & privacy, Devices. Rewrite the ±0.2 s and "AI patterns" answers per §3.
- Privacy (last updated = build date constant):
  - Data stored locally: driver name, sessions, laps, insights, telemetry files.
  - Location is "while using the app" and sampled only during sessions you start, with a visible notification. There is no background tracking.
  - Notifications are optional. There is no Physical Activity permission.
  - No account, server, analytics or tracking, and no INTERNET permission. Leaving the phone happens only via user share/export.
  - Deletion: individual sessions, Clear User Data, or uninstalling.
  - Website section: the site itself uses no cookies or analytics, and GitHub Pages hosting may log IPs per GitHub's policy (link to it).
  - Contact email.
- About: purpose, audience (track-day, amateur racing, karting), the free positioning, the honesty principles ("shows fewer cards rather than make something up"), and planned items worded as in the manual (accounts and cloud backup "planned for a future version"). No company or team history.
- **Accept**: every privacy statement maps to manual §2.3/2.4/4.3/6.4/FAQ, and there are no placeholder contacts.

### Phase 6 — SEO, a11y, performance, polish
- Unique titles and descriptions for each page (map them in `site.ts`). OG image is 1200×630, generated from the helmet and wordmark. Add `robots.txt`; the sitemap is emitted only when `SITE_URL` is set.
- `404.astro` with links back.
- Images: `astro:assets` `<Image>` with width/height (no CLS), `loading="lazy"` below the fold, and descriptive alt text. Crop or hide the status bar in screenshots if needed.
- Contrast: check tokens at ≥ 4.5:1 for body text. Visible focus rings. `prefers-reduced-motion` turns off transitions.
- Responsive check at 360, 768, 1024 and 1440 px, with no horizontal overflow (tables scroll inside wrappers).
- No cookie banner, because there are no cookies.

### Phase 7 — QA & launch readiness
- Commands: `npm ci`, `npm run format:check`, `npm run check`, `npm run build`, and `npm run test`. The test is a link check over `dist/` with `linkinator` (or a small node script), covering internal links and anchors.
- Optional: run Playwright or `pa11y-ci` against `npm run preview` for the 8 routes plus 404, check for console errors, and run axe. Add these only if they stay lightweight.
- Grep audit for forbidden terms: subscription upsell, iOS, App Store, Google Play badge, "free forever", testimonials, "±0.2", "server", "real-time".
- `deploy.yml`: on push to `main`, use `withastro/action` → `actions/deploy-pages`. Set `base` from the repo name via an env var.
- `README.md` covers run/build/deploy and how to set `DOWNLOAD_URL` and `SITE_URL` later. `docs/QA_CHECKLIST.md` holds the results and the outstanding owner items (download URL, domain, accuracy figure).

## 6. Notes / risks
- GitHub Pages project sites need `base: '/<repo>/'`. All internal links must go through a `url()` helper that respects `import.meta.env.BASE_URL`.
- Screenshots show a device status bar and comma decimals ("91,4%"), which is fine (authentic), but alt text should describe the content.
- No git init was requested. The deploy workflow is added but stays inert until the folder is pushed to GitHub.
- The source docs and `01_pictures/` are never modified.

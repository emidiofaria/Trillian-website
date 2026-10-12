# QA checklist

Last full run: 2026-10-12, Node 18.19.1 locally (CI: Node 20). All commands run in `site/`.

## Automated
| Check | Command | Result |
|---|---|---|
| Clean install | `npm ci` | ✅ 426 packages |
| Formatting | `npm run format:check` | ✅ all files Prettier-clean |
| Types/templates | `npm run check` | ✅ 0 errors, 0 warnings |
| Static build | `npm run build` | ✅ 9 pages (8 + 404) + robots.txt, ~920 KB `dist/` |
| Internal links & anchors | `npm test` → `check-links.mjs` | ✅ 272 references OK |
| Forbidden claims | `npm test` → `check-claims.mjs` | ✅ 19 rules, 0 hits (verified to fail on planted “free forever”, “Google Play”, “±0.2”) |
| GitHub Pages base path | `BASE_PATH=/trillian-website SITE_URL=https://example.github.io npm run build` + `BASE_PATH=/trillian-website node scripts/check-links.mjs` | ✅ links prefixed, canonical + sitemap + robots `Sitemap:` emitted |
| Without `SITE_URL` | default build | ✅ no canonical/`og:url`, no sitemap, robots without sitemap line |

## Browser (Playwright + Chromium, temporary, not a project dependency)
| Check | Result |
|---|---|
| All 8 routes return 200; unknown route returns 404 page | ✅ |
| Exactly one `<h1>` per page | ✅ |
| No horizontal overflow at 360 / 768 / 1440 px | ✅ (fixed grid min-width blowout on the homepage lap table) |
| No console errors (besides the intentional 404 test) | ✅ |
| Mobile menu: `aria-expanded` toggles, Esc closes and keeps focus on the toggle | ✅ |
| Guide filter: “battery” → 1 of 9 topics, announced via `aria-live` | ✅ |
| axe-core WCAG 2.0/2.1 A + AA on all 9 pages | ✅ 0 violations |
| Sector diagram labels / colours visually checked | ✅ |

## Manual review
- [x] Free status + value proposition above the fold at 360 px.
- [x] No dead download button: `downloadUrl` is null ⇒ “Public download link coming soon” + installation guide CTA.
- [x] No testimonials, stats, ratings, store badges, iOS claims, live-coaching implications.
- [x] Privacy statements map to manual §2.3, §2.4, §4.3, §5.5, §6.4 and FAQ (see `CONTENT_FACT_CHECK.md`).
- [x] Works without JavaScript (nav wraps, FAQ uses native `<details>`, guide filter hidden).
- [x] `prefers-reduced-motion` honoured; visible focus rings.

## Open items for the owner
1. **Download URL** — set `PUBLIC_DOWNLOAD_URL` (repo variable) when a public APK/store link exists.
2. **Domain** — set `SITE_URL` (and `BASE_PATH=/` for a custom domain) to enable canonical URLs and sitemap.
3. **Lap-timing accuracy figure** — manual FAQ says “±0.2 s”; confirm with measurements before publishing (then relax the rule in `scripts/check-claims.mjs`).
4. **Push to GitHub** — content is in the `Trillian-website` repo, not yet committed; see README “Deploying to GitHub Pages”.
5. Privacy page “last updated” date lives in `site/src/config/site.ts` (`privacyLastUpdated`) — update on each policy change.

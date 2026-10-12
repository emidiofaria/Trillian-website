# Trillian — Driving Coach · Website

Static marketing and documentation site for **Trillian — Driving Coach**, a free Android GPS lap timer
and post-session driving coach. Built with [Astro](https://astro.build) 4 + TypeScript and plain CSS.

| Path | Purpose |
|---|---|
| `site/` | Astro project (all website code) |
| `docs/` | Implementation plan, content fact-check, QA checklist |
| `AGENTS.md` | Rules for contributors/AI agents (product facts, forbidden claims) |
| `USER_MANUAL.md` | **Source of truth** for every public claim — do not edit from website work |
| `DrivingCoach_SRS_v1.md` | Product context only — never quote unreleased/back-end features |
| `01_pictures/` | Original images (copied & optimised by `npm run assets`) |

## Requirements
Node.js **≥ 18.17.1** (Astro 4 line, chosen so it runs on Node 18; CI uses Node 20).

## Commands (run inside `site/`)
```bash
npm ci                # install
npm run dev           # dev server on http://localhost:4321
npm run build         # static build → site/dist
npm run preview       # serve the build
npm run check         # astro check (TypeScript + templates)
npm run format        # prettier --write   (format:check in CI)
npm test              # link/anchor check + forbidden-claim audit on dist/ (build first)
npm run assets        # regenerate optimised images/favicons/OG image from ../01_pictures
```

## Configuration (environment variables)
See `site/.env.example`.

| Variable | Effect |
|---|---|
| `PUBLIC_DOWNLOAD_URL` | HTTPS link to the APK/store page. While unset the site shows an honest *“Public download link coming soon”* state and points CTAs at the installation guide. |
| `SITE_URL` | Production origin (e.g. `https://example.com`). Enables canonical URLs, `og:url`, sitemap and the sitemap line in `robots.txt`. |
| `BASE_PATH` | Sub-path when hosted as a GitHub Pages project site (e.g. `/trillian-website`). Default `/`. |

Editable product facts (contact e-mail, min Android version, privacy “last updated” date) live in
`site/src/config/site.ts`.

## Deploying to GitHub Pages
1. Commit and push to `main` of `github.com/emidiofaria/Trillian-website`.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Optional repo **Variables** (Settings → Secrets and variables → Actions → Variables):
   `PUBLIC_DOWNLOAD_URL`, `SITE_URL`, and `BASE_PATH` (set to `/` when using a custom domain).
4. Every push to `main` runs `.github/workflows/deploy.yml`: format check, type check, build, tests, deploy.

By default the workflow builds with `BASE_PATH=/<repo-name>`, matching `https://<user>.github.io/<repo-name>/` (here: `https://emidiofaria.github.io/Trillian-website/`).

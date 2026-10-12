# Trillian --- Driving Coach Website

## Copilot CLI Implementation Plan

**Purpose:** Build a professional, responsive public website for
Trillian --- Driving Coach, using the supplied `USER_MANUAL.md` and
`DrivingCoach_SRS_v1.md` as the product truth.

**Primary audience:** Track-day drivers, amateur racers, karting and
motorsport enthusiasts who want to measure laps and understand their
progress.

**Non-negotiable positioning:** The app is **100% free**. Do not suggest
a subscription, premium tier, trial, payment, or paywall.

**Plan status:** Ready to run in an existing repository or a new
repository. Copilot must inspect the project before choosing or changing
its stack.

------------------------------------------------------------------------

## 1. Recommended Copilot model and workflow

### Recommended model

For the main implementation, start with **`claude-opus-5.5`** if it is
available in your Copilot plan: GitHub lists it as a high-capability
option for complex tasks. For code-heavy implementation or debugging,
**`gpt-5.3-codex`** is a strong alternative. **`gpt-5.4`** is also
listed for complex reasoning. Model availability and names can change,
and depend on your plan and organization policy; confirm with `/model`
in the CLI. See GitHub's [Copilot CLI command
reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference).

Suggested approach: - **Planning and architecture:** `claude-opus-5.5`
or `/model auto intelligence`. - **Implementation:** `gpt-5.3-codex` or
`claude-opus-5.5`. - **Small edits and repetitive tasks:**
`/model auto balance` or a fast model available in your picker. - Do not
spend time trying to force a model that is unavailable to your account.
Use `/model` and select the closest available high-capability coding
model.

### Recommended execution style

Use Copilot CLI in **plan-first, phase-by-phase mode**. Review the plan
before allowing code changes. Avoid asking the agent to build the entire
site in one giant step.

------------------------------------------------------------------------

## 2. Product facts Copilot must preserve

Use the manual as the source of public-facing claims. Use the SRS for
additional context, but do not advertise backend or planned
functionality as current app features unless confirmed against the
actual release.

### Supported claims

-   Android app; minimum version documented in the manual is Android
    8.0+.
-   GPS-based lap detection using a configured start/finish line.
-   A library of built-in and user-saved circuits.
-   Lap times, fastest lap, sector times, lap deltas, and session
    history.
-   Speed traces and track maps for session review.
-   Post-session coaching insights where the session data supports them:
    fastest lap, top speed, consistency, Dream Lap, sector focus,
    outlier laps, and pace trends.
-   Shareable session result cards.
-   Offline-first operation; session recording and analysis are
    performed on-device.
-   No account, password, or email address is required in the current
    version.
-   Session and profile data are stored locally unless the user
    explicitly exports or shares it.
-   Coaching is post-session, not real-time.
-   The app's three sectors are equal thirds by distance, not the
    circuit's official timing sectors.
-   GPS quality and hardware affect the quality of results.

### Claims to avoid unless the owner verifies them

-   iOS support, desktop apps, or specific app-store availability.
-   Any download URL, QR code, package host, or install button
    destination that has not been supplied.
-   Cloud sync, cloud backup, accounts, social feed, leaderboards, live
    sharing, or real-time/audio coaching.
-   Guaranteed lap-time improvements, measured performance gains,
    fabricated testimonials, user counts, reviews, or ratings.
-   "Official circuit sectors" or guaranteed professional timing-system
    accuracy.
-   Claims that every coaching card appears for every session.
-   Any claim that the app transmits no data without checking the
    current release and the supplied privacy requirements.

**Important source reconciliation gate:** The manual describes the
current app as offline/local-only, while parts of the SRS describe a
backend/API and upload processing. Before writing the final privacy
policy or describing network behaviour, inspect the current release
configuration and ask the owner to confirm which architecture ships.
Until confirmed, do not invent or publish absolute privacy claims that
conflict with the actual build. The website should clearly distinguish
released features from future/planned capabilities.

------------------------------------------------------------------------

## 3. Website scope and information architecture

Build these pages with a shared design system, navigation, footer,
responsive layout, metadata, and accessible components.

1.  **Home (`/`)** --- positioning, key features, how it works, free
    promise, compatibility, FAQs, primary CTA.
2.  **Features (`/features`)** --- lap timing, circuit setup/library,
    lap comparison, telemetry visualisation, coaching insights, session
    history, sharing, offline use.
3.  **How It Works (`/how-it-works`)** --- prepare phone/GPS, select or
    capture a circuit, record, stop, review and learn.
4.  **Download (`/download`)** --- Android compatibility, installation
    guidance, honest download status and a configurable destination.
5.  **User Guide (`/guide`)** --- searchable or well-structured
    manual-derived help, setup, recording, results, troubleshooting,
    FAQ.
6.  **Privacy (`/privacy`)** --- plain-language data handling,
    permissions, local storage, exports/sharing, and only verified
    network statements.
7.  **FAQ (`/faq`)** --- practical answers derived from the manual.
8.  **About (`/about`)** --- product purpose, intended audience, and
    free/openly accessible positioning without inventing company
    history.

If the existing project has a different routing convention, adapt these
URLs to its framework rather than migrating frameworks unnecessarily.

------------------------------------------------------------------------

## 4. Visual and content direction

### Design language

-   Premium motorsport engineering, not a generic SaaS template.
-   Dark charcoal/navy backgrounds, high-contrast white and muted grey
    text, electric blue as the main accent, with restrained purple and
    amber used only where meaningful.
-   Large editorial headlines, strong spacing, clear grids, precise
    technical details, and understated borders.
-   Use monospace numerals for lap times, deltas, telemetry values, and
    data-style UI.
-   Use motorsport photography or original abstract track/GPS visuals
    only where licensing and availability are clear. Prefer custom
    CSS/SVG diagrams and authentic product screenshots if supplied.
-   Avoid fake screenshots that imply features not in the app. If no
    screenshots exist, create clearly illustrative UI mockups using only
    supported features.
-   Motion should be subtle, respect `prefers-reduced-motion`, and never
    impair navigation or reading.

### Core messaging

Suggested headline: **"Know your laps. Understand your pace."**

Suggested subheadline: **"A GPS lap timer and post-session driving coach
for Android. Record your track sessions, compare laps, and uncover
useful insights --- completely free."**

Prominent reassurance: **"100% free. No subscription. No premium
tier."**

Primary CTA: - Use "Get Trillian" or "Download for Android" only if a
real, verified destination exists. - Until a URL or approved
distribution method is supplied, use a non-deceptive "View installation
guide" CTA or a configurable placeholder that cannot be mistaken for a
working download.

Secondary CTA: "Explore the features" or "Read the guide".

### Content quality

-   Write for drivers, not developers.
-   Explain jargon briefly: GPS fix, lap delta, telemetry, and sector.
-   Explain that sectors are equal thirds by distance and not official
    circuit sectors.
-   Explain that coaching insights depend on available session data.
-   State Android compatibility clearly.
-   Keep the "free forever" or "forever free" wording only if the owner
    explicitly guarantees that promise. Otherwise say "100% free --- no
    subscription or premium tier" to describe the current offer without
    inventing a perpetual guarantee.

------------------------------------------------------------------------

## 5. Delivery phases

### Phase 0 --- Repository discovery and source-of-truth audit

**Goal:** Understand the existing codebase before editing.

Tasks: - Inspect repository structure, package manager, framework, build
scripts, current routes, styling, tests, and deployment setup. - Locate
`USER_MANUAL.md` and `DrivingCoach_SRS_v1.md`; read relevant sections
fully enough to build a factual content matrix. - Identify existing
brand assets, screenshots, logo, fonts, favicon, and any real download
destination. - Note missing decisions: download URL, verified release
privacy posture, official contact details, analytics/cookie policy,
deployment target. - Do not overwrite existing app code, delete files,
or introduce a new framework before explaining why it is needed.

Deliverables: - A concise repository audit. - A source-backed
feature/claim matrix with statuses: verified, needs owner confirmation,
or out of scope. - A proposed implementation plan with stack-specific
tasks.

**Gate:** Wait for the user to approve the plan before large-scale
implementation.

### Phase 1 --- Foundation and shared design system

Tasks: - Reuse the existing stack where practical; if the repository is
empty, propose a lightweight, maintainable, static-first framework
suitable for a marketing site. - Set up routes, shared page shell,
responsive header/navigation, mobile menu, footer, typography, spacing
scale, colour tokens, buttons, cards, callouts, and accessible focus
states. - Add site identity and theme tokens for Trillian. - Establish
lint, type-check, formatting, and build commands appropriate to the
repository. - Add or update `AGENTS.md` with product facts, content
guardrails, commands, architecture, and testing rules.

Acceptance criteria: - The site starts and builds using documented
commands. - Navigation and page shell work on mobile and desktop. - No
unrelated application modules are modified.

### Phase 2 --- Homepage

Build sections in this order: 1. Free-product announcement. 2. Hero with
clear headline, subheadline, primary and secondary CTAs. 3. Feature
overview cards. 4. Lap timing and lap comparison showcase. 5.
Post-session coaching showcase. 6. "How it works" three- or four-step
flow. 7. Offline-first and privacy explanation, limited to verified
facts. 8. Android compatibility and practical setup note. 9. FAQ
preview. 10. Final CTA. 11. Footer with links to all core pages.

Acceptance criteria: - The value proposition and free status are obvious
without scrolling. - CTA labels match their actual destinations. - Every
feature shown is supported by the manual/SRS and current release
status. - No fake download button, testimonial, metric, or unsupported
claim.

### Phase 3 --- Feature and education pages

Implement `/features` and `/how-it-works`.

Features page content: - Automatic lap detection using the configured
start/finish line. - Built-in and saved circuit selection. - Lap time,
fastest lap, sector times, deltas. - Speed traces and track maps. -
Data-dependent coaching insights. - Session history and progression. -
Shareable result cards. - Offline-first use, subject to verified release
behaviour.

How-it-works page content: 1. Prepare the phone and obtain a good GPS
fix. 2. Select a known circuit or capture a start/finish line for a new
one. 3. Record the session. 4. Stop and review lap results. 5. Use
available coaching insights to identify areas to work on.

Acceptance criteria: - Steps match the manual and do not imply live
coaching. - Important GPS and phone-mount guidance is practical and
accurate. - Sector explanation clearly says "three equal thirds by
distance".

### Phase 4 --- Download and installation

Tasks: - Build `/download` with device requirements and installation
instructions based on the manual. - Add a single configurable download
target (for example, an environment variable or central site config). -
If no valid target is configured, show an honest "Download link coming
soon" or "Follow the installation guide" state. - Never create a fake
URL, QR code, store badge, APK link, or success state. - Explain
sideloading only as the manual does, with clear Android security
implications and without suggesting that users disable protections
globally.

Acceptance criteria: - The download CTA cannot lead to a broken or
invented destination. - Android 8.0+ is stated as the manual's
requirement unless the release owner verifies a change. - The
installation guide is reachable without a download link.

### Phase 5 --- User guide, FAQ, privacy, and about

Tasks: - Build `/guide` from `USER_MANUAL.md`, preserving actual app
labels and workflow. - Organise guide topics into Getting Started,
GPS/permissions, Circuit Setup, Recording, Reviewing Results, Coaching,
Profile/Sharing, Troubleshooting. - Add a client-side search/filter only
if it remains accessible and maintainable; otherwise use clear headings
and a contents list. - Build `/faq` from manual-supported answers. -
Build `/privacy` after the privacy architecture gate is resolved. -
Build `/about` without inventing company/team details.

Privacy page must cover, as verified: - What is stored locally. - Why
location permission is needed and when location is sampled. -
Notification permission is optional if this remains true in the
release. - What happens when the user exports/shares data. - Whether any
network transmission, analytics, cookies, or third-party services
exist. - How users can remove local data, if documented. - A
last-updated date and a route for privacy questions only if real contact
details are supplied.

Acceptance criteria: - Every privacy statement has been checked against
the actual release configuration. - The guide does not expose internal
developer-only telemetry export gestures unless the product owner wants
them documented publicly. - No placeholder contact details or legal
claims are presented as real.

### Phase 6 --- SEO, accessibility, performance, and polish

Tasks: - Add unique page titles and descriptions, canonical URLs only
when the domain is known, Open Graph metadata, favicon, and
robots/sitemap where appropriate. - Add semantic landmarks, keyboard
navigation, visible focus states, alt text, form labels, and accessible
contrast. - Ensure responsive layouts at narrow phone, tablet, laptop,
and wide desktop sizes. - Respect reduced-motion preferences. - Optimise
images, avoid unnecessary dependencies, prevent layout shifts, and
lazy-load non-critical imagery. - Add a 404 page and sensible
empty/error states. - Use a cookie banner only if actual non-essential
cookies or tracking require it; do not add one automatically.

Acceptance criteria: - No horizontal overflow at common mobile widths. -
Navigation works by keyboard. - Images have useful alt text or are
marked decorative. - No console errors or broken internal links. -
Metadata is unique and not copied verbatim across pages.

### Phase 7 --- QA and launch readiness

Run the project's actual commands, discovered in Phase 0: - dependency
install using the repository's package manager and lockfile. - lint. -
type check. - unit/component tests, if configured. - production build. -
link checks and responsive/manual browser checks if available.

Test scenarios: - All eight routes render. - Header, mobile menu,
footer, and CTAs work. - Download CTA is either verified and functional
or honestly marked unavailable. - User guide search/anchors work if
implemented. - Privacy page reflects the verified release. - 404
behaviour is correct. - No false product claims, fake statistics, fake
testimonials, or unlicensed assets. - No secrets, API keys, or
credentials are committed. - Keyboard-only navigation and reduced-motion
behaviour are checked.

Deliverables: - Final QA report with commands and results. - Known
limitations and outstanding owner decisions. - Clear local
run/build/deploy instructions. - A short list of any content that still
needs real assets or URLs.

------------------------------------------------------------------------

## 6. Suggested repository files

Adapt this list to the existing framework; do not force the structure if
the project already has conventions.

-   `AGENTS.md` --- durable instructions for Copilot.
-   `docs/WEBSITE_IMPLEMENTATION_PLAN.md` --- this plan.
-   `docs/CONTENT_FACT_CHECK.md` --- claims, source, and confirmation
    status.
-   `docs/QA_CHECKLIST.md` --- release checklist.
-   Central site config for brand, metadata, and the download URL.
-   Shared components for header, footer, CTA, feature card, FAQ item,
    and section heading.
-   Separate route/page modules for Home, Features, How It Works,
    Download, Guide, FAQ, Privacy, About, and Not Found.

Do not add a backend, account system, database, analytics, or contact
form unless the owner explicitly requests and configures it. A public
marketing site can usually remain static.

------------------------------------------------------------------------

## 7. Ready-to-paste Copilot CLI prompts

Run these from the website repository root.

### Prompt A --- Audit and planning (first)

``` text
/plan
You are implementing the public marketing website for Trillian — Driving Coach.

Before changing any files:
1. Inspect the repository, existing framework, package manager, routes, assets, tests, and deployment configuration.
2. Read USER_MANUAL.md and DrivingCoach_SRS_v1.md if they are present. Treat them as source material, but verify claims against the current app configuration when possible.
3. Create a factual feature matrix. Label every claim VERIFIED, NEEDS OWNER CONFIRMATION, or OUT OF SCOPE.
4. Respect the product positioning: the app is 100% free, with no subscription or premium tier.
5. Plan these pages: Home, Features, How It Works, Download, User Guide, FAQ, Privacy, About.
6. Do not invent a download URL, testimonials, ratings, usage numbers, iOS support, cloud sync, live coaching, or other unsupported features.
7. Identify the conflict between local/offline claims in the manual and any backend/upload architecture in the SRS. Do not write absolute privacy statements until the shipped release is verified.
8. Prefer the existing stack. If the repository is empty, recommend a lightweight static-first approach and explain the trade-offs.
9. Propose phased tasks, acceptance criteria, and test commands.
Do not implement until I approve the plan.
```

### Prompt B --- Create project instructions and foundation

``` text
Implement Phase 1 of docs/WEBSITE_IMPLEMENTATION_PLAN.md only.

Create or update AGENTS.md with:
- product facts and forbidden unsupported claims,
- the free/no-subscription positioning,
- design direction,
- repository commands and conventions,
- accessibility, responsive design, and testing requirements.

Implement the shared site shell, navigation, footer, design tokens, typography, and reusable UI primitives using the existing stack. Do not build every page yet. Do not invent download URLs or privacy claims. Run relevant checks and report changed files and results.
```

### Prompt C --- Implement one phase at a time

``` text
Implement Phase [NUMBER] from docs/WEBSITE_IMPLEMENTATION_PLAN.md only.

First restate the phase goal and acceptance criteria briefly. Inspect existing components before adding new ones. Keep changes scoped to this phase, follow AGENTS.md, preserve all existing working functionality, and do not add dependencies unless they solve a clear need.

After implementation:
1. Run the relevant lint, type-check, tests, and/or build commands available in this repository.
2. Fix issues caused by your changes.
3. Report files changed, commands run, pass/fail results, and remaining owner decisions.
Do not claim a test passed if you did not run it.
```

### Prompt D --- Fact-check and launch audit

``` text
Review the complete website against docs/WEBSITE_IMPLEMENTATION_PLAN.md, USER_MANUAL.md, DrivingCoach_SRS_v1.md, and AGENTS.md.

Do not redesign the site without identifying a concrete defect. Check:
- factual accuracy and unsupported feature claims,
- prominent and accurate free/no-subscription messaging,
- Android compatibility and sector definitions,
- no fake download links, QR codes, testimonials, or statistics,
- privacy statements against the actual shipped release,
- responsive layout, keyboard access, contrast, reduced motion, metadata, broken links, and console errors,
- lint, type check, tests, and production build.

Fix clear defects, rerun relevant checks, and produce a concise launch report with remaining blockers. If the docs conflict or evidence is missing, flag it for the owner instead of guessing.
```

### Prompt E --- Final visual polish

``` text
Perform a focused visual-polish pass on the finished Trillian marketing website.

Keep the established motorsport engineering visual identity: charcoal/navy, white and muted grey, electric-blue accent, restrained purple/amber, precise data-style typography, strong hierarchy, and generous spacing. Improve alignment, consistency, responsive behaviour, and clarity. Do not add unsupported app features or generic SaaS pricing sections. Preserve accessibility and reduced-motion support. Run the production build and report the exact checks performed.
```

------------------------------------------------------------------------

## 8. Suggested CLI session

Check your installed CLI version and current model picker, then start an
interactive session in the repository.

``` bash
copilot
```

Inside Copilot CLI:

``` text
/model
/plan
```

Choose the model in the picker. Paste **Prompt A** and review the
proposed plan. After approval, execute Prompts B--E phase by phase.

If you want to choose a model when starting a non-interactive task,
GitHub documents the `--model` option. Example:

``` bash
copilot --model claude-opus-5.5
```

If that model is unavailable, select an available alternative using
`/model`; do not assume every plan exposes every model. The CLI supports
plan mode and explicit model selection, but exact flags can vary by CLI
version, so use `copilot --help` and the current GitHub documentation if
the command is rejected.

**Do not start with unrestricted autopilot for the entire project.**
Review the plan first, keep changes in small phases, inspect diffs, and
approve commands or dependencies deliberately.

------------------------------------------------------------------------

## 9. Definition of done

The implementation is ready for launch when: - \[ \] All agreed pages
are complete and linked. - \[ \] The website clearly says the app is
free, without introducing a pricing or upsell model. - \[ \] All public
feature claims are supported by the current release or clearly marked as
planned. - \[ \] Android compatibility and setup steps are accurate. -
\[ \] Download/install actions work or show an honest unavailable
state. - \[ \] Privacy language is confirmed against the shipped app. -
\[ \] The site works on mobile, tablet, and desktop. - \[ \]
Accessibility and keyboard checks are complete. - \[ \] SEO metadata and
favicon are in place. - \[ \] No broken links, console errors, fake
proof points, or secrets remain. - \[ \] Lint, type-check, tests (where
configured), and production build pass. - \[ \] Run/build/deployment
instructions and known limitations are documented.

## 10. Owner decisions to resolve before launch

-   [ ] What is the real public download URL or distribution process?
-   [ ] Does the release being advertised operate entirely locally, or
    does it use any backend/upload processing?
-   [ ] What is the official public domain?
-   [ ] Is there an official support/privacy contact address?
-   [ ] Are official app screenshots, logo assets, and a favicon
    available?
-   [ ] Is "100% free" the current pricing statement, or is the owner
    explicitly guaranteeing "free forever"?

Until these are answered, Copilot should build the pages and honest
fallback states without fabricating the missing information.

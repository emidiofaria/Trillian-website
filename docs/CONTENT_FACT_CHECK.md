# Content fact-check matrix

Every public claim on the website, with its source in `00_inputs/USER_MANUAL.md` (v1.1).
Status: **VERIFIED** (in manual, used) · **OWNER CONFIRMED** (owner decision) ·
**NEEDS OWNER CONFIRMATION** (not published until confirmed) · **OUT OF SCOPE** (deliberately excluded).

## Published claims
| Claim (site wording) | Pages | Source | Status |
|---|---|---|---|
| Android 8.0+ with GPS; phones optimised, tablets work | Home, Download, FAQ, Footer | Header “Platform”, §1 What You’ll Need, FAQ tablets | VERIFIED |
| Not available for iPhone / iOS | Download, FAQ, About | Platform = Android only; SRS OOS-04 | VERIFIED |
| 100% free — no subscription or premium tier | All (banner, footer) | Owner decision | OWNER CONFIRMED |
| Installation steps (APK / “Allow from this source”) | Download `#install` | §2.1 | VERIFIED |
| Loading screen stages | Guide | §2.2 | VERIFIED |
| Location “While using the app”, notifications optional, no Physical Activity | Download, Guide, Privacy | §2.3 | VERIFIED |
| Driver name 2–100 characters, stored locally, rename never touches sessions | Download, Guide, FAQ | §2.4, §6.2, FAQ | VERIFIED |
| No account; sign-in / cloud backup planned for a future version | About, FAQ, Privacy | §2.5, FAQ | VERIFIED |
| First GPS fix 30–60 s, open the app a couple of minutes early | How it works, Guide | §3.0 | VERIFIED |
| SELECT TRACK (surveyed lines) vs NEW CIRCUIT; rename/delete saved circuits | Features, How it works, Guide, FAQ | §3.1, FAQ | VERIFIED |
| Capture points A/B with accuracy < 5 m; distance ≈ track width | How it works, Guide | §3.2 | VERIFIED |
| Mounting: secure mount, not cup holder, keep powered, battery saver off | How it works, Guide | §3.3 | VERIFIED |
| Recording notification; screen can be off; GPS-lost warning, recording continues | How it works, Guide, FAQ | §4.1–4.2, FAQ | VERIFIED |
| Processing on the phone; no server; works in flight mode | Home, Features, Privacy, FAQ | §4.3, FAQ | VERIFIED (owner confirmed) |
| No INTERNET permission, no analytics, no tracking | Home, Privacy, FAQ | §4.3, FAQ “Can I record without internet” | VERIFIED (owner confirmed) |
| Lap rules: ≥ 20 s and ≥ 50 m away from the line | Features, Guide | §5.1, §7 No Laps Detected | VERIFIED |
| Laps table: Lap, Time, S1–S3, Delta, ★ best | Home, Features | §5.1 | VERIFIED |
| Sectors = three equal thirds by distance, not official; blank if too few fixes | Features, How it works, FAQ | §5.1, §5.2 sector map, FAQ | VERIFIED |
| Sector colours blue / purple / orange | Features (SVG) | §5.2 sector map | VERIFIED |
| 7 coaching cards and their conditions; “fewer cards rather than make something up” | Home, Features, Guide, About | §5.2 card table | VERIFIED |
| Dream Lap example 1:12.4 → 1:10.9, 1.5 s | Home (illustrative table), Features | §5.2 Dream Lap | VERIFIED (labelled illustrative) |
| Speed chart vs distance, Fast (~100 pts/lap) / Detailed | Features, Guide | §5.3 | VERIFIED |
| Analysis: distance, duration, max/avg speed, speed-coloured map, corners/apex, braking g from GPS | Features, Guide, FAQ | §5.4, FAQ | VERIFIED |
| Rename (1–100 chars) / delete sessions by long-press on Home; no undo, no server copy | Features, Guide, Privacy, FAQ | §5.5 | VERIFIED |
| Share card: best lap, date & track, display name | Features, Guide | §6.1 | VERIFIED |
| Profile stats, About screen version, Clear User Data is permanent | Guide, Privacy | §6.2–6.4 | VERIFIED |
| Troubleshooting entries (GPS lock, processing, no laps, half/double laps, minutes, empty circuit list, crashes, 500 MB free) | Guide | §7 | VERIFIED |
| Battery roughly 10–15 % per hour | Download, FAQ | FAQ battery | VERIFIED |
| Closed tracks only, not public roads | FAQ | FAQ public roads | VERIFIED |
| Contact e-mail `trillian.app.contact@proton.me` | Footer, Guide, Privacy, About | Owner decision | OWNER CONFIRMED |
| Website: no cookies/analytics; GitHub Pages may log IPs | Privacy | Owner decision (hosting) | OWNER CONFIRMED |

## Excluded / rephrased
| Manual content | Decision | Reason |
|---|---|---|
| FAQ “Typically within ±0.2 seconds” | **NEEDS OWNER CONFIRMATION** — site says accuracy depends on GPS quality; not a professional timing system | No measurement evidence; avoid over-promising |
| §5.1 “Local vs Server Detection … server results are authoritative” | OUT OF SCOPE | Contradicts the local-only V1 (§4.3: no server) |
| §4.2 “Lap count (updates live if connected)” | OUT OF SCOPE | Implies connectivity |
| FAQ “AI looks for late braking, inconsistent corner entry, speed scrubbing” / “AI coaching” | Rephrased as “post-session coaching insights computed on your phone”; only the 7 real cards described | Not matching the card list in §5.2 |
| §6.1.1 Diagnostic file (long-press Share) | OUT OF SCOPE (owner decision) | Support-only flow; users are told to e-mail the contact instead |
| “Contact support with your email address” | Replaced by the confirmed contact e-mail | Placeholder in manual |
| SRS backend, accounts, Firebase, Anthropic, uploads | OUT OF SCOPE | Not in released app |
| SRS Driving Academy (OOS-09) | OUT OF SCOPE | Not announced |
| Specific circuit names | Not listed | Manual: the in-app list is always current |
| Download link, store badges, QR codes | Not published | No public link yet (`PUBLIC_DOWNLOAD_URL` unset) |
| Testimonials, ratings, user counts | Not published | None exist |
| `01_pictures/paper_1` illustration | Not used | Owner decision |

## Screenshots used
`home`, `coach`, `analysis` (status bar and system toast cropped), `analysis-corners` — real app captures
(Portuguese locale, comma decimals). Alt text describes them with dot decimals.

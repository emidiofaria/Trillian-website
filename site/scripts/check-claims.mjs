// Guards against forbidden public claims (see AGENTS.md / docs/CONTENT_FACT_CHECK.md).
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
if (!existsSync(dist)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}
const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const rules = [
  [/free forever/i, 'Use "100% free — no subscription or premium tier"'],
  [/\bpremium (plan|version|features?|upgrade)\b/i, 'No premium tier exists'],
  [/\b(upgrade|subscribe) (now|to)\b/i, 'No upsell'],
  [/\bApp ?Store\b/, 'No iOS / App Store'],
  [/google play/i, 'No Play Store listing yet'],
  [/\biOS app\b|available (on|for) iOS/i, 'iOS is not available'],
  [/iphone/i, 'iOS is not available'],
  [/±\s*0[.,]2|\+\/-\s*0[.,]2/, 'Accuracy figure needs owner confirmation'],
  [/testimonial/i, 'No testimonials'],
  [/\b\d[\d,.]*\+?\s*(downloads|users|drivers trust|reviews)\b/i, 'No invented stats'],
  [/★★★★|rated \d/i, 'No ratings'],
  [
    /real[- ]time coaching|live coaching|audio coaching|voice coaching/i,
    'Coaching is post-session only',
  ],
  [/server detection|detected on (the )?server/i, 'Manual §5.1 server detection out of scope'],
  [/leaderboard/i, 'No leaderboards'],
  [/anthropic|firebase|claude/i, 'Backend/AI vendors out of scope'],
  [/driving academy/i, 'Driving Academy not mentioned'],
  [/qr code/i, 'No QR codes'],
  [/updates live if connected/i, 'Omitted claim'],
  [
    /long[- ]press(ing)? (the )?share|diagnostic (export|report)/i,
    'Diagnostic export not documented publicly',
  ],
];
// Phrases that legitimately contain a matched term (negations).
const allow = [
  /not available[^.]{0,40}(iphone|ios)|(iphone|ios)[^.]{0,10}not available/i,
  /not available[^.]{0,30}(live|audio)/i,
  /no (live|real[- ]time)[^<.]{0,40}coaching/i,
  /not (live|real[- ]time)/i,
  /isn.t (live|real[- ]time)/i,
];

const errors = [];
const files = walk(dist).filter((f) => /\.(html|txt|webmanifest|xml)$/.test(f));
for (const file of files) {
  const text = readFileSync(file, 'utf8')
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/\s+/g, ' ');
  for (const [re, why] of rules) {
    const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    for (const m of text.matchAll(g)) {
      const ctx = text.slice(Math.max(0, m.index - 60), m.index + m[0].length + 60);
      if (allow.some((a) => a.test(ctx))) continue;
      errors.push(`${relative(dist, file)}: "${m[0]}" — ${why}\n      …${ctx.trim()}…`);
    }
  }
}
if (errors.length) {
  console.error(`✘ ${errors.length} forbidden claim(s):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log(`✓ Claim audit: ${files.length} files, ${rules.length} rules, no forbidden claims.`);

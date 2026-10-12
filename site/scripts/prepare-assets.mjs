// One-off asset pipeline: run with `npm run assets` after replacing source images in ../01_pictures.
// Crops device status bars / system toasts from screenshots and builds favicons + OG image.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const SRC = new URL('../../01_pictures/', import.meta.url);
const ASSETS = new URL('../src/assets/', import.meta.url);
const PUBLIC = new URL('../public/', import.meta.url);

await mkdir(new URL('screens/', ASSETS), { recursive: true });
await mkdir(PUBLIC, { recursive: true });

const STATUS_BAR = 72;
const screens = [
  // [source, target, visible height after status bar (cuts system toasts / partial rows)]
  ['app_Screenshot_Main_page.png', 'home.png', 1528],
  ['app_Screenshot_Coach.png', 'coach.png', 1528],
  ['app_Screenshot_analisys.png', 'analysis.png', 1340],
  ['app_Screenshot_detailed_turn_analisys.png', 'analysis-corners.png', 1528],
];
for (const [src, dest, height] of screens) {
  await sharp(new URL(src, SRC).pathname)
    .extract({ left: 0, top: STATUS_BAR, width: 720, height })
    .png()
    .toFile(new URL(`screens/${dest}`, ASSETS).pathname);
}

// Helmet emblem: square crop around the circular badge, transparent outside the circle.
const helmetSrc = new URL('App_Hero_helmet_source.png', SRC).pathname;
const SIZE = 800;
const crop = await sharp(helmetSrc)
  .extract({ left: 179, top: 56, width: SIZE, height: SIZE })
  .toBuffer();
const mask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2 - 4}" fill="#fff"/></svg>`,
);
const emblem = await sharp(crop)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();
await sharp(emblem)
  .resize(512, 512)
  .png({ palette: true, quality: 90 })
  .toFile(new URL('helmet.png', ASSETS).pathname);

for (const [name, px] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(emblem)
    .resize(px, px)
    .png({ palette: true, quality: 90 })
    .toFile(new URL(name, PUBLIC).pathname);
}

// Open Graph image 1200x630: emblem + wordmark on brand background.
const ogText = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0B0F17"/>
  <rect x="0" y="622" width="1200" height="8" fill="#2F80FF"/>
  <text x="560" y="270" font-family="Arial, Helvetica, sans-serif" font-size="84" font-weight="700" letter-spacing="8" fill="#F5F7FA">TRILLIAN</text>
  <text x="564" y="325" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="12" fill="#2F80FF">DRIVING COACH</text>
  <text x="564" y="400" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#C9D1DC">Know your laps.</text>
  <text x="564" y="440" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#C9D1DC">Understand your pace.</text>
  <text x="564" y="500" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#9AA4B2">GPS lap timer &amp; post-session coach for Android</text>
  <text x="564" y="535" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#F5A524">100% free · no subscription · no premium tier</text>
</svg>`);
const emblemOg = await sharp(emblem).resize(400, 400).toBuffer();
await sharp(ogText)
  .composite([{ input: emblemOg, left: 110, top: 115 }])
  .png()
  .toFile(new URL('og-image.png', PUBLIC).pathname);

await writeFile(
  new URL('site.webmanifest', PUBLIC),
  JSON.stringify(
    {
      name: 'Trillian — Driving Coach',
      short_name: 'Trillian',
      icons: [
        { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: '#0B0F17',
      background_color: '#0B0F17',
      display: 'browser',
    },
    null,
    2,
  ) + '\n',
);
console.log('Assets prepared.');

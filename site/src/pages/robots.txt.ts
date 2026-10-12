import type { APIRoute } from 'astro';

// Sitemap line only when a real domain (SITE_URL) is configured.
export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /'];
  if (site) {
    const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
    lines.push(`Sitemap: ${new URL(`${base}/sitemap-index.xml`, site).toString()}`);
  }
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain' } });
};

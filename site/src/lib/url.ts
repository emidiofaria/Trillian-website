/** Prefix an internal path with the configured base (needed for GitHub Pages project sites). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/** True when `href` points at the current page (ignores base and trailing slash). */
export function isCurrent(href: string, pathname: string): boolean {
  const norm = (p: string) => p.replace(/\/+$/, '') || '/';
  return norm(url(href)) === norm(pathname);
}

// Prefixes site-relative paths with the deploy base (e.g. /portfolio on GitHub Pages).
// External links and mailto: pass through unchanged.

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return base + path;
}

export function samePage(a: string, b: string): boolean {
  const strip = (p: string) => p.replace(/\/$/, '') || '/';
  return strip(a) === strip(b);
}

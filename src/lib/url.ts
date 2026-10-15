// Prefixes site-relative paths with the deploy base (e.g. /portfolio on GitHub Pages).
// External links and mailto: pass through unchanged.

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  // Pages are built as folders, so add the trailing slash to skip GitHub Pages' redirect.
  const [pathname, hash] = path.split('#');
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  const withSlash = isFile || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return base + withSlash + (hash !== undefined ? `#${hash}` : '');
}

export function samePage(a: string, b: string): boolean {
  const strip = (p: string) => p.replace(/\/$/, '') || '/';
  return strip(a) === strip(b);
}

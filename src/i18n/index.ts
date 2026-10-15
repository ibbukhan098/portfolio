// Two editions: English at the root, German under /de.
// Components read the language from the URL, so no prop drilling is needed.

export type Lang = 'en' | 'de';
export type Localized = { en: string; de: string };

export const langs: Lang[] = ['en', 'de'];

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Language of a page, from its full pathname (including the deploy base). */
export function getLang(pathname: string): Lang {
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return path === '/de' || path.startsWith('/de/') ? 'de' : 'en';
}

/** Site path (without base) for the given edition, e.g. '/sources' → '/de/sources'. */
export function localize(path: string, lang: Lang): string {
  if (lang === 'en' || /^(https?:|mailto:|tel:|#)/.test(path) || /\.[a-z0-9]+$/i.test(path.split('#')[0])) {
    return path;
  }
  return path === '/' ? '/de/' : `/de${path}`;
}

/** The same page in the other edition, as a site path (without base). */
export function counterpart(pathname: string, target: Lang): string {
  let path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  if (!path.startsWith('/')) path = `/${path}`;
  if (path === '/de' || path.startsWith('/de/')) path = path.slice(3) || '/';
  return localize(path, target);
}

/** Pick the right string from a value that is either plain or localized. */
export function t(value: string | Localized, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang];
}

export const ui = {
  paperTagline: { en: 'All the claims that are fit to cite.', de: 'Alle Behauptungen, die sich belegen lassen.' },
  price: { en: 'Price: one interview', de: 'Preis: ein Vorstellungsgespräch' },
  volume: { en: 'Vol.', de: 'Jg.' },
  number: { en: 'No.', de: 'Nr.' },
  frontPageLabel: { en: 'front page', de: 'Titelseite' },
  languageLabel: { en: 'Language', de: 'Sprache' },
  footerNote: { en: 'No cookies, no tracking.', de: 'Keine Cookies, kein Tracking.' },
  factBox: { en: 'Fact box', de: 'Faktenbox' },
  storySources: { en: 'Sources in this story', de: 'Quellen dieses Artikels' },
  nextStory: { en: 'Next story ›', de: 'Nächster Artikel ›' },
  source: { en: 'Source', de: 'Quelle' },
  addLink: { en: '[add link]', de: '[Link ergänzen]' },
} satisfies Record<string, Localized>;

export const nav: { href: string; label: Localized }[] = [
  { href: '/', label: { en: 'Front page', de: 'Titelseite' } },
  { href: '/#work', label: { en: 'Work', de: 'Arbeiten' } },
  { href: '/model-card', label: { en: 'Model card', de: 'Modellkarte' } },
  { href: '/sources', label: { en: 'Sources', de: 'Quellen' } },
  { href: '/cv.pdf', label: { en: 'CV', de: 'Lebenslauf' } },
];

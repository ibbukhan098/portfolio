import type { Localized } from '../i18n';

export const site = {
  name: 'Ibrahim Ali Khan',
  paper: 'The Ibrahim Record',
  role: { en: 'AI Software Engineer', de: 'AI Software Engineer' } satisfies Localized,
  location: 'Paderborn',
  email: 'ibbukhan098@gmail.com',
  phone: '+49 1556 0382007',
  // Used by the Impressum and privacy pages.
  address: {
    street: 'c/o garage33, Ausblick 1',
    postcode: '33100',
    city: 'Paderborn',
    country: { en: 'Germany', de: 'Deutschland' } satisfies Localized,
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/ibrahimalik/',
    github: 'https://github.com/ibbukhan098',
    cv: '/cv.pdf',
  },
  availability: {
    en: 'Full-time from November 2026 · Germany · on-site, hybrid or remote',
    de: 'Vollzeit ab November 2026 · Deutschland · vor Ort, hybrid oder remote',
  } satisfies Localized,
};

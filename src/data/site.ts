export const site = {
  name: 'Ibrahim Ali Khan',
  paper: 'The Ibrahim Record',
  motto: 'All the claims that are fit to cite.',
  role: 'AI Software Engineer',
  location: 'Paderborn',
  email: 'ibbukhan098@gmail.com',
  phone: '+49 1556 0382007',
  // Used by the Impressum and Datenschutz pages.
  address: {
    street: '', // TODO: street and house number (required by § 5 DDG)
    postcode: '33100',
    city: 'Paderborn',
    country: 'Deutschland',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/ibrahimalik/',
    github: 'https://github.com/ibbukhan098',
    cv: '/cv.pdf',
  },
  availability: 'Full-time from November 2026 · Germany · on-site, hybrid or remote',
};

export const nav = [
  { href: '/', label: 'Front page' },
  { href: '/#work', label: 'Work' },
  { href: '/model-card', label: 'Model card' },
  { href: '/sources', label: 'Sources' },
  { href: site.links.cv, label: 'CV' },
];

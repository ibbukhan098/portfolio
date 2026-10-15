// The evidence registry. Every claim on the site cites one of these by id.
// Order here sets the footnote number shown on the page.
// Text fields are either plain (same in both editions) or { en, de }.

import type { Localized } from '../i18n';

type Text = string | Localized;

export interface Source {
  id: string;
  publisher: Text;
  title: Text;
  date: Text;
  excerpt: Text;
  url?: string;
}

const LINKEDIN = 'https://www.linkedin.com/in/ibrahimalik/';
const CV = '/cv.pdf';
// Fallback until the exact post URLs are in: the profile's post feed.
const LINKEDIN_POSTS = 'https://www.linkedin.com/in/ibrahimalik/recent-activity/all/';

const P = {
  cvExperience: { en: 'Résumé · Experience', de: 'Lebenslauf · Berufserfahrung' },
  cvEducation: { en: 'Résumé · Education', de: 'Lebenslauf · Ausbildung' },
  cvAwards: { en: 'Résumé · Accomplishments', de: 'Lebenslauf · Auszeichnungen' },
  cvSkills: { en: 'Résumé · Technical skills', de: 'Lebenslauf · Kenntnisse' },
  liExperience: { en: 'LinkedIn · Experience', de: 'LinkedIn · Berufserfahrung' },
  liPost: { en: 'LinkedIn · Post', de: 'LinkedIn · Beitrag' },
  project: { en: 'Project', de: 'Projekt' },
} satisfies Record<string, Localized>;

const sinceNov2025 = { en: 'Nov 2025 – present', de: 'Nov. 2025 – heute' };

export const sources: Source[] = [
  {
    id: 'optimaite',
    publisher: P.cvExperience,
    title: 'Founding Engineer, Optimaite',
    date: sinceNov2025,
    excerpt: {
      en: 'A Fraunhofer IEM GenAI Incubator spin-off. Co-architected and shipped core capabilities of a data-sovereign AI platform that automates document-heavy work for law firms, in the cloud or on-premise.',
      de: 'Ein Spin-off des GenAI Incubators am Fraunhofer IEM. Kernfunktionen einer datensouveränen KI-Plattform mitkonzipiert und ausgeliefert, die dokumentenintensive Arbeit in Kanzleien automatisiert, in der Cloud oder on-premise.',
    },
    url: CV,
  },
  {
    id: 'optimaite-rag',
    publisher: P.cvExperience,
    title: { en: 'RAG pipelines and AI agents at Optimaite', de: 'RAG-Pipelines und KI-Agenten bei Optimaite' },
    date: sinceNov2025,
    excerpt: {
      en: 'RAG pipelines and tool-using agents with embeddings, vector search, structured outputs, validation, human review and failure handling; tracing, audit logging and tenant-aware data isolation.',
      de: 'RAG-Pipelines und werkzeugnutzende Agenten mit Embeddings, Vektorsuche, strukturierten Ausgaben, Validierung, menschlicher Prüfung und Fehlerbehandlung; Tracing, Audit-Logging und mandantenbezogene Datentrennung.',
    },
    url: CV,
  },
  {
    id: 'fraunhofer',
    publisher: P.liExperience,
    title: { en: 'Research Assistant, Fraunhofer IEM GenAI Incubator', de: 'Wissenschaftliche Hilfskraft, GenAI Incubator am Fraunhofer IEM' },
    date: sinceNov2025,
    excerpt: {
      en: 'Practical generative AI for industrial partners: use-case analysis, prototypes and validation with stakeholders.',
      de: 'Praktische generative KI für Industriepartner: Analyse von Use Cases, Prototypen und Validierung mit Stakeholdern.',
    },
    url: LINKEDIN,
  },
  {
    id: 'thesis',
    publisher: P.cvEducation,
    title: 'AI-Assisted Hospital Management: A Modular, FHIR-Based System with Privacy-Preserving Design for the German Healthcare Context',
    date: '2026',
    excerpt: {
      en: 'HL7 FHIR interoperability, role-based access, audit logging, patient-controlled sharing and reversible pseudonymisation; persona-specific AI agents benchmarked on local vs. cloud LLMs.',
      de: 'HL7-FHIR-Interoperabilität, rollenbasierter Zugriff, Audit-Logging, patientengesteuerte Freigabe und reversible Pseudonymisierung; rollenspezifische KI-Agenten, verglichen auf lokalen und Cloud-LLMs.',
    },
    url: CV,
  },
  {
    id: 'thesis-post',
    publisher: P.liPost,
    title: { en: 'Starting my master’s thesis at Fraunhofer IEM', de: 'Start meiner Masterarbeit am Fraunhofer IEM' },
    date: '2026',
    excerpt: {
      en: 'Letting patients and doctors ask questions about health records in plain language, where the AI never says anything the record cannot support.',
      de: 'Patientinnen, Patienten und Ärzte sollen Gesundheitsakten in Alltagssprache befragen können, und die KI sagt nichts, was die Akte nicht belegt.',
    },
    url: LINKEDIN_POSTS, // TODO: replace with the exact post URL
  },
  {
    id: 'fullstack',
    publisher: P.cvExperience,
    title: 'Software Developer, Metalabs Services LLP',
    date: { en: 'Apr 2021 – Nov 2023', de: 'Apr. 2021 – Nov. 2023' },
    excerpt: {
      en: 'Four products in Hyderabad: WriteGenius AI, TechStyleOS (BOND), Catalog Sync and LineSheets Studio. Plus a 2019 test-automation internship at Learnyst.',
      de: 'Vier Produkte in Hyderabad: WriteGenius AI, TechStyleOS (BOND), Catalog Sync und LineSheets Studio. Dazu 2019 ein Praktikum in Testautomatisierung bei Learnyst.',
    },
    url: CV,
  },
  {
    id: 'bond',
    publisher: P.liExperience,
    title: 'TechStyleOS (BOND): AngularJS → React',
    date: { en: 'Oct 2022 – May 2023', de: 'Okt. 2022 – Mai 2023' },
    excerpt: {
      en: 'Lead developer in an offshore team; migrated BOND from AngularJS to React, reducing load times by 25%. Database splitting and CI/CD with Docker, Jenkins and Bitbucket.',
      de: 'Lead Developer in einem Offshore-Team; Migration von BOND von AngularJS auf React, Ladezeiten um 25 % reduziert. Datenbankaufteilung und CI/CD mit Docker, Jenkins und Bitbucket.',
    },
    url: LINKEDIN,
  },
  {
    id: 'clausecraft',
    publisher: P.project,
    title: { en: 'ClauseCraft: AI contract assistant', de: 'ClauseCraft: KI-Vertragsassistent' },
    date: '2025',
    excerpt: {
      en: 'Generates contracts from a prompt or questionnaire, analyses each clause for risk, flags missing clauses. No sign-up; drafts are stored in the browser.',
      de: 'Erstellt Verträge aus einem Prompt oder Fragebogen, bewertet jede Klausel nach Risiko und erkennt fehlende Klauseln. Keine Anmeldung; Entwürfe werden im Browser gespeichert.',
    },
    url: 'https://github.com/ibbukhan098/clause-craft',
  },
  {
    id: 'optimaite-deploy',
    publisher: P.cvExperience,
    title: { en: 'Containerised deployments at Optimaite', de: 'Container-Deployments bei Optimaite' },
    date: sinceNov2025,
    excerpt: {
      en: 'Standardised deployments with Docker and Coolify, reducing release time by almost 50% and making releases repeatable.',
      de: 'Deployments mit Docker und Coolify standardisiert, Release-Zeit um fast 50 % verkürzt und Releases reproduzierbar gemacht.',
    },
    url: CV,
  },
  {
    id: 'writegenius',
    publisher: P.cvExperience,
    title: { en: 'WriteGenius AI: AI content platform', de: 'WriteGenius AI: KI-Content-Plattform' },
    date: '2023',
    excerpt: {
      en: 'Led a team of 4 developers; ChatGPT with custom prompt pipelines and Python web scraping. React, Tailwind and MongoDB interface raised engagement by 40% over 6 months.',
      de: 'Leitung eines Teams aus 4 Entwicklern; ChatGPT mit eigenen Prompt-Pipelines und Web-Scraping in Python. Die Oberfläche mit React, Tailwind und MongoDB steigerte das Engagement in 6 Monaten um 40 %.',
    },
    url: CV,
  },
  {
    id: 'catalogsync',
    publisher: P.cvExperience,
    title: { en: 'Catalog Sync: product synchronisation platform', de: 'Catalog Sync: Plattform zur Produktsynchronisierung' },
    date: '2022',
    excerpt: {
      en: 'Database schemas and GraphQL APIs syncing products with WooCommerce and Shopify stores. Vue, Quasar and MongoDB; performance improved by 25%.',
      de: 'Datenbankschemata und GraphQL-APIs zur Synchronisierung von Produkten mit WooCommerce- und Shopify-Shops. Vue, Quasar und MongoDB; Performance um 25 % verbessert.',
    },
    url: CV,
  },
  {
    id: 'linesheets',
    publisher: P.liExperience,
    title: { en: 'LineSheets Studio: UI modernisation', de: 'LineSheets Studio: Modernisierung der Oberfläche' },
    date: { en: 'Jul 2021 – Feb 2022', de: 'Juli 2021 – Feb. 2022' },
    excerpt: {
      en: 'Led a UI revamp in Vue, Quasar and SCSS that increased user engagement by 35%.',
      de: 'Leitung einer UI-Überarbeitung mit Vue, Quasar und SCSS, die das Nutzerengagement um 35 % steigerte.',
    },
    url: LINKEDIN,
  },
  {
    id: 'flutter',
    publisher: P.liPost,
    title: 'Week 4 with Flutter: GPS tracking and the testing rabbit hole',
    date: '2025',
    excerpt: {
      en: 'GPS recording, data validation and background recording for an e-bike app, with a 52-test suite.',
      de: 'GPS-Aufzeichnung, Datenvalidierung und Hintergrundaufzeichnung für eine E-Bike-App, mit 52 Tests.',
    },
    url: LINKEDIN_POSTS, // TODO: replace with the exact post URL
  },
  {
    id: 'awards',
    publisher: P.cvAwards,
    title: 'Spot Awards, Metalabs Services',
    date: '2022, 2023',
    excerpt: {
      en: 'Top performer in Q4 2022 (Catalog Sync) and Q2 2023 (TechStyleOS / BOND).',
      de: 'Top Performer in Q4 2022 (Catalog Sync) und Q2 2023 (TechStyleOS / BOND).',
    },
    url: CV,
  },
  {
    id: 'learnyst',
    publisher: P.cvExperience,
    title: { en: 'Software Developer Intern, Learnyst', de: 'Praktikant Softwareentwicklung, Learnyst' },
    date: { en: 'Feb – Jun 2019', de: 'Feb. – Juni 2019' },
    excerpt: {
      en: 'Reusable web and mobile test-automation frameworks with Java, Selenium, Appium, Maven, JMeter and Cucumber.',
      de: 'Wiederverwendbare Frameworks für Web- und Mobile-Testautomatisierung mit Java, Selenium, Appium, Maven, JMeter und Cucumber.',
    },
    url: CV,
  },
  {
    id: 'amoebots',
    publisher: { en: 'Project report · Paderborn University', de: 'Projektbericht · Universität Paderborn' },
    title: 'Symmetry Detection in Programmable Matter',
    date: { en: 'Aug 2024 – Aug 2025', de: 'Aug. 2024 – Aug. 2025' },
    excerpt: {
      en: 'Team report: distributed testing of rotational and reflective symmetry in the amoebot model via polynomial identity testing on a chain. Prime generation in O(log⁵ m) rounds, identity test in O(log⁴ m).',
      de: 'Teambericht: verteilter Test auf Rotations- und Spiegelsymmetrie im Amoebot-Modell per Polynomidentitätstest auf einer Kette. Primzahlerzeugung in O(log⁵ m) Runden, Identitätstest in O(log⁴ m).',
    },
    url: '/amoebot-report.pdf',
  },
  {
    id: 'education',
    publisher: P.cvEducation,
    title: {
      en: 'M.Sc. Computer Engineering, Paderborn University · B.Eng. Electronics & Communication, SIT',
      de: 'M.Sc. Computer Engineering, Universität Paderborn · B.Eng. Electronics & Communication, SIT',
    },
    date: '2014 – 2026',
    excerpt: {
      en: 'M.Sc. (expected Oct 2026) focused on web security, computer architecture and network systems. B.Eng. 2014–2018, Siddaganga Institute of Technology.',
      de: 'M.Sc. (voraussichtlich Okt. 2026) mit Schwerpunkt Web-Sicherheit, Rechnerarchitektur und Netzwerksysteme. B.Eng. 2014–2018, Siddaganga Institute of Technology.',
    },
    url: CV,
  },
  {
    id: 'skills',
    publisher: P.cvSkills,
    title: { en: 'Technical skills', de: 'Technische Kenntnisse' },
    date: '2026',
    excerpt: {
      en: 'Python, FastAPI, Node.js, TypeScript, JavaScript, React, Next.js, Vue, Angular, GraphQL, SQL, MongoDB, Docker, Kubernetes; RAG, agents, LLM evaluation and observability.',
      de: 'Python, FastAPI, Node.js, TypeScript, JavaScript, React, Next.js, Vue, Angular, GraphQL, SQL, MongoDB, Docker, Kubernetes; RAG, Agenten, LLM-Evaluation und Observability.',
    },
    url: CV,
  },
];

const byId = new Map(sources.map((s, i) => [s.id, { ...s, n: i + 1 }]));

export function getSource(id: string) {
  const s = byId.get(id);
  if (!s) throw new Error(`Unknown source id "${id}". Add it to src/data/sources.ts.`);
  return s;
}

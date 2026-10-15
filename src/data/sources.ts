// The evidence registry. Every claim on the site cites one of these by id.
// Order here sets the footnote number shown on the page.
// Résumé entries link to the published CV.

export interface Source {
  id: string;
  publisher: string;
  title: string;
  date: string;
  excerpt: string;
  url?: string;
}

const LINKEDIN = 'https://www.linkedin.com/in/ibrahimalik/';
const CV = '/cv.pdf';

export const sources: Source[] = [
  {
    id: 'optimaite',
    publisher: 'Résumé · Experience',
    title: 'Founding Engineer, Optimaite',
    date: 'Nov 2025 – present',
    excerpt:
      'A Fraunhofer IEM GenAI Incubator spin-off. Co-architected and shipped core capabilities of a data-sovereign AI platform that automates document-heavy work for law firms, in the cloud or on-premise.',
    url: CV,
  },
  {
    id: 'optimaite-rag',
    publisher: 'Résumé · Experience',
    title: 'RAG pipelines and AI agents at Optimaite',
    date: 'Nov 2025 – present',
    excerpt:
      'RAG pipelines and tool-using agents with embeddings, vector search, structured outputs, validation, human review and failure handling; tracing, audit logging and tenant-aware data isolation.',
    url: CV,
  },
  {
    id: 'fraunhofer',
    publisher: 'LinkedIn · Experience',
    title: 'Research Assistant, Fraunhofer IEM GenAI Incubator',
    date: 'Nov 2025 – present',
    excerpt:
      'Practical generative AI for industrial partners: use-case analysis, prototypes and validation with stakeholders.',
    url: LINKEDIN,
  },
  {
    id: 'thesis',
    publisher: 'Résumé · Education',
    title: 'AI-Assisted Hospital Management: A Modular, FHIR-Based System with Privacy-Preserving Design for the German Healthcare Context',
    date: '2026',
    excerpt:
      'HL7 FHIR interoperability, role-based access, audit logging, patient-controlled sharing and reversible pseudonymisation; persona-specific AI agents benchmarked on local vs. cloud LLMs.',
    url: CV,
  },
  {
    id: 'thesis-post',
    publisher: 'LinkedIn · Post',
    title: 'Starting my master’s thesis at Fraunhofer IEM',
    date: '2026',
    excerpt:
      'Letting patients and doctors ask questions about health records in plain language, where the AI never says anything the record cannot support.',
    // TODO: link to the post
  },
  {
    id: 'fullstack',
    publisher: 'Résumé · Experience',
    title: 'Software Developer, Metalabs Services LLP',
    date: 'Apr 2021 – Nov 2023',
    excerpt:
      'Four products in Hyderabad: WriteGenius AI, TechStyleOS (BOND), Catalog Sync and LineSheets Studio. Plus a 2019 test-automation internship at Learnyst.',
    url: CV,
  },
  {
    id: 'bond',
    publisher: 'LinkedIn · Experience',
    title: 'TechStyleOS (BOND): AngularJS → React',
    date: 'Oct 2022 – May 2023',
    excerpt:
      'Lead developer in an offshore team; migrated BOND from AngularJS to React, reducing load times by 25%. Database splitting and CI/CD with Docker, Jenkins and Bitbucket.',
    url: LINKEDIN,
  },
  {
    id: 'clausecraft',
    publisher: 'Project',
    title: 'ClauseCraft: AI contract assistant',
    date: '2025',
    excerpt:
      'Generates contracts from a prompt or questionnaire, analyses each clause for risk, flags missing clauses. No sign-up; data stays in the browser.',
    // TODO: link to the live app
  },
  {
    id: 'optimaite-deploy',
    publisher: 'Résumé · Experience',
    title: 'Containerised deployments at Optimaite',
    date: 'Nov 2025 – present',
    excerpt:
      'Standardised deployments with Docker and Coolify, reducing release time by almost 50% and making releases repeatable.',
    url: CV,
  },
  {
    id: 'writegenius',
    publisher: 'Résumé · Experience',
    title: 'WriteGenius AI: AI content platform',
    date: '2023',
    excerpt:
      'Led a team of 4 developers; ChatGPT with custom prompt pipelines and Python web scraping. React, Tailwind and MongoDB interface raised engagement by 40% over 6 months.',
    url: CV,
  },
  {
    id: 'catalogsync',
    publisher: 'Résumé · Experience',
    title: 'Catalog Sync: product synchronisation platform',
    date: '2022',
    excerpt:
      'Database schemas and GraphQL APIs syncing products with WooCommerce and Shopify stores. Vue, Quasar and MongoDB; performance improved by 25%.',
    url: CV,
  },
  {
    id: 'linesheets',
    publisher: 'LinkedIn · Experience',
    title: 'LineSheets Studio: UI modernisation',
    date: 'Jul 2021 – Feb 2022',
    excerpt:
      'Led a UI revamp in Vue, Quasar and SCSS that increased user engagement by 35%.',
    url: LINKEDIN,
  },
  {
    id: 'flutter',
    publisher: 'LinkedIn · Post',
    title: 'Week 4 with Flutter: GPS tracking and the testing rabbit hole',
    date: '2025',
    excerpt:
      'GPS recording, data validation and background recording for an e-bike app, with a 52-test suite.',
    // TODO: link to the post
  },
  {
    id: 'awards',
    publisher: 'Résumé · Accomplishments',
    title: 'Spot Awards, Metalabs Services',
    date: '2022, 2023',
    excerpt:
      'Top performer in Q4 2022 (Catalog Sync) and Q2 2023 (TechStyleOS / BOND).',
    url: CV,
  },
  {
    id: 'learnyst',
    publisher: 'Résumé · Experience',
    title: 'Software Developer Intern, Learnyst',
    date: 'Feb – Jun 2019',
    excerpt:
      'Reusable web and mobile test-automation frameworks with Java, Selenium, Appium, Maven, JMeter and Cucumber.',
    url: CV,
  },
  {
    id: 'amoebots',
    publisher: 'Project report · Paderborn University',
    title: 'Symmetry Detection in Programmable Matter',
    date: 'Aug 2024 – Aug 2025',
    excerpt:
      'Distributed detection of rotational and reflective symmetry in the amoebot model, in O(log⁵ n) time.',
    // TODO: link to the 21-page report PDF
  },
  {
    id: 'education',
    publisher: 'Résumé · Education',
    title: 'M.Sc. Computer Engineering, Paderborn University · B.Eng. Electronics & Communication, SIT',
    date: '2014 – 2026',
    excerpt:
      'M.Sc. (expected Oct 2026) focused on web security, computer architecture and network systems. B.Eng. 2014–2018, Siddaganga Institute of Technology.',
    url: CV,
  },
  {
    id: 'skills',
    publisher: 'Résumé · Technical skills',
    title: 'Technical skills',
    date: '2026',
    excerpt:
      'Python, FastAPI, Node.js, TypeScript, JavaScript, React, Next.js, Vue, Angular, GraphQL, SQL, MongoDB, Docker, Kubernetes; RAG, agents, LLM evaluation and observability.',
    url: CV,
  },
];

const byId = new Map(sources.map((s, i) => [s.id, { ...s, n: i + 1 }]));

export function getSource(id: string) {
  const s = byId.get(id);
  if (!s) throw new Error(`Unknown source id "${id}". Add it to src/data/sources.ts.`);
  return s;
}

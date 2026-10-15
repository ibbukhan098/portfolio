// Scripted answers for "Readers ask the Record".
// Each answer is a list of parts; a part with `cite` gets a footnote to that source.
// `keywords` lets the free-text box match a typed question to one of these.
// Anything that matches nothing is declined, which is the point.

export interface AnswerPart {
  text: string;
  cite?: string;
}

export interface Question {
  id: string;
  question: string;
  keywords: string[];
  answer: AnswerPart[];
  declined?: boolean;
}

export const questions: Question[] = [
  {
    id: 'document-ai',
    question: 'What has he built with document AI?',
    keywords: ['document', 'documents', 'legal', 'law', 'contract', 'contracts', 'optimaite', 'clausecraft', 'rag', 'agent', 'agents', 'built'],
    answer: [
      {
        text: 'As Founding Engineer at Optimaite he co-architected a data-sovereign AI platform for law firms,',
        cite: 'optimaite',
      },
      {
        text: ' building its RAG pipelines and tool-using agents with tracing and audit logging.',
        cite: 'optimaite-rag',
      },
      {
        text: ' Before that he built ClauseCraft, which drafts contracts and rates every clause for risk.',
        cite: 'clausecraft',
      },
    ],
  },
  {
    id: 'frontend',
    question: 'Has he led frontend work in production?',
    keywords: ['frontend', 'front-end', 'react', 'vue', 'angular', 'lead', 'led', 'migration', 'ui'],
    answer: [
      {
        text: 'Yes. He led the BOND migration from AngularJS to React, cutting load times by 25%,',
        cite: 'bond',
      },
      {
        text: ' and the LineSheets Studio UI revamp, which raised engagement by 35%.',
        cite: 'linesheets',
      },
    ],
  },
  {
    id: 'thesis',
    question: 'What is his thesis about?',
    keywords: ['thesis', 'health', 'medical', 'patient', 'fraunhofer', 'master', 'research'],
    answer: [
      {
        text: 'A modular, FHIR-based hospital system with privacy-preserving design for German healthcare, where persona-specific AI agents are benchmarked on local vs. cloud LLMs.',
        cite: 'thesis',
      },
      {
        text: ' The rule: the AI never says anything the record can’t support.',
        cite: 'thesis-post',
      },
    ],
  },
  {
    id: 'rust',
    question: 'Does he have production Rust experience?',
    keywords: ['rust'],
    declined: true,
    answer: [
      {
        text: 'The record does not support that. The closest evidence is Python, TypeScript, JavaScript and Java.',
        cite: 'skills',
      },
    ],
  },
];

export function matchQuestion(input: string): Question | undefined {
  const words = new Set(input.toLowerCase().match(/[a-z0-9+#-]+/g) ?? []);
  let best: Question | undefined;
  let bestScore = 0;
  for (const q of questions) {
    const score = q.keywords.filter((k) => words.has(k)).length;
    if (score > bestScore) {
      best = q;
      bestScore = score;
    }
  }
  return best;
}
